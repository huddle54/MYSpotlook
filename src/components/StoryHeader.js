import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UserStoryList from "./UserStoryList";

const StoryHeader = () => {
  return (
    <View style={styles.header}>
      <UserStoryList />
    </View>
  );
};

export default StoryHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 105,
  },
});
