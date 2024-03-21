import React from "react";
import { View, StyleSheet } from "react-native";

function ListItemSeperator() {
  return <View style={styles.seperator} />;
}

const styles = StyleSheet.create({
  seperator: {
    width: "95%",
    height: 1,
    backgroundColor: "#e3e3e3",
    alignSelf: "center",
  },
});

export default ListItemSeperator;
