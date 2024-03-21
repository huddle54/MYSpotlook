import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "../../../config/ThemeProvider";

const MainContainer = ({
  posts,
  followers,
  followings,
  setShow,
  setShow1,
  myBlk,
}) => {
  const { dark, colors, setScheme } = useTheme();
  const styles = StyleSheet.create({
    userInfoItem: {
      justifyContent: "center",
    },
    userInfoTitle: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      color: colors.reportText,
    },
    userInfoSubtitle: {
      fontSize: 12,
      color: colors.flwtitle,
      textAlign: "center",
      fontWeight: "bold",
      marginBottom: 5,
    },
  });
  return (
    <>
      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoSubtitle}>Capture</Text>
        {myBlk ? (
          <Text style={styles.userInfoTitle}>0</Text>
        ) : (
          <Text style={styles.userInfoTitle}>{posts.length}</Text>
        )}
      </View>
      <View style={styles.userInfoItem}>
        <TouchableOpacity onPress={() => setShow(true)}>
          <Text style={styles.userInfoSubtitle}>Followers</Text>
          {myBlk ? (
            <Text style={styles.userInfoTitle}>0</Text>
          ) : (
            <Text style={styles.userInfoTitle}>{followings.length}</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.userInfoItem}>
        <TouchableOpacity onPress={() => setShow1(true)}>
          <Text style={styles.userInfoSubtitle}>Following</Text>
          {myBlk ? (
            <Text style={styles.userInfoTitle}>0</Text>
          ) : (
            <Text style={styles.userInfoTitle}>{followers.length}</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default MainContainer;
