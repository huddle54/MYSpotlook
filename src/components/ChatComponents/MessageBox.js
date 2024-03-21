import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  useWindowDimensions,
  ActivityIndicator,
  Linking,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { S3Image } from "aws-amplify-react-native";
import ImageView from "react-native-image-viewing";
import { LinearGradient } from "expo-linear-gradient";

const MessageBox = ({ message, onPress }) => {
  const [isMe, setIsMe] = useState(false);
  const [imageSource, setImageSource] = useState([]);
  const [isvisible, setVisible] = useState(false);
  useEffect(() => {
    const isMyMessage = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      setIsMe(message.userID === authUser.attributes.sub);
    };

    isMyMessage();
  }, []);

  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  useEffect(() => {
    const downloadImage = async () => {
      if (message.images) {
        const uri = await Storage.get(message.images);
        setImageSource([{ uri }]);
      }
    };
    downloadImage();
  }, [message.images]);

  return (
    <LinearGradient
      style={{
        margin: 1,
        // padding: 5,
        maxWidth: "80%",
        // backgroundColor: isMe ? "#3673E6" : "#F4F4F4",
        alignSelf: isMe ? "flex-end" : "flex-start",
        paddingHorizontal: !message.text && message.images ? 4 : 5,
        paddingBottom: !message.text && message.images ? 4 : 5,
        paddingTop: !message.text && message.images ? 4 : 5,
        borderRadius: !message.text && message.images ? 10 : 15,
        borderTopStartRadius: !message.text && message.images ? 10 : 15,
        borderTopEndRadius: !message.text && message.images ? 10 : 15,
        borderBottomEndRadius: !message.text && message.images ? 10 : 15,
        borderBottomStartRadius: !message.text && message.images ? 10 : 15,
      }}
      colors={isMe ? ["#DA5AFA", "#3570EC"] : ["#F4F4F4", "#F4F4F4"]}
    >
      {/* {downloadAttachments.length > 0 && (
        <View style={[{ width: imageContainerWidth }, styles.images]}>
          <ImageAttachments attachments={imageAttachments} />

          <VideoAttachments
            attachments={videoAttachments}
            width={imageContainerWidth}
          />
        </View>
      )} */}
      <TouchableOpacity onLongPress={onPress}>
        {message.images && (
          <View style={{ alignItems: "flex-end" }}>
            {/* <ImageBackground
            style={{
              borderColor: "white",
              // borderWidth: 1,
              borderRadius: !message.text && message.images ? 5 : 10,
              borderTopStartRadius: !message.text && message.images ? 5 : 15,
              borderTopEndRadius: !message.text && message.images ? 5 : 15,
            }}
          > */}
            <Pressable onLongPress={onPress} onPress={() => setVisible(true)}>
              <Image
                source={imageSource}
                style={{
                  height: 250,
                  width: 200,
                  borderRadius: !message.text && message.images ? 8 : 10,
                }}
              />
            </Pressable>
            <ImageView
              images={imageSource}
              // imageIndex={0}
              visible={isvisible}
              onRequestClose={() => setVisible(false)}
              swipeToCloseEnabled={true}
              doubleTapToZoomEnabled={true}
              presentationStyle="overFullScreen"
            />
            {/* </ImageBackground> */}
            {!message.images == !message.text ? (
              <View></View>
            ) : (
              <View
                style={{
                  position: "absolute",
                  marginTop: 225,
                  right: 5,
                  overflow: "hidden",
                  backgroundColor: "white",
                  opacity: 0.5,
                  // borderRadius: 25,
                  padding: 3,
                  borderRadius: 25,
                  fontWeight: "700",
                }}
              >
                <Text style={styles.time}>
                  {moment(message.createdAt).format("h:mm a")}
                </Text>
              </View>
            )}
          </View>
        )}
        {message.text && (
          <Text
            style={{
              color: isMe ? "white" : "#000",
              // borderWidth: 1,
              margin: !message.text == !message.images ? 2 : 5,
              maxWidth: !message.text == !message.images ? 200 : 300,
            }}
          >
            {message.text.split(" ").map((word, index) => {
              if (word.startsWith("http")) {
                return (
                  <Text
                    key={index}
                    style={{ color: "blue", textDecorationLine: "underline" }}
                    onPress={() => handleLinkPress(word)}
                  >
                    {word}{" "}
                  </Text>
                );
              } else {
                return <Text key={index}>{word} </Text>;
              }
            })}
          </Text>
        )}
      </TouchableOpacity>
      {message.text && (
        <Text
          style={[
            styles.time,
            {
              color: isMe ? "white" : "#000",
              alignSelf: isMe ? "flex-end" : "flex-start",
              marginHorizontal: !message.text == !message.images ? 2 : 5,
            },
          ]}
        >
          {moment(message.createdAt).format("h:mm a")}
        </Text>
      )}
    </LinearGradient>
  );
};

export default MessageBox;

const styles = StyleSheet.create({
  container: {
    margin: 1,
    // padding: 5,
    maxWidth: "80%",
    // borderWidth: 1,

    // Shadows
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    // elevation: 1,
  },
  time: {
    fontSize: 10,
    opacity: 1,
    // borderWidth: 1,
  },
  img: {
    height: 250,
    width: 200,
    borderColor: "white",
    borderWidth: 1,
  },
  images: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageContainer: {
    width: "50%",
    aspectRatio: 1,
    padding: 3,
  },
  image: {
    flex: 1,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
  },
});
