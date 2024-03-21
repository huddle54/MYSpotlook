import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";
// import Swipeable from "react-native-gesture-handler/Swipeable";
import AppText from "../AppText";
import { S3Image } from "aws-amplify-react-native";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import {
  onUpdateChatRoom,
  onCreateBlock,
  onDeleteBlock,
} from "../../graphql/subscriptions";
import { deleteUserChatRoom, deleteChatRoom } from "../../graphql/mutations";
import { getUser } from "../../graphql/queries";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../config/ThemeProvider";

const ChatListItem = ({ chat, renderRightAction }) => {
  const { dark, colors, setScheme } = useTheme();
  const navigation = useNavigation();
  const ref = useRef();
  // const user = chat.users.items[0].user;

  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [chatRoom, setChatRoom] = useState(chat);
  const [imageSource, setImageSource] = useState([]);
  const [userImage, setUserImage] = useState([]);
  const [blk, setBlk] = useState([]);
  // const [lstuser, setLstUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      // Loop through chat.users.items and find a user that is not us (Authenticated user)
      const userItem = chat?.users.items.find(
        (item) => item.user.id !== authUser.attributes.sub
      );
      setUser(userItem?.user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom, { filter: { id: { eq: chat?.id } } })
    ).subscribe({
      next: ({ value }) => {
        setChatRoom((cr) => ({
          ...(cr || {}),
          ...value.data.onUpdateChatRoom,
        }));
      },
      error: (err) => console.warn(err),
    });

    return () => subscription.unsubscribe();
  }, [chat?.id]);

  useEffect(() => {
    const downloadImage = async () => {
      if (chatRoom?.LastMessage?.images) {
        const uri = await Storage.get(chatRoom?.LastMessage?.images);
        setImageSource([{ uri }]);
      }
    };
    downloadImage();
  }, [chatRoom?.LastMessage?.images]);
  useEffect(() => {
    const downloadImage = async () => {
      if (user?.image) {
        const uri = await Storage.get(user?.image);
        setUserImage([{ uri }]);
      }
    };
    downloadImage();
  }, [user?.image]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (chat?.id === true) {
      ref.current.close();
    }
  }, []);

  // console.log(chat.id)

  const handlPress = async () => {
    ref.current.close();
    const authUser = await Auth.currentAuthenticatedUser();
    const userItem1 = chat?.users.items.find(
      (item) => item.user.id !== authUser.attributes.sub
    );
    const userItem2 = chat?.users.items.find(
      (item) => item.user.id == authUser.attributes.sub
    );

    const userChatId1 = await API.graphql(
      graphqlOperation(deleteUserChatRoom, {
        input: { id: userItem1?.id },
      })
    );
    const userChatId2 = await API.graphql(
      graphqlOperation(deleteUserChatRoom, {
        input: { id: userItem2?.id },
      })
    );

    const dltChatroom = await API.graphql(
      graphqlOperation(deleteChatRoom, { input: { id: chat?.id } })
    );
    console.log("pressed 1", userChatId1);
    console.log("pressed 2", userChatId2);
    console.log("pressed 3", dltChatroom);
  };

  const renderRightActions = () => {
    return (
      <View
        style={{
          // backgroundColor: "rgba(255, 0, 0, 0.43)",
          width: 80,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={handlPress}>
          <MaterialCommunityIcons
            name="delete-outline"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#ff5c5c" }}>
      <Swipeable
        ref={ref}
        friction={3}
        onSwipeableOpen={() => {
          setOpen(true);
        }}
        onSwipeableClose={() => {
          setOpen(false);
        }}
        renderRightActions={renderRightActions}
      >
        <Pressable
          onPress={() =>
            navigation.navigate("Chat", {
              id: chatRoom.id,
              name: user?.name,
              image: userImage,
            })
          }
          style={[
            styles.containers,
            {
              backgroundColor: colors.gradientStartColor,
              borderBottomEndRadius: !open ? 0 : 10,
              borderTopEndRadius: !open ? 0 : 10,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: colors.reportText,
              // borderWidth: 1,
            },
          ]}
        >
          <View
            style={[
              styles.container,
              { backgroundColor: colors.gradientStartColor },
            ]}
          >
            {user?.image ? (
              <S3Image imgKey={user?.image} style={styles.image} />
            ) : (
              <Image
                style={styles.image}
                source={require("../../../assets/user.png")}
              />
            )}

            <View style={styles.content}>
              <View style={styles.row}>
                <Text style={[styles.name, { color: colors.username }]}>
                  {user?.name}
                </Text>
                {chatRoom?.LastMessage && (
                  <Text style={styles.subTitle}>
                    {/* {moment(chat.LastMessage?.createdAt).format("D MMM YYYY")} */}
                    {moment(chatRoom?.LastMessage?.createdAt)
                      .startOf("min")
                      .fromNow()}
                  </Text>
                )}

                {/* {chatRoom.LastMessage && (
          )} */}
              </View>

              {!chatRoom?.LastMessage?.text && chatRoom?.LastMessage?.images ? (
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Image
                    source={imageSource}
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 5,
                    }}
                  />
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.subTitle,
                      {
                        paddingLeft: 5,
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    Image
                  </Text>
                </View>
              ) : (
                <Text numberOfLines={1} style={styles.subTitle}>
                  {chatRoom?.LastMessage?.text}
                </Text>
              )}
            </View>
          </View>
        </Pressable>
      </Swipeable>
    </GestureHandlerRootView>
    // <Swipeable renderRightActions={renderRightAction}>
    //   <TouchableHighlight underlayColor={"transparent"} onPress={onPress}>
    //     <View style={styles.container}>
    //       <Image source={image} style={styles.image} />
    //       <View>
    //         <AppText style={styles.title}>{title}</AppText>
    //         <AppText style={styles.subTitle}>{subTitle}</AppText>
    //       </View>
    //     </View>
    //   </TouchableHighlight>
    // </Swipeable>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  // container: {
  //   flexDirection: "row",
  //   padding: 15,
  //   alignItems: "center",
  // },
  // image: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 25,
  //   marginRight: 10,
  // },
  // title: {
  //   fontWeight: "bold",
  // },
  // subTitle: {
  //   color: "#A9A9A9",
  // },
  container: {
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
