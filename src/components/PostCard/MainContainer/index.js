import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppText from "../../AppText";
import moment from "moment";
import LikeTag from "./LikeTag";
import { getUser } from "../../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { useNavigation, useRoute } from "@react-navigation/native";
import { S3Image } from "aws-amplify-react-native";
import VerifiedUser from "../../../config/VerifiedUser";
import Verified from "../../Verifed";
import { useTheme } from "../../../config/ThemeProvider";

const MainContainer = ({ item, onPress }) => {
  const { dark, colors, setScheme } = useTheme();

  const navigation = useNavigation();

  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    const userInfo = await API.graphql(
      graphqlOperation(getUser, { id: item.user.id })
    );
    setUser(userInfo.data.getUser);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <View style={styles.detailsContainer}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => navigation.navigate("Profile3", { id: user.id })}
        >
          <View style={{ flexDirection: "row" }}>
            {/* <ProfilePicture  size={40} image={user?.image}/> */}
            {item.user.image ? (
              <View style={styles.avatar}>
                <S3Image imgKey={item.user.image} style={styles.avatar} />
              </View>
            ) : (
              <Image
                source={require("../../../../assets/user.png")}
                style={styles.avatar}
              />
            )}

            <View style={styles.textContainer}>
              <View style={{ flexDirection: "row" }}>
                <AppText style={[styles.title, { color: colors.username }]}>
                  {" "}
                  @{item.username}
                </AppText>
                {VerifiedUser.verifiedUsersId.includes(item.user.id) && (
                  <Verified size={16} />
                )}
              </View>

              <AppText style={styles.subTitle}>
                {moment(item.createdAt).format("D MMM YYYY, h:mm a")}
              </AppText>
            </View>
          </View>
        </TouchableHighlight>
        <LikeTag onPress={onPress} item={item} />
      </View>
    </>
  );
};

export default MainContainer;

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 5,
  },
  title: {
    fontSize: 14,
    marginBottom: 2,
  },
  subTitle: {
    fontSize: 12,
    color: "#9CB1D8",
    fontWeight: "normal",
    marginLeft: 3,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});
