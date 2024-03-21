import { View, FlatList, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState, useCallback } from "react";

import { useNavigation } from "@react-navigation/native";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { listPosts, listUsers, getUser } from "../graphql/queries";
import { createLike, deleteLike } from "../graphql/mutations";
import {
  onCreatePost,
  onDeletePost,
  onCreateLike,
  onDeleteLike,
  onCreateComment,
  onDeleteComment,
} from "../graphql/subscriptions";
import PostCard from "./PostCard";
import LGLoader from "./LGLoader";
import { FlashList } from "@shopify/flash-list";
import AddCard from "./AddCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextToken, setNextToken] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      const userData = await API.graphql(
        graphqlOperation(getUser, { id: userInfo.attributes.sub })
      );
      setCurrentUser(userData.data.getUser);

      const postsData = await API.graphql(
        graphqlOperation(listPosts, { limit: 15 })
      );

      const fetchedPosts = postsData.data.listPosts.items;

      // const updatedPosts = fetchedPosts.map((post) => ({
      //   ...post,
      //   liked: post.likes.items.some(
      //     (like) => like.userID === userInfo.attributes.sub
      //   ),
      // }));

      const filteredPosts = postsData.data.listPosts.items.filter(
        (post) =>
          !currentUser?.blockedUsers?.items?.find(
            (blockedUser) => blockedUser.userID === post.userID
          ) ===
          !currentUser?.blockedBy?.items?.find(
            (blocked) => blocked.blockedUserID === post.userID
          )
      );

      setPosts(filteredPosts);
      setNextToken(postsData.data.listPosts.nextToken);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = async () => {
    if (loadingMore || !nextToken) {
      return;
    }
    setLoadingMore(true);
    try {
      const postsData = await API.graphql(
        graphqlOperation(listPosts, { limit: 5, nextToken })
      );
      const newPosts = postsData.data.listPosts.items.filter(
        (post) =>
          !currentUser?.blockedUsers?.items?.find(
            (blockedUser) => blockedUser.userID === post.userID
          ) ===
          !currentUser?.blockedBy?.items?.find(
            (blocked) => blocked.blockedUserID === post.userID
          )
      );
      setPosts((prevPosts) => [...prevPosts, ...newPosts.slice(0)]);
      setNextToken(postsData.data.listPosts.nextToken);
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts();

    const subscription = API.graphql(graphqlOperation(onCreatePost)).subscribe({
      next: ({ value }) => {
        const newPost = value.data.onCreatePost;
        setPosts((prevPosts) => [newPost, ...prevPosts]);
      },
      error: (err) => console.warn(err),
    });

    const deletePostSubscription = API.graphql(
      graphqlOperation(onDeletePost)
    ).subscribe({
      next: ({ value }) => {
        const deletedPost = value.data.onDeletePost;
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.id !== deletedPost.id)
        );
      },
      error: (err) => console.warn(err),
    });

    let createLikeSubscription;
    let deleteLikeSubscription;

    const subscribeToCreateLike = () => {
      createLikeSubscription = API.graphql(
        graphqlOperation(onCreateLike)
      ).subscribe({
        next: ({ value }) => {
          const newLike = value.data.onCreateLike;
          setPosts((prevPosts) => {
            const updatedPosts = [...prevPosts];
            const postIndex = updatedPosts.findIndex(
              (post) => post.id === newLike.postID
            );
            if (postIndex !== -1) {
              updatedPosts[postIndex].likes.items.push(newLike);
            }
            return updatedPosts;
          });
        },
        error: (err) => console.warn("Error subscribing to onCreateLike:", err),
      });
    };

    const subscribeToDeleteLike = () => {
      deleteLikeSubscription = API.graphql(
        graphqlOperation(onDeleteLike)
      ).subscribe({
        next: ({ value }) => {
          const deletedLike = value.data.onDeleteLike;
          setPosts((prevPosts) => {
            const updatedPosts = [...prevPosts];
            const postIndex = updatedPosts.findIndex(
              (post) => post.id === deletedLike.postID
            );
            if (postIndex !== -1) {
              updatedPosts[postIndex].likes.items = updatedPosts[
                postIndex
              ].likes.items.filter((like) => like.id !== deletedLike.id);
            }
            return updatedPosts;
          });
        },
        error: (err) => console.warn("Error subscribing to onDeleteLike:", err),
      });
    };

    subscribeToCreateLike();
    subscribeToDeleteLike();

    const createCommentSubscription = API.graphql(
      graphqlOperation(onCreateComment)
    ).subscribe({
      next: ({ value }) => {
        const newComment = value.data.onCreateComment;
        setPosts((prevPosts) => {
          const updatedPosts = [...prevPosts];
          const postIndex = updatedPosts.findIndex(
            (post) => post.id === newComment.postID
          );
          if (postIndex !== -1) {
            updatedPosts[postIndex].comments.items.push(newComment);
          }
          return updatedPosts;
        });
      },
      error: (err) => console.warn(err),
    });

    const deleteCommentSubscription = API.graphql(
      graphqlOperation(onDeleteComment)
    ).subscribe({
      next: ({ value }) => {
        const deletedComment = value.data.onDeleteComment;
        setPosts((prevPosts) => {
          const updatedPosts = [...prevPosts];
          const postIndex = updatedPosts.findIndex(
            (post) => post.id === deletedComment.postID
          );
          if (postIndex !== -1) {
            updatedPosts[postIndex].comments.items = updatedPosts[
              postIndex
            ].comments.items.filter(
              (comment) => comment.id !== deletedComment.id
            );
          }
          return updatedPosts;
        });
      },
      error: (err) => console.warn(err),
    });

    return () => {
      subscription.unsubscribe();
      deletePostSubscription.unsubscribe();
      // createLikeSubscription.unsubscribe();
      // deleteLikeSubscription.unsubscribe();
      createCommentSubscription.unsubscribe();
      deleteCommentSubscription.unsubscribe();
      if (createLikeSubscription) createLikeSubscription.unsubscribe();
      if (deleteLikeSubscription) deleteLikeSubscription.unsubscribe();
    };
  }, []);

  const navigation = useNavigation();

  const renderItems = useCallback(({ item, index }) => {
    if (Math.random() < 0.05) return <AddCard />;
    return (
      <PostCard
        item={item}
        onPress={() => navigation.navigate("PostList", { userlst: item })}
      />
    );
  });

  const renderItem = useCallback(({ item, index }) => {
    if (index % 4 === 0 && index > 0)
      return (
        <>
          <AddCard item={item} />
        </>
      );

    return (
      <PostCard
        item={item}
        onPress={() => navigation.navigate("PostList", { userlst: item })}
      />
    );
  });

  const renderFooter = () => {
    if (!loadingMore) {
      return null;
    }
    return (
      <View style={{ paddingBottom: 40 }}>
        <LGLoader size={30} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        // estimatedItemSize={200}
        ListHeaderComponent={() => <View style={{ paddingTop: 10 }}></View>}
        ListFooterComponent={renderFooter}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.1}
        refreshing={loading}
        onRefresh={fetchPosts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Feed;
