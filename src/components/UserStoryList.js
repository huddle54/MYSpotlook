import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import UserStoryPreview from "./UserStoryPreview";
import UserStory from "../../data/UserStory";

const UserStoryList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={UserStory}
        renderItem={({ item }) => (
          <UserStoryPreview username={item.username} image={item.image} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default UserStoryList;

const styles = StyleSheet.create({
  container: {
    top: 5,
  },
});
