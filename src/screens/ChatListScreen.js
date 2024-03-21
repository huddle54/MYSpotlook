import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Platform,
  StyleSheet,
  StatusBar,
  View,
  Text,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ChatListItem from "../components/ChatListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import { useTheme } from "../config/ThemeProvider";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listChatRooms } from "../Chatservices/ChatListqueries";

const myListener = Keyboard.addListener("someListener", () => {
  EventEmitter.addListener("keyboardDidHide", (keyboardDidHide) => {
    removeEventListener("keyboardDidHide", keyboardDidHide);
  });
});

// do some more things
// once you're done, call this
myListener.remove();

const ChatListScreen = ({ navigation }) => {
  const { dark, colors, setScheme } = useTheme();
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchChatRooms = async () => {
    setLoading(true);
    const authUser = await Auth.currentAuthenticatedUser();
    const response = await API.graphql(
      graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
    );
    const rooms = response?.data?.getUser?.ChatRooms?.items;
    const sortedRooms = rooms.sort(
      (r1, r2) =>
        new Date(r2.chatRoom.updatedAt) - new Date(r1.chatRoom.updatedAt)
    );
    setChatRooms(sortedRooms);
    setLoading(false);
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

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
      <View style={styles.header}>
        <Ionicons
          style={styles.backIcon}
          name="arrow-back-outline"
          size={25}
          color={colors.icons}
          onPress={() => navigation.navigate("Home")}
        />
        <View>
          <Text style={styles.headerText}>Conversation </Text>
          <Text style={{color:"red", marginTop: 10}}>* Add verifed tick here </Text>
          <Text style={{color:"red", marginTop: 10}}>* Chatlist UI modification </Text>
        </View>
        <MaterialCommunityIcons
          style={styles.backIcons}
          name="plus-thick"
          size={25}
          color={colors.icons}
          onPress={() => navigation.navigate("AddChat")}
        />
      </View>
      <SafeAreaView style={styles.screen}>
        <FlatList
          data={chatRooms}
          refreshing={loading}
          onRefresh={fetchChatRooms}
          renderItem={({ item }) => (
            <ChatListItem
              chat={item.chatRoom}
              colors={colors}
              renderRightAction={ListItemDeleteAction}
            />
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginBottom: 50,
  },
  header: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3570EC",
    bottom: -20,
  },
  backIcon: {
    position: "absolute",
    left: 10,
    bottom: -10,
  },
  backIcons: {
    position: "absolute",
    right: 10,
    bottom: -10,
  },
});

export default ChatListScreen;
