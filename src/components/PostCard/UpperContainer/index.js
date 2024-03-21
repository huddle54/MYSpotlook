import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { S3Image } from "aws-amplify-react-native";
import { useTheme } from "../../../config/ThemeProvider";

const UpperContainer = ({ item, onPress }) => {
  const { dark, colors, setScheme } = useTheme();
  const styles = StyleSheet.create({
    image: {
      width: "100%",
      height: 200,
      resizeMode: "cover",
      overflow: "hidden",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    postTitle: {
      fontSize: 15,
      marginBottom: 2,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 2,
      padding: 10,
      backgroundColor: "transparent",
      borderRadius: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.postCardOutline,
      fontWeight: "500",
      color: colors.postText,
    },
  });

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        {item.image ? (
          <View style={styles.image}>
            <S3Image style={styles.image} imgKey={item.image} />
          </View>
        ) : (
          <Text numberOfLines={11} style={styles.postTitle} onPress={onPress}>
            {item.content}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UpperContainer;
