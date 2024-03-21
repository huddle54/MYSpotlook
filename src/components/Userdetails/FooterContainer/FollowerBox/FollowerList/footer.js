import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getUser } from "../../../../../graphql/queries";
import { Auth, API, graphqlOperation } from "aws-amplify";
import {
  deleteFollowing,
  createFollowing,
} from "../../../../../graphql/mutations";

const footer = ({ item, isMe }) => {
  const [delFollow, setDelFollow] = useState(false);

  const removeFollow = async () => {
    const onDltFollow = {
      id: item.id,
    };

    const delFollow = await API.graphql(
      graphqlOperation(deleteFollowing, { input: onDltFollow })
    );
    console.log(delFollow);
    setDelFollow(null);
  };

  const [userMe, setUserMe] = useState(false);
  const [userFollow, setUserFollower] = useState([]);
  const [myFl, setMyFl] = useState(null);
  const [userFlw, setUserFle] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUserFle(currentUser);
      const searchedFollowing = userFollow?.following?.items?.find(
        (follow) => follow?.followingID === currentUser?.attributes?.sub
      );
      setMyFl(searchedFollowing);

      const userId = item.following.id || currentUser?.attributes?.sub;
      if (!userId) {
        return;
      }
      const idMe = userId === currentUser?.attributes?.sub;
      setUserMe(idMe);

      try {
        const userInfo = await API.graphql(
          graphqlOperation(getUser, { id: userId })
        );
        if (!userInfo) {
          if (idMe) {
          } else {
          }
        }
        setUserFollower(userInfo.data.getUser);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUser();
  }, [myFl, userFlw]);

  const submitFollowing = async () => {
    const follower = {
      followerID: item.following.id,
      followingID: userFlw?.attributes?.sub,
    };

    try {
      const res = await API.graphql(
        graphqlOperation(createFollowing, { input: follower })
      );
      setMyFl(res.data.createFollowing);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const removeFollowing = async () => {
    try {
      await API.graphql(
        graphqlOperation(deleteFollowing, { input: { id: myFl.id } })
      );
      setMyFl(null);
    } catch (e) {
      console.log(e);
    }
  };

  const onFollowing = async () => {
    if (!userFlw) {
      return;
    }

    if (!myFl) {
      await submitFollowing();
    } else {
      await removeFollowing();
    }
  };
  return (
    <View>
      {isMe ? (
        <TouchableOpacity style={styles.userBtn2} onPress={removeFollow}>
          <Text style={styles.userBtnText2}>Remove</Text>
        </TouchableOpacity>
      ) : (
        <>
          {userMe ? (
            <View></View>
          ) : (
            <TouchableOpacity style={styles.userBtn2} onPress={onFollowing}>
              <Text style={styles.userBtnText2}>
                {myFl ? "Following" : "Follow"}
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default footer;

const styles = StyleSheet.create({
  userBtnText2: {
    color: "#FF0000",
    textAlign: "center",
    paddingBottom: 5,
    paddingTop: 5,
  },
  userBtn2: {
    borderRadius: 10,
    borderColor: "#FF0000",
    borderWidth: 1.5,
    width: 90,
    height: 30,
  },
});
