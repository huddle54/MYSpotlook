import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

function AppsButton({ onPress }) {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          // Button Linear Gradient
          colors={["#DA5AFA", "#3570EC"]}
          style={styles.button}
        >
          <Ionicons name="add" size={35} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    width: 60,
    borderRadius: 35,
    opacity: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 0,
    borderColor: "transparent",
    bottom: 30,
    elevation: 5,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
});

export default AppsButton;
