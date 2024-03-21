import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../config/ThemeProvider";

const Theme = () => {
  const { dark, colors, setScheme } = useTheme();
  const toggleTheme = (val) => {
    dark ? setScheme("light") : setScheme("dark");
    // const newScheme = dark ? "light" : "dark";
    // setScheme(newScheme);
    // const newScheme = dark ? setScheme("light") : setScheme("dark");

    // AsyncStorage.setItem("dark", newScheme);
  };
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flexDirection: "row",
      marginHorizontal: 15,
      marginVertical: 4,
    },
    title: {
      marginLeft: 10,
      color: colors.icons,
    },
    move: {
      marginLeft: 200,
    },
  });
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: colors.postCardOutline,
      }}
    >
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="shield-account"
          size={24}
          color={colors.icons}
        />
        <Text style={styles.title}>Theme</Text>
        <Switch
          style={styles.move}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={dark ? "#81b0ff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={dark}
        />
      </View>
    </View>
  );
};

export default Theme;
