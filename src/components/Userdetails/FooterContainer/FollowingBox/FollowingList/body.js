import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import AppText from "../../../../AppText";
import { S3Image } from "aws-amplify-react-native";
import VerifiedUser from "../../../../../config/VerifiedUser";
import Verified from "../../../../Verifed";
import { Link } from "@react-navigation/native";

const body = ({ item, setShow1 }) => {
  return (
    <TouchableOpacity>
      <Link
        to={{
          screen: "Profile4" || "Profile3",
          params: { id: item.follower.id },
        }}
        onPress={() => setShow1(false)}
      >
        <View style={styles.userContainer}>
          <View style={styles.avatar}>
            {item.follower.image ? (
              <S3Image style={styles.avatar} imgKey={item.follower.image} />
            ) : (
              <Image
                source={require("../../../../../../assets/user.png")}
                style={styles.avatar}
              />
            )}
          </View>
          <View style={styles.usertextContainer}>
            <View style={{ flexDirection: "row" }}>
              <AppText style={styles.usertitle}>
                @{item.follower.username}
              </AppText>
              {VerifiedUser.verifiedUsersId.includes(item.follower.id) && (
                <Verified size={16} />
              )}
            </View>
            <AppText style={styles.usersubTitle}>{item.follower.name}</AppText>
          </View>
        </View>
      </Link>
    </TouchableOpacity>
  );
};

export default body;

const styles = StyleSheet.create({
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  usertextContainer: {
    paddingLeft: 13,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  usertitle: {
    fontSize: 14,
    marginBottom: 2,
  },
  usersubTitle: {
    fontSize: 12,
    color: "#9CB1D8",
    fontWeight: "bold",
  },
});
