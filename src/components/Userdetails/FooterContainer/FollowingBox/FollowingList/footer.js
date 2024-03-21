import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getUser } from "../../../../../graphql/queries";
import { Auth, API, graphqlOperation } from "aws-amplify";
import {
  deleteFollowing,
  createFollowing,
} from "../../../../../graphql/mutations";

const footer = ({ item }) => {
  const [userFollow, setUserFollower] = useState([]);
  const [userMe, setUserMe] = useState(false);
  const [myFl, setMyFl] = useState(null);
  const [userFlw, setUserFle] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUserFle(currentUser);
      const searchedFollowing = userFollow?.items?.find(
        (follow) => follow?.followingID === currentUser?.attributes?.sub
      );
      setMyFl(searchedFollowing);

      const userId = item.follower.id || currentUser.attributes.sub;
      if (!userId) {
        return;
      }
      const idMe = userId === currentUser.attributes.sub;
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
        setUserFollower(userInfo.data.getUser.following);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUser();
  }, [myFl, userFlw]);

  const submitFollowing = async () => {
    const follower = {
      followerID: item.follower.id,
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
      {userMe ? (
        <></>
      ) : (
        <TouchableOpacity style={styles.userBtn} onPress={onFollowing}>
          <Text style={styles.userBtnText}>
            {myFl ? "Following" : "Follow"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default footer;

const styles = StyleSheet.create({
  userBtn: {
    borderRadius: 10,
    borderColor: "#2e64e5",
    borderWidth: 1.5,
    width: 90,
    height: 30,
  },
  userBtnText: {
    color: "#2e64e5",
    textAlign: "center",
    paddingBottom: 5,
    paddingTop: 5,
  },
});
