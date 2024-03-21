import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ name }) => {
  return (
    <View style={styles.header}>
      <Ionicons
        name="arrow-back"
        size={24}
        color="black"
        style={styles.icons}
      />
      <View>
        <Text style={styles.headerText}>{name}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    letterSpacing: 1,
  },
  icons: {
    position: "absolute",
    left: -10,
  },
});
