import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Button,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  FontAwesome,
  Ionicons,
  SimpleLineIcons,
  Entypo,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "../config/ThemeProvider";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { createMessage, deleteMessage } from "../graphql/mutations";
import { getChatRoom, listMessagesByChatRoom } from "../graphql/queries";
import { useNavigation, useRoute } from "@react-navigation/native";
import InputBox from "../components/ChatComponents/InputBox";
import MessageBox from "../components/ChatComponents/MessageBox";
import AppText from "../components/AppText";
import {
  onCreateMessage,
  onUpdateChatRoom,
  onDeleteMessage,
} from "../graphql/subscriptions";
import DeleteSheet from "../components/Bottomsheets/ChatRoomBottomSheet";
import moment from "moment";
import LGloader from "../components/LGLoader";

const ChatScreen = () => {
  const { dark, colors, setScheme } = useTheme();

  const [chatRoom, setChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // const [latestMessageDate, setLatestMessageDate] = useState(null);

  const [showScrollToBottomButton, setShowScrollToBottomButton] =
    useState(false);
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const isOnTop = contentOffset.y <= 0;
    setShowScrollToBottomButton(!isOnTop);
  };
  const handleScrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0 });
    }
  };

  const route = useRoute();
  const navigation = useNavigation();
  const chatroomID = route.params.id;

  useEffect(() => {
    API.graphql(graphqlOperation(getChatRoom, { id: chatroomID })).then(
      (result) => setChatRoom(result?.data?.getChatRoom)
    );

    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom, { filter: { id: { eq: chatroomID } } })
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
  }, [chatroomID]);
  // console.log(chatRoom?.Messages?.items);

  useEffect(() => {
    API.graphql(
      graphqlOperation(listMessagesByChatRoom, {
        chatroomID,
        sortDirection: "DESC",
      })
    ).then((result) => {
      setMessages(result.data?.listMessagesByChatRoom?.items);
      // const latestMessage = result.data?.listMessagesByChatRoom?.items[0];
      // if (latestMessage) {
      //   setLatestMessageDate(latestMessage.createdAt);
      // }
    });

    const subscription = API.graphql(
      graphqlOperation(onCreateMessage, {
        filter: { chatroomID: { eq: chatroomID } },
      })
    ).subscribe({
      next: ({ value }) => {
        setMessages((m) => [value.data.onCreateMessage, ...m]);
      },
      error: (err) => console.warn(err),
    });

    const deleteMessageSubscription = API.graphql(
      graphqlOperation(onDeleteMessage, {
        filter: { chatroomID: { eq: chatroomID } },
      })
    ).subscribe({
      next: ({ value }) => {
        setMessages((m) =>
          m.filter((msg) => msg.id !== value.data.onDeleteMessage.id)
        );
      },
      error: (err) => console.warn(err),
    });

    return () => {
      subscription.unsubscribe();
      deleteMessageSubscription.unsubscribe();
    };
  }, [chatroomID]);

  const handleDeleteMessage = async () => {
    try {
      const mesgs = await API.graphql(
        graphqlOperation(deleteMessage, { input: { id: selectedMessage.id } })
      );
      setMessages((m) => m.filter((msg) => msg.id !== selectedMessage.id));
      setShow(false);
      setSelectedMessage(null);
      const Images = messages.find((m) => m.id == selectedMessage.id);
      console.log(Images.images);

      await Storage.remove(Images.images, {
        level: "public",
        conntentType: "image/jpg",
      });
      console.log(mesgs);
    } catch (err) {
      console.warn(err);
    }
  };

  const userImage = route.params.image;

  useEffect(() => {
    navigation.setOptions({
      // title: route.params.name,
      headerTitle: () => (
        <Pressable
          onPress={() => navigation.navigate("Chatuser", { id: chatroomID })}
          style={{
            // borderWidth: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            right: 15,
          }}
        >
          <Image
            source={userImage}
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#3570EC",
              marginHorizontal: 10,
            }}
          >
            {route.params.name}
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

  // console.log(chatRoom.id);

  if (!chatRoom) {
    return (
      <LinearGradient
        colors={[colors.gradientEndColor, colors.gradientStartColor]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "100%",
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <LGloader size={40} />
        </View>
      </LinearGradient>
    );
  }

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
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
        style={styles.bg}
      > */}
      <Text style={{color:"red", marginTop: 10}}>* Add verifed tick here </Text>
          <Text style={{color:"red", marginTop: 10}}>* Chatlist UI modification </Text>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageBox
            message={item}
            onPress={() => {
              setSelectedMessage(item);
              setShow(true);
            }}
          />
        )}
        style={styles.list}
        inverted
        ref={flatListRef}
        onScroll={handleScroll}
        disableVirtualization
        keyExtractor={(item) => item.id}
      />
      {showScrollToBottomButton && (
        <View
          style={{ position: "absolute", bottom: 80, right: 15, opacity: 0.7 }}
        >
          <AntDesign
            name="circledown"
            size={25}
            color="white"
            onPress={handleScrollToBottom}
          />
        </View>
      )}

      <InputBox chatroom={chatRoom} />
      {/* </KeyboardAvoidingView> */}
      {show && (
        <DeleteSheet
          show={show}
          onDismiss={() => {
            setShow(false);
          }}
          enableBackdropDismiss
          visible={setShow}
        >
          <Pressable onPress={handleDeleteMessage}>
            <AppText style={styles.optionText2}>Delete message</AppText>
          </Pressable>
        </DeleteSheet>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  list: {
    padding: 5,
    // borderWidth: 1,
  },
  optionText2: {
    textAlign: "left",
    justifyContent: "center",
    padding: 15,
    // paddingLeft: 30,
    color: "#ff5c5c",
    // fontSize: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  CFView: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    marginBottom: 3,
  },
  CFCancel: {
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderColor: "black",
    left: 13,
    top: 20,
  },
  RSView: {
    flexDirection: "row",
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  RSAttachment: {
    height: 40,
    width: 40,
    // borderWidth: 1,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  RSMic: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  RSIconView: {
    height: 40,
    width: 40,
    // borderWidth: 1,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    marginTop: 3,
  },
  RITContainerStyle: {
    backgroundColor: "transparent",
    borderTopColor: "transparent",
    borderTopWidth: 1,
    justifyContent: "center",
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 4,
  },
  RITtextInputStyle: {
    color: "#333333",
    borderRadius: 30,
    paddingHorizontal: 5,
    marginTop: 1,
    // marginBottom: 7,
    marginRight: -10,
    right: 10,
    top: 1,
    backgroundColor: "#FFFFFF",
    // borderWidth: 1,
  },
  RITprimaryStyle: {
    // borderWidth: 1,
    marginHorizontal: 5,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    backgroundColor: "#FFFFFF",
    marginBottom: 5,
  },
  RAEmoji: {
    flexDirection: "row",
    height: 40,
    width: 40,
    // borderWidth: 1,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
});

export default ChatScreen;
