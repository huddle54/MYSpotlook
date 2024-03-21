import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
  listPosts,
  listComments,
  getPost,
  getComment,
} from "../graphql/queries";

const PostListScreens = ({ route }) => {
  const [post, setPost] = useState("");

  const fetchPost = async () => {
    try {
      const postData = await API.graphql(
        graphqlOperation(getPost, { id: route.params?.id })
      );
      setPost(postData.data.getPost);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Content:_ {post?.content}</Text>
      <Text>username:_ {post?.username}</Text>
      <Text>name:_ {post?.name}</Text>
    </View>
  );
};

export default PostListScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
