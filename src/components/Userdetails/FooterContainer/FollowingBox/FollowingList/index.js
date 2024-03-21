import { StyleSheet, View } from "react-native";
import React from "react";
import Body from "./body";
import Footer from "./footer";
import { useTheme } from "../../../../../config/ThemeProvider";

const FollowingList = ({ item, isMe, setShow1 }) => {
  const { dark, colors, setScheme } = useTheme();

  return (
    <>
      <View style={styles.usersection}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Body item={item} setShow1={setShow1} />
          <Footer item={item} />
        </View>
      </View>
      <View
        style={[styles.line, { borderBottomColor: colors.postCardOutline }]}
      ></View>
    </>
  );
};

export default FollowingList;

const styles = StyleSheet.create({
  usersection: {
    padding: 5,
    paddingRight: 8,
    paddingLeft: 8,
    flexDirection: "column",
    justifyContent: "center",
  },

  line: {
    borderBottomWidth: 1,

    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
});
