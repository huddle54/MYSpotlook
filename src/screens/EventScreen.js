import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../config/ThemeProvider";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PointsTable from "../components/EventComponent/PointsTable";

const EventScreen = () => {
  const navigation = useNavigation();
  const { dark, colors, setScheme } = useTheme();

  const EventList = () => {
    return (
      <Pressable
        style={[
          styles.containers,
          {
            backgroundColor: colors.gradientStartColor,
            // borderBottomEndRadius: !open ? 0 : 10,
            // borderTopEndRadius: !open ? 0 : 10,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: colors.postCardOutline,
            // borderWidth: 1,
          },
        ]}
      >
        <View
          style={[
            styles.container2,
            { backgroundColor: colors.gradientStartColor },
          ]}
        >
          {/* {user?.image ? (
          <S3Image imgKey={user?.image} style={styles.image} />
        ) : (
          
        )} */}
          <Image
            style={styles.image}
            source={require("../../assets/icon.png")}
          />

          <View style={styles.content}>
            <View style={styles.row}>
              <Text style={[styles.name, { color: colors.username }]}>
                Spotlook Events
              </Text>
              {/* {chatRoom?.LastMessage && (
              <Text style={styles.subTitle}> */}
              {/* {moment(chat.LastMessage?.createdAt).format("D MMM YYYY")} */}
              {/* {moment(chatRoom?.LastMessage?.createdAt)
                  .startOf("min")
                  .fromNow()}
              </Text>
            )} */}

              {/* {chatRoom.LastMessage && (
      )} */}
            </View>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              {/* <Image
                source={imageSource}
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 5,
                }}
              /> */}

              <Text
                numberOfLines={1}
                style={[
                  styles.subTitle,
                  {
                    paddingRight: 5,
                    fontWeight: "bold",
                  },
                ]}
              >
                A new update will be coming soon
              </Text>
              <FontAwesome name="magic" size={15} color={colors.commentIcon} />
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <LinearGradient
      colors={[colors.gradientStartColor, colors.gradientEndColor]}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
      }}
    >
      <PointsTable />
      <EventList />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: colors.reportText, fontSize: 28, opacity: 0.5 }}>
          Events
        </Text>
      </View>
    </LinearGradient>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  container2: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
    // borderWidth: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: "lightgray",
  },
  header: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginBottom: 5,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
  },
  column: {
    flex: 1,
    textAlign: "center",
    // borderWidth: 1,
    marginVertical: 5,
    borderLeftWidth: 1,
  },
  column1: {
    flex: 1,
    textAlign: "center",
  },

  containers: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgray",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: "lightgray",
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  name: {
    flex: 1,
    fontWeight: "bold",
  },
  subTitle: {
    color: "#9CB1D8",
  },
});
