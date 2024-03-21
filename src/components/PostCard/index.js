import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import React from "react";
import UpperContainer from "./UpperContainer";
import MainContainer from "./MainContainer";
import { useTheme } from "../../config/ThemeProvider";

const PostCard = ({ item, onPress }) => {
  const { dark, colors, setScheme } = useTheme();

  const styles = StyleSheet.create({
    card: {
      borderRadius: 20,
      marginBottom: 20,
      backgroundColor: "transparent",
      overflow: "hidden",
      borderRightColor: colors.postCardOutline,
      borderRightWidth: 1,
      borderLeftColor: colors.postCardOutline,
      borderLeftWidth: 1,
      borderBottomColor: colors.postCardOutline,
      borderBottomWidth: 1,
    },
  });
  return (
    <TouchableWithoutFeedback>
      <View style={styles.card}>
        <UpperContainer item={item} onPress={onPress} />
        <MainContainer item={item} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PostCard;
