import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import AppText from "./AppText";
import ProfilePicture from "./ProfilePicture";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";

const Card = ({ item, onPress }) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.card}>
        <TouchableOpacity onPress={onPress}>
          {item.image ? (
            <Image style={styles.image} source={{ uri: item.image }} />
          ) : (
            <Text style={styles.postTitle} onPress={onPress}>
              {item.content}
            </Text>
          )}
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <View style={styles.avatar}>
            <ProfilePicture image={user.image} size={40} />
          </View>
          <View style={styles.textContainer}>
            <AppText style={styles.title}>@{item.username}</AppText>
            <AppText style={styles.subTitle}>
              {moment(item.createdAt).format("D MMM YYYY, h:mm a")}
            </AppText>
          </View>
          <View style={styles.iconContainer}>
            <Pressable>
              <Ionicons name="heart-outline" size={22} color="red" />
            </Pressable>
            <View>
              <Ionicons
                name="bookmark-outline"
                size={22}
                color="#3B516E"
                style={{ left: 20 }}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "transparent",
    overflow: "hidden",
    borderRightColor: "rgba(0,0,0,0.1)",
    borderRightWidth: 1,
    borderLeftColor: "rgba(0,0,0,0.1)",
    borderLeftWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
    borderBottomWidth: 1,
  },
  detailsContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  avatar: {
    // width: 40,
    // height: 40,
    // borderRadius: 20,
    // flexDirection: 'row',
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    overflow: "hidden",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 14,
    marginBottom: 2,
  },
  subTitle: {
    fontSize: 12,
    color: "#9CB1D8",
    fontWeight: "normal",
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 15,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: 30,
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
    borderBottomColor: "rgba(0,0,0,0.1)",
    fontWeight: "500",
  },
});

export default Card;
