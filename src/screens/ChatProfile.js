import {
  Image,
  StyleSheet,
  Text,
  View,
  Switch,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../config/ThemeProvider";
import ReportList from "../components/Report";
import AppText from "../components/AppText";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import {
  getChatRoom,
  listMessagesByChatRoom,
  getUser,
  listFollowings,
} from "../graphql/queries";

import {
  createFollowing,
  deleteFollowing,
  createBlock,
  deleteBlock,
} from "../graphql/mutations";

import {
  Ionicons,
  AntDesign,
  Octicons,
  MaterialIcons,
} from "@expo/vector-icons";

const ChatProfile = () => {
  const { dark, colors, setScheme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();

  const chatroomID = route.params.id;

  const [user, setUser] = useState(null);
  const [chatRoom, setChatRoom] = useState(null);
  const [imageSource, setImageSource] = useState([]);

  const [userBlk, setUserBlk] = useState(null);
  const [userMe, setUserMe] = useState(false);
  const [userblock, setUserBlock] = useState(null);
  const [myBlk, setMyBlk] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      setUserBlock(authUser);

      const usrFetcher = await API.graphql(
        graphqlOperation(getChatRoom, { id: chatroomID })
      );
      setChatRoom(usrFetcher?.data?.getChatRoom);

      // Loop through chat.users.items and find a user that is not us (Authenticated user)
      const userItem = chatRoom?.users.items.find(
        (item) => item.user.id !== authUser.attributes.sub
      );
      setUser(userItem?.user);

      const searchedBlockUser = userBlk?.blockedBy?.items?.find(
        (blocked) => blocked?.blockedUserID === authUser.attributes.sub
      );
      setMyBlk(searchedBlockUser);
      console.log(searchedBlockUser);

      const userIds = user?.id || authUser.attributes.sub;

      if (!userIds) {
        return;
      }
      const idMe = userIds === authUser.attributes.sub;
      setUserMe(idMe);
      try {
        const userInfo = await API.graphql(
          graphqlOperation(getUser, { id: userIds })
        );
        if (!userInfo) {
          if (idMe) {
          } else {
          }
        }
        setUserBlk(userInfo.data.getUser);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUser();
  }, [chatRoom?.id, userBlk]);

  useEffect(() => {
    const downloadImage = async () => {
      if (user?.image) {
        const uri = await Storage.get(user?.image);
        setImageSource([{ uri }]);
      }
    };
    downloadImage();
  }, [user?.image]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Pressable>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#3570EC" }}>
            Chat Profile
          </Text>
        </Pressable>
      ),
      // headerRight: () => (
      //   <Feather
      //     onPress={() => navigation.navigate("Group Info", { id: chatroomID })}
      //     name="more-vertical"
      //     size={24}
      //     color="gray"
      //   />
      // ),
    });
  }, []);

  const submitBlock = async () => {
    setLoading(true);
    const blockUser = {
      userID: user?.id,
      blockedUserID: userblock?.attributes?.sub,
    };
    console.log(blockUser);

    try {
      const res = await API.graphql(
        graphqlOperation(createBlock, { input: blockUser })
      );
      setMyBlk(res.data.createBlock);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  const removeBlock = async () => {
    setLoading(true);
    try {
      await API.graphql(
        graphqlOperation(deleteBlock, { input: { id: myBlk.id } })
      );
      setMyBlk(null);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const onBlocking = async () => {
    if (!userblock) {
      return;
    }
    if (!loading) {
      if (!myBlk) {
        await submitBlock();
      } else {
        await removeBlock();
      }
    }
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
      <View style={styles.container}>
      <Text style={{color:"red", marginTop: 10}}>* Add verifed tick here </Text>
          <Text style={{color:"red", marginTop: 10}}>* Chatlist UI modification </Text>
          <Text style={{color:"red", marginTop: 10}}>* mute messages button</Text>
        {myBlk ? (
          <>
            <Image
              style={{ height: 125, width: 125, borderRadius: 25 }}
              source={require("../../assets/user.png")}
            />
          </>
        ) : (
          <>
            <Image
              source={imageSource}
              style={{ height: 125, width: 125, borderRadius: 25 }}
            />
          </>
        )}

        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.Name}>{user?.username}</Text>
        {/* <Text>Shared photos</Text> */}
      </View>
      {/* <View
        style={{
          // borderWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 50,
          paddingHorizontal: 10,
        }}
      >
        <AppText
          style={{
            // alignSelf: "center",
            textAlign: "left",
            // marginVertical: 50,
            // borderWidth: 1,
          }}
        >
          Mute Messages
        </AppText>
        <Switch
          // style={styles.move}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={dark ? "#81b0ff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          // onValueChange={toggleTheme}
          value={dark}
        />
      </View> */}
      <View
        style={{
          alignSelf: "baseline",
          marginVertical: 5,
          paddingHorizontal: 10,
        }}
      >
        <Blockuser
          user={user}
          myBlk={myBlk}
          onBlocking={onBlocking}
          // // followers={followers}
          // // followings={followings}
          // // setShow={setShow}
        />
      </View>
    </LinearGradient>
  );
};

const Blockuser = ({
  user,
  myBlk,
  onBlocking,
  followers,
  followings,
  setShow,
}) => {
  const { dark, colors, setScheme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [blockModal, setBlockModal] = useState(false);
  //   const [myBlk, setMyBlk] = useState(null);
  const handlePress = async () => {
    // setShow(false);
    // console.log("Function 1 executed");

    await onBlocking();
    console.log("Function 3 executed");

    setBlockModal(!blockModal);
    console.log("Function 2 executed");
  };
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={blockModal}
        onRequestClose={() => {
          setBlockModal(!blockModal);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              { backgroundColor: colors.sheetBackground },
            ]}
          >
            <View>
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#9CB1D8",
                    fontSize: 18,
                  }}
                >
                  {myBlk
                    ? `Unblock ${user?.username}`
                    : `Block ${user?.username}`}
                  ?
                </Text>
              </View>
              <View style={{ justifyContent: "center", marginBottom: 10 }}>
                <Text
                  style={{
                    color: "#9CB1D8",
                    fontSize: 13,
                    textAlign: "justify",
                    lineHeight: 17,
                  }}
                >
                  {myBlk
                    ? "Are you sure you want to unblock this user? This could follow the user and see content from the person's posts and comments."
                    : "Are you sure you want to block this user? The user is no longer able to see content from the person who blocked them. This could include posts, comments, and other forms of content."}
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setBlockModal(!blockModal);
                    }}
                  >
                    <Text style={styles.optionText3}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handlePress}>
                    <Text
                      style={{
                        textAlign: "center",
                        justifyContent: "center",
                        color: "#ff5c5c",
                        marginStart: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {myBlk ? "Unblock" : "Block"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => {
          setBlockModal(true);
        }}
      >
        <AppText style={styles.optionText2}>
          {myBlk ? "Unblock user" : "Block user"}
        </AppText>
      </TouchableOpacity>

      <ReportList
        reportText={"user"}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        successModal={successModal}
        setSuccessModal={setSuccessModal}
      />
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => setModalVisible(true)}
      >
        <AppText style={styles.optionText2}>Report user</AppText>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    // marginTop: 5,
    // borderWidth: 1,
    padding: 10,
  },
  userName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#3673E6",
    textAlign: "center",
  },
  Name: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    color: "#9CB1D8",
  },
  optionText2: {
    textAlign: "center",
    justifyContent: "center",
    paddingVertical: 10,
    // paddingLeft: 30,
    color: "#ff5c5c",
  },
  optionText3: {
    textAlign: "center",
    justifyContent: "center",
    color: "#ff5c5c",
    marginStart: 20,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 40,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ChatProfile;
