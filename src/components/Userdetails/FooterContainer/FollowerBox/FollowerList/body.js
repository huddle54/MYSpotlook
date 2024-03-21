import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import AppText from "../../../../AppText";
import { S3Image } from "aws-amplify-react-native";
import VerifiedUser from "../../../../../config/VerifiedUser";
import Verified from "../../../../Verifed";
import { Link } from "@react-navigation/native";

const body = ({ item, onPress, setShow }) => {
  return (
    <TouchableOpacity>
      <Link
        to={{ screen: "Profile4", params: { id: item.following.id } }}
        onPress={() => setShow(false)}
      >
        <View style={styles.userContainer}>
          <View style={styles.avatar}>
            {item.following.image ? (
              <S3Image style={styles.avatar} imgKey={item.following.image} />
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
                {" "}
                @{item.following.username}
              </AppText>
              {VerifiedUser.verifiedUsersId.includes(item.following.id) && (
                <Verified size={16} />
              )}
            </View>
            <AppText style={styles.usersubTitle}>{item.following.name}</AppText>
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
    marginLeft: 3,
  },
});
