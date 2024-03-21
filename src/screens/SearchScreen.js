import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../config/ThemeProvider";
import { listPosts, listUsers, getUser } from "../graphql/queries";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { S3Image } from "aws-amplify-react-native";

const SearchScreen = () => {
  const navigation = useNavigation();
  const { dark, colors, setScheme } = useTheme();

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [usr, setUsr] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const filters = {
          name: {
            contains: searchTerm,
          },
        };
        const userInfo = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        );
        const currentUser = userData.data.getUser;

        const blockedUsers = currentUser.blockedUsers.items.map(
          (blockedUser) => blockedUser.userID
        );
        const blockedByUsers = currentUser.blockedBy.items.map(
          (blocked) => blocked.blockedUserID
        );
        const blockedUserIds = [...blockedUsers, ...blockedByUsers];

        const fetchData = await API.graphql(graphqlOperation(listUsers));
        const filteredUsers = fetchData.data.listUsers.items.filter(
          (user) =>
            !blockedUserIds.includes(user.id) &&
            user.name.toUpperCase().includes(searchTerm.toUpperCase())
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchTerm !== "") {
      fetchUsers();
    } else {
      setUsers([]);
    }
  }, [searchTerm]);

  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate("Profile3", { id: item.id })}
        style={styles.container}
      >
        {item.image ? (
          <S3Image imgKey={item.image} style={styles.image} />
        ) : (
          <Image
            style={styles.image}
            source={require("../../assets/user.png")}
          />
        )}

        <View style={styles.content}>
          <Text
            style={[styles.name, { color: colors.username }]}
            numberOfLines={1}
          >
            {item.name}
          </Text>

          <Text style={styles.subTitle}>{item.username}</Text>
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
      <Text style={{color: 'red'}}> * Search Massonry using flash list form with ads</Text>
      <View
        style={{
          // alignItems: "flex-start",
          // borderColor: "#ccc",
          // width: "95%",
          height: 40,
          // borderWidth: 1,
          borderRadius: 10,
          backgroundColor: colors.ripples,
          marginTop: 5,
          marginBottom: 10,
          marginHorizontal: 15,
          elevation: 2,
          shadowColor: "#333",
        }}
      >
      
        <TextInput
          placeholder="Search users..."
          placeholderTextColor={colors.placeHolder}
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
          style={{
            fontSize: 16,
            padding: 10,
            flex: 1,
            fontFamily: "Roboto",
            color: colors.postText,
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: colors.sheetHeaderbar,
          }}
        />
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </LinearGradient>
  );
};

export default SearchScreen;

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
