import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";
import { InputField } from "../styles/AddPost";
import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { createComment } from "../graphql/mutations";

const Comments = ({ user }) => {
  const [comments, setComments] = useState("");

  const onComment = async () => {
    try {
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      const usrCommnet = {
        userID: userInfo.attributes.sub,
        postID: user.id,
        text: comments,
      };
      await API.graphql(graphqlOperation(createComment, { input: usrCommnet }));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.Cmdcontainer}>
      <InputField
        style={styles.Cmdinput}
        multiline
        numberOfLines={1}
        placeholder="Comment here........"
        value={comments}
        onChangeText={(value) => setComments(value)}
      />
      <Pressable onPress={onComment} style={styles.Cmdbutton}>
        <Text style={styles.CmdbuttonText}>Post</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  Cmdcontainer: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    borderBottomColor: "#ddd",
    marginVertical: 20,
    paddingHorizontal: 40,
    padding: 6,
    paddingTop: 7,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  Cmdbutton: {
    width: "40%",
    height: 30,
    borderRadius: 5,
    left: 25,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
  },
  CmdbuttonText: {
    color: "#3673E6",
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 5,
    bottom: 1,
    fontSize: 16,
  },

  Cmdinput: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "left",
    fontSize: 18,
  },
});

export default Comments;
