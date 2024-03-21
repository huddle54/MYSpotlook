import { StyleSheet, View, Pressable } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { createLike, deleteLike } from "../../../graphql/mutations";
import { onCreateLike, onDeleteLike } from "../../../graphql/subscriptions";
import LGloader from "../../LGLoader";

const LikeTag = ({ item }) => {
  const [user, setUser] = useState(null);
  const [myLike, setMyLike] = useState(null);
  // const [post, setPost] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    const currentUser = await Auth.currentAuthenticatedUser();
    setUser(currentUser);

    const searchedLike = item.likes.items.find(
      (like) => like.userID === currentUser.attributes.sub
    );
    setMyLike(searchedLike);
  }, [item.likes.items]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    let createLikeSubscription;
    let deleteLikeSubscription;

    const subscribeToCreateLike = () => {
      createLikeSubscription = API.graphql(
        graphqlOperation(onCreateLike)
      ).subscribe({
        next: (eventData) => {
          const {
            value: {
              data: { onCreateLike: createdLike },
            },
          } = eventData;

          if (
            createdLike.userID === user.attributes.sub &&
            createdLike.postID === item.id
          ) {
            setMyLike(createdLike);
          }
        },
        error: (error) => {
          console.log("Error subscribing to onCreateLike:", error);
        },
      });
    };

    const subscribeToDeleteLike = () => {
      deleteLikeSubscription = API.graphql(
        graphqlOperation(onDeleteLike)
      ).subscribe({
        next: (eventData) => {
          const {
            value: {
              data: { onDeleteLike: deletedLike },
            },
          } = eventData;

          if (deletedLike.id === myLike?.id) {
            setMyLike(null);
          }
        },
        error: (error) => {
          console.log("Error subscribing to onDeleteLike:", error);
        },
      });
    };

    subscribeToCreateLike();
    subscribeToDeleteLike();

    return () => {
      if (createLikeSubscription) createLikeSubscription.unsubscribe();
      if (deleteLikeSubscription) deleteLikeSubscription.unsubscribe();
    };
  }, [item.id, myLike?.id, user?.attributes?.sub]);

  // useEffect(() => {
  //   const createLikeSubscription = API.graphql(
  //     graphqlOperation(onCreateLike)
  //   ).subscribe({
  //     next: (eventData) => {
  //       const {
  //         value: {
  //           data: { onCreateLike: createdLike },
  //         },
  //       } = eventData;

  //       if (
  //         createdLike.userID === user.attributes.sub &&
  //         createdLike.postID === item.id
  //       ) {
  //         setMyLike(createdLike);
  //       }
  //     },
  //     error: (error) => {
  //       console.log("Error subscribing to createLike:", error);
  //     },
  //   });

  //   const deleteLikeSubscription = API.graphql(
  //     graphqlOperation(onDeleteLike)
  //   ).subscribe({
  //     next: (eventData) => {
  //       const {
  //         value: {
  //           data: { onDeleteLike: deletedLike },
  //         },
  //       } = eventData;

  //       if (deletedLike.id === myLike?.id) {
  //         setMyLike(null);
  //       }
  //     },
  //     error: (error) => {
  //       console.log("Error subscribing to deleteLike:", error);
  //     },
  //   });

  //   return () => {
  //     createLikeSubscription.unsubscribe();
  //     deleteLikeSubscription.unsubscribe();
  //   };
  // }, [item.id, myLike?.id, user?.attributes?.sub]);

  const submitLike = async () => {
    setLoading(true);
    const like = {
      userID: user.attributes.sub,
      postID: item.id,
    };
    try {
      const res = await API.graphql(
        graphqlOperation(createLike, { input: like })
      );
      setMyLike(res.data.createLike);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const removeLike = async () => {
    setLoading(true);
    try {
      await API.graphql(
        graphqlOperation(deleteLike, { input: { id: myLike.id } })
      );
      setMyLike(null);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  // const prefetch = async () => {
  //   try {
  //     const currentUser = await Auth.currentAuthenticatedUser();
  //     const searchedLike = item.likes.items.find(
  //       (like) => like.userID === currentUser.attributes.sub
  //     );
  //     setMyLike(searchedLike);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const onLike = async () => {
    if (!user) {
      return;
    }

    if (!loading) {
      if (!myLike) {
        await submitLike();
      } else {
        await removeLike();
      }
    }
  };

  return (
    <View style={styles.iconContainer}>
      <Pressable
        onPress={onLike}
        // onLongPress={prefetch}
        disabled={loading}
      >
        <Ionicons
          name={!myLike ? "heart-outline" : "heart"}
          size={22}
          color={!myLike ? "red" : "red"}
        />
        {/* {loading ? (
          <Ionicons name="heart-outline" size={24} color="red" />
        ) : myLike ? (
          <Ionicons name="heart" size={24} color="red" />
        ) : (
          <Ionicons name="heart-outline" size={24} color="gray" />
        )} */}
      </Pressable>
      <View>
        {/* <Ionicons name="bookmark-outline" size={22} color="#3B516E" style={{left: 20}} /> */}
      </View>
    </View>
  );
};

export default LikeTag;

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: 20,
  },
});
