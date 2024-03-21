import {
  View,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
  AntDesign,
  MaterialIcons,
  Entypo,
  FontAwesome,
  SimpleLineIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { createMessage, updateChatRoom } from "../../graphql/mutations";
import { getUser } from "../../graphql/queries";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "../../config/ThemeProvider";

const InputBox = ({ chatroom }) => {
  const { dark, colors, setScheme } = useTheme();
  const [text, setText] = useState("");
  const [imagePath, setImagePath] = useState(null);
  const [isAttachImage, setIsAttachImage] = useState(false);

  const onSend = async () => {
    const authUser = await Auth.currentAuthenticatedUser();

    const now = new Date(); // Current date and time
    const twoDaysLater = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // Adding two days in milliseconds
    const timeofDate = Math.floor(twoDaysLater.getTime() / 1000.0);
    console.log(timeofDate);

    const newMessage = {
      chatroomID: chatroom.id,
      text,
      userID: authUser.attributes.sub,
      TTL: timeofDate,
    };

    if (imagePath) {
      newMessage.images = await uploadImage(imagePath);
      setImagePath(null);
    }

    const newMessageData = await API.graphql(
      graphqlOperation(createMessage, { input: newMessage })
    );
    console.log(text);
    setText("");

    await API.graphql(
      graphqlOperation(updateChatRoom, {
        input: {
          chatRoomLastMessageId: newMessageData.data.createMessage.id,
          id: chatroom.id,
        },
      })
    );
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const compressedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [
          {
            resize: {
              width: result.assets[0].width,
              height: result.assets[0].height,
            },
          },
        ],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      setImagePath(compressedImage.uri);
    }
    console.log(result);
  };
  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      const compressedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [
          {
            resize: {
              width: result.assets[0].width,
              height: result.assets[0].height,
            },
          },
        ],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      setImagePath(compressedImage.uri);
    }
  };

  const uploadImage = async (filesUrl) => {
    try {
      const response = await fetch(filesUrl);

      const blob = await response.blob();

      const key = `${uuidv4()}.jpg`;

      await Storage.put(key, blob, { conntentType: "image/jpg" });

      return key;
    } catch (e) {
      console.log(e);
    }
    return "";
  };

  const [userBlk, setUserBlk] = useState([]);
  const [userMe, setUserMe] = useState(false);
  const [userblock, setUserBlock] = useState(null);
  const [myBlk, setMyBlk] = useState(null);

  useEffect(() => {
    const fetchUserBlocks = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();
      setUserBlock(currentUser);

      const searchedBlockUser =
        userBlk?.blockedUsers?.items?.find(
          (block) => block?.userID === currentUser.attributes.sub
        ) ||
        userBlk?.blockedBy?.items?.find(
          (blocked) => blocked?.blockedUserID === currentUser.attributes.sub
        );
      setMyBlk(searchedBlockUser);
      console.log(searchedBlockUser);

      const userItem = chatroom.users.items.find(
        (user) => user?.user?.id !== currentUser.attributes.sub
      );
      console.log(userItem?.user?.id);

      const userIds = userItem?.user?.id || currentUser.attributes.sub;
      if (!userIds) {
        return;
      }
      const idMe = userIds === currentUser.attributes.sub;
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
    fetchUserBlocks();
  }, [userBlk]);

  return (
    <>
      {/* {imagePath && (
        <View
          style={{
            // borderWidth: 1,

            marginHorizontal: 5,
            padding: 5,
            backgroundColor: "white",

            // top: 40,
            borderRadius: 25,
            paddingBottom: 45,
            paddingTop: 7,
            // top: 45,
          }}
        >
          <View style={styles.CFView}>
            <Image
              source={{ uri: imagePath }}
              style={{ height: 75, width: 75, borderRadius: 10 }}
            />
            <TouchableOpacity
              onPress={() => setImagePath("")}
              style={styles.CFCancel}
            >
              <Text style={styles.textFooterChat}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      )} */}
      <View
        style={{
          borderWidth: 1,
          borderColor: dark ? "#212121" : "#E0E0E0",
          marginHorizontal: 5,
          // padding: 5,
          backgroundColor: colors.textBoxs,

          // top: 40,
          borderRadius: 25,
          // paddingBottom: 45,
          // paddingTop: 7,
          marginBottom: 5,
          // top: 45,
        }}
      >
        {imagePath && (
          <View
            style={{
              paddingHorizontal: 5,
              paddingTop: 5,
              // borderWidth: 1,
              borderRadius: 20,
            }}
          >
            <View
              style={[
                styles.CFView,
                {
                  backgroundColor: dark ? "#303030" : "#F1F1F1",
                  borderColor: dark ? "#212121" : "lightgray",
                },
              ]}
            >
              <Image
                source={{ uri: imagePath }}
                style={{
                  height: 75,
                  width: 75,
                  borderRadius: 15,
                  marginRight: 0,
                }}
                // resizeMode="contain"
              />
              <Ionicons
                name="close-circle"
                onPress={() => setImagePath("")}
                size={25}
                color="#F1F1F1"
                style={styles.removeSelectedImage}
              />
            </View>
          </View>
        )}
        <View style={[styles.container, { backgroundColor: colors.textBoxs }]}>
          {/* <SimpleLineIcons
            style={styles.send2}
            name="emotsmile"
            size={22}
            color={colors.textboxicon}
          /> */}
          <Ionicons
            style={styles.send2}
            onPress={pickImage}
            name="add-circle-sharp"
            size={30}
            color={colors.textboxicon}
          />
          <TextInput
            value={text}
            onChangeText={setText}
            style={[
              styles.input,
              { backgroundColor: colors.textBoxs, color: colors.postText },
            ]}
            placeholder="Type your message...."
            placeholderTextColor={colors.inputText}
            selectionColor={colors.textboxicon}
            multiline
          />
          {/* <Entypo name="mic" size={20} color="white" style={styles.sends} /> */}
          {/* <Entypo
            style={styles.sends}
            onPress={pickImage}
            name="attachment"
            size={20}
            color={colors.textboxicon}
          /> */}
          {text || imagePath ? (
            <>
              {!myBlk ? (
                <FontAwesome
                  onPress={onSend}
                  style={styles.send}
                  name="send"
                  size={20}
                  color={colors.textboxicon}
                />
              ) : (
                <TouchableOpacity>
                  <FontAwesome
                    style={styles.send}
                    name="send"
                    size={20}
                    color={colors.textboxicon}
                  />
                </TouchableOpacity>
              )}
            </>
          ) : (
            <FontAwesome
              name="camera"
              size={20}
              color={colors.textboxicon}
              style={styles.send}
              onPress={takePicture}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  CFView: {
    // justifyContent: "center",
    alignItems: "flex-start",
    // borderStartWidth: 5,
    borderEndWidth: 5,
    marginHorizontal: 2,
    borderRadius: 15,
    // marginBottom: 3,
    backgroundColor: "#F1F1F1",
    borderColor: "lightgray",
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
  container: {
    flexDirection: "row",
    // backgroundColor: "#303030",
    padding: 5,
    paddingHorizontal: 5,
    alignItems: "center",
    paddingVertical: 5,
    // marginHorizontal: 5,
    // marginBottom: 5,
    borderRadius: 30,

    // borderWidth: 1,
    // borderColor: "lightgray",
  },
  input: {
    flex: 1,
    backgroundColor: "#303030",
    padding: 5,
    paddingHorizontal: 3,
    marginHorizontal: 0,
    maxHeight: 80,
    borderRadius: 20,
    fontSize: 16,
    // borderColor: "lightgray",
    // borderWidth: 1,
  },
  send2: {
    // backgroundColor: "red",
    padding: 4,
    borderRadius: 25,
    overflow: "hidden",
  },
  send: {
    // backgroundColor: "red",
    padding: 7,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 3,
  },
  sends: {
    // backgroundColor: "red",
    padding: 7,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 3,
  },

  attachmentsContainer: {
    alignItems: "flex-end",
  },
  selectedImage: {
    height: 100,
    width: 200,
    margin: 5,
  },
  removeSelectedImage: {
    position: "absolute",
    // marginLeft: 51,
    // bottom: 49,
    // backgroundColor: "white",
    // borderRadius: 30,
    overflow: "hidden",
    // display: "flex",
    opacity: 0.5,
    // padding: 5,
  },
});
