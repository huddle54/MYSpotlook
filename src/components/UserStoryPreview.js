import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const UserStoryPreview = ({ username, image }) => {
  return (
    <View style={styles.container}>
      <View>
        <LinearGradient
          colors={["#a5fecb", "#6fb1fc", "#20BDFF", "#0052D4", "#5433FF"]}
          style={{
            padding: 3,
            borderRadius: 50,
          }}
        >
          <Image style={styles.profilePicture} source={image} size={70} />
        </LinearGradient>
      </View>
      <Text style={styles.username}>{username}</Text>
    </View>
  );
};

export default UserStoryPreview;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: "white",
    borderWidth: 3,
  },
  username: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
    color: "#3B516E",
  },
});
