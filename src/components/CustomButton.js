import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    padding: 10,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 10,
  },

  container_PRIMARY: {
    backgroundColor: "#3673E6",
  },
  container_SECONDARY: {
    borderColor: "#3673E6",
    borderWidth: 2,
  },

  container_TERTIARY: {},
  text: {
    fontWeight: "bold",
    color: "#fff",
  },
  text_SECONDARY: {
    color: "#3673E6",
  },
  text_TERTIARY: {
    color: "gray",
  },
});

export default CustomButton;
