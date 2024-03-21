import { Text, Image, StyleSheet, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { S3Image } from "aws-amplify-react-native";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { createChatRoom, createUserChatRoom } from "../../graphql/mutations";
import { getCommonChatRoomWithUser } from "../../Chatservices/ChatRoomServices";

const FollwerItemList = ({
  user,
  colors,
  //   onPress = () => {},
  //   selectable = false,
  //   isSelected = false,
}) => {
  const navigation = useNavigation();

  const [userImage, setUserImage] = useState([]);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  useEffect(() => {
    const downloadImage = async () => {
      if (user.follower.image) {
        const uri = await Storage.get(user.follower.image);
        setUserImage([{ uri }]);
      }
    };
    downloadImage();
  }, [user.follower.image]);

  const onPress = async () => {
    console.warn("ChatRoom");
    if (isButtonPressed) {
      return;
    }

    setIsButtonPressed(true);
    // Check if we already have a ChatRoom with user
    const existingChatRoom = await getCommonChatRoomWithUser(user.follower.id);
    if (existingChatRoom) {
      navigation.navigate("Chat", {
        id: existingChatRoom.chatRoom.id,
        name: user.follower.name,
        image: userImage,
      });
      return;
    }

    // Create a new Chatroom
    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, { input: {} })
    );
    console.log(newChatRoomData);
    if (!newChatRoomData.data?.createChatRoom) {
      console.log("Error creating the chat error");
    }
    const newChatRoom = newChatRoomData.data?.createChatRoom;
    // Add the clicked user to the ChatRoom
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: { chatRoomID: newChatRoom.id, userID: user.follower.id },
      })
    );
    // Add the auth user to the ChatRoom
    const authUser = await Auth.currentAuthenticatedUser();
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: { chatRoomID: newChatRoom.id, userID: authUser.attributes.sub },
      })
    );
    setIsButtonPressed(false);
    // navigate to the newly created ChatRoom
    navigation.navigate("Chat", {
      id: newChatRoom.id,
      name: user.follower.name,
      image: userImage,
    });
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.image}>
        {user.follower.image ? (
          <S3Image imgKey={user.follower.image} style={styles.image} />
        ) : (
          <Image
            source={require("../../../assets/user.png")}
            style={styles.image}
          />
        )}
      </View>

      <View style={styles.content}>
        <Text
          style={[styles.name, { color: colors.username }]}
          numberOfLines={1}
        >
          {user.follower.name}
        </Text>

        <Text numberOfLines={2} style={styles.subTitle}>
          {user.follower.bio}
        </Text>
      </View>
      {/* {selectable &&
        (isSelected ? (
          <AntDesign name="checkcircle" size={24} color="royalblue" />
        ) : (
          <FontAwesome name="circle-thin" size={24} color="lightgray" />
        ))} */}
    </Pressable>
  );
};

export default FollwerItemList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
  },
  subTitle: {
    color: "#9CB1D8",
  },
});
