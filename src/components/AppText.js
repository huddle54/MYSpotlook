import React from "react";
import { Text, StyleSheet } from "react-native";
import colors from "../config/colors";
import { useTheme } from "../config/ThemeProvider";

function AppText({ children, style }) {
  const { dark, colors, setScheme } = useTheme();

  const styles = StyleSheet.create({
    text: {
      fontSize: 15,
      color: colors.username,
      fontWeight: "bold",
    },
  });

  return <Text style={[styles.text, style]}>{children}</Text>;
}

export default AppText;
