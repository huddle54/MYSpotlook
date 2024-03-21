import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
  Feather,
} from "@expo/vector-icons";
import { S3Image } from "aws-amplify-react-native";
import { deleteBlock } from "../../graphql/mutations";
import AppText from "../AppText";
import { API, graphqlOperation } from "aws-amplify";
import { useTheme } from "../../config/ThemeProvider";

const BlockAccounts = ({ blockers, user, fetchUser, loading }) => {
  const { dark, colors, setScheme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const styles = StyleSheet.create({
    container: {
      padding: 15,
      alignItems: "center",
      flexDirection: "row",
    },
    title: {
      marginLeft: 10,
      color: colors.icons,
    },
  });

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: colors.postCardOutline,
      }}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}
      >
        <MaterialCommunityIcons
          name="account-cancel"
          size={24}
          color={colors.icons}
        />
        <Text style={styles.title}>Block account</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <LinearGradient
          colors={[colors.gradientStartColor, colors.gradientEndColor]}
          style={{ flex: 1 }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              borderBottomWidth: 1,
            }}
          >
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Ionicons
                style={styles.backIcon}
                name="arrow-back-outline"
                size={25}
                color={colors.icons}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 24, right: 10, color: "#3570EC" }}>
              Blocked Account
            </Text>
            <View></View>
          </View>
          <FlatList
            data={blockers}
            renderItem={({ item }) => <BlockedUsers item={item} />}
            keyExtractor={(item) => item.id}
            refreshing={loading}
            onRefresh={fetchUser}
          />
        </LinearGradient>
      </Modal>
    </View>
  );
};

const BlockedUsers = ({ item }) => {
  const { dark, colors, setScheme } = useTheme();
  const removeBlock = async () => {
    try {
      const res = await API.graphql(
        graphqlOperation(deleteBlock, { input: { id: item.id } })
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePress = async () => {
    await removeBlock();
  };

  return (
    <View>
      <View style={styles.usersection}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <View style={styles.userContainer}>
              <View style={styles.avatar}>
                {item.user.image ? (
                  <S3Image style={styles.avatar} imgKey={item.user.image} />
                ) : (
                  <Image
                    source={require("../../../assets/user.png")}
                    style={styles.avatar}
                  />
                )}
              </View>
              <View style={styles.usertextContainer}>
                <View style={{ flexDirection: "row" }}>
                  <AppText style={styles.usertitle}>
                    {" "}
                    @{item.user.username}
                  </AppText>
                  {/* {
                          VerifiedUser.verifiedUsersId.includes(item.user.id) &&  <Verified size={16}/> 
                          } */}
                </View>
                <AppText style={styles.usersubTitle}>{item.user.name}</AppText>
              </View>
            </View>
          </TouchableOpacity>
          <View>
            <TouchableOpacity style={styles.userBtn2} onPress={handlePress}>
              <Text style={styles.userBtnText2}>Unblock</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={[styles.line, { borderBottomColor: colors.postCardOutline }]}
      ></View>
    </View>
  );
};

export default BlockAccounts;

const styles = StyleSheet.create({
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  usertextContainer: {
    paddingLeft: 13,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  usertitle: {
    fontSize: 14,
    marginBottom: 2,
  },
  usersubTitle: {
    fontSize: 12,
    color: "#9CB1D8",
    fontWeight: "bold",
    marginLeft: 3,
  },
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
  line: {
    borderBottomWidth: 1,

    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  usersection: {
    padding: 5,
    paddingRight: 8,
    paddingLeft: 8,
    flexDirection: "column",
    justifyContent: "center",
  },
});
