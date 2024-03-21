import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import FollwerItemList from "../components/FollwerItemList";

import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { LinearGradient } from "expo-linear-gradient";
import {
  getUser,
  listBlocks,
  listFollowings,
  listPosts,
} from "../graphql/queries";
import { useTheme } from "../config/ThemeProvider";

const AddMessageScreen = () => {
  const { dark, colors, setScheme } = useTheme();

  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [userInfo, setUserinfo] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfos = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });
        setUserinfo(userInfos);
      } catch (error) {
        console.log("Error fetching user info:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (userInfo) {
      const fetcsuser = async () => {
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo?.attributes?.sub })
        );

        const cUser = userData?.data?.getUser;

        const filterBlk = cUser?.blockedUsers?.items;
        const filterBlks = cUser?.blockedBy?.items;
        API.graphql(
          graphqlOperation(listFollowings, {
            filter: { followingID: { eq: userInfo.attributes.sub } },
          })
        ).then((result) => {
          // setUsers(result.data?.listFollowings?.items);
          const filtered = result.data.listFollowings.items.filter(
            (fler) =>
              !filterBlk.find((blks) => blks.userID === fler.followerID) ===
              !filterBlks.find((blks) => blks.blockedUserID === fler.followerID)
          );
          setUsers(filtered);
        });
      };
      fetcsuser();
    }
  }, [userInfo]);

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
      <Text style={{color:"red"}}>  * Add verifed tick here </Text>
      <Text style={{color:"red"}}>  Chatlist UI modification </Text>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <FollwerItemList
            user={item}
            colors={colors}
            //   onPress={() => createAChatRoomWithTheUser(item)}
          />
        )}
        // ListHeaderComponent={() => (
        //   <Pressable
        //     onPress={() => {
        //       // navigation.navigate("New Group");
        //     }}
        //     style={{
        //       flexDirection: "row",
        //       alignItems: "center",
        //       padding: 15,
        //       paddingHorizontal: 20,
        //     }}
        //   >
        //     <MaterialIcons
        //       name="group"
        //       size={24}
        //       color="royalblue"
        //       style={{
        //         marginRight: 20,
        //         backgroundColor: "gainsboro",
        //         padding: 7,
        //         borderRadius: 20,
        //         overflow: "hidden",
        //       }}
        //     />
        //     <Text style={{ color: "royalblue", fontSize: 16 }}>New Group</Text>
        //   </Pressable>
        // )}
      />
    </LinearGradient>
  );
};

export default AddMessageScreen;

const styles = StyleSheet.create({});
