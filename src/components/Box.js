import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../config/ThemeProvider";

const Box = () => {
  const { dark, colors, setScheme } = useTheme();
  console.log(colors.textBoxs);
  return (
    <View>
      <Text>Box</Text>
    </View>
  );
};

export default Box;

const styles = StyleSheet.create({});
