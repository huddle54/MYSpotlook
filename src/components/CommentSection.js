import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppText from "./AppText";
import { Ionicons, AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { S3Image } from "aws-amplify-react-native";
import { getUser } from "../graphql/queries";
import moment from "moment";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API, graphqlOperation, Auth } from "aws-amplify";
import VerifiedUser from "./../config/VerifiedUser";
import DeleteSheet from "./Bottomsheets/DeleteSheet";
import { deleteComment } from "../graphql/mutations";
import Verified from "./Verifed";
import ReportList from "../components/Report";
import { useTheme } from "../config/ThemeProvider";

const CommentSection = ({ item, userlst }) => {
  const { dark, colors, setScheme } = useTheme();
  const [show, setShow] = useState(false);
  const [delCmd, setDelCmd] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [cuser, setCuser] = useState(true);

  const isCurrentUser = cuser === item.user.id || cuser === userlst.user.id;
  console.log(isCurrentUser);
  const deleteCmnt = async () => {
    const onDltComment = {
      id: item.id,
    };
    const deleteCmd = await API.graphql(
      graphqlOperation(deleteComment, { input: onDltComment })
    );
    setDelCmd("");
    console.log(deleteCmd);
  };

  const handlePress = () => {
    if (isCurrentUser) {
      deleteCmnt();
    } else {
      // setModalVisible(true);
    }
  };

  const [isMe, setIsMe] = useState(false);
  const fetchUser = async () => {
    const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
    const userId = item.user.id || userInfo.attributes.sub;

    const idUser = userInfo.attributes.sub;
    setCuser(idUser);

    if (!userId) {
      return;
    }

    const isMe = userId === userInfo.attributes.sub;
    setIsMe(isMe);

    try {
      const getAuth = await API.graphql(
        graphqlOperation(getUser, { id: userId })
      );
      if (!getAuth) {
        if (isMe) {
        } else {
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <View style={styles.cmdssection}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.cmdsContainer}>
            {item.user.image ? (
              <View style={styles.cmdsavatar}>
                <S3Image style={styles.cmdsavatar} imgKey={item.user.image} />
              </View>
            ) : (
              <Image
                source={require("../../assets/user.png")}
                style={styles.cmdsavatar}
              />
            )}
            <View style={styles.cmdstextContainer}>
              <View style={{ flexDirection: "row" }}>
                <AppText style={styles.cmdstitle}>
                  @{item.user.username}
                </AppText>
                {VerifiedUser.verifiedUsersId.includes(item.user.id) && (
                  <Verified size={16} />
                )}
              </View>

              <View style={styles.rowContainer}>
                <AppText style={styles.cmdssubTitle}>{item.user.name}</AppText>
                <Text style={styles.cmdstime}>
                  {" "}
                  . {moment(item.createdAt).format("D MMM YYYY, h:mm a")}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.options}
            onPress={() => setShow(true)}
          >
            <Ionicons name="ellipsis-vertical" size={22} color={colors.icons} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.cmdstext, { color: colors.postText }]}>
          {item.text}
        </Text>
      </View>
      <View
        style={[styles.line, { borderBottomColor: colors.postCardOutline }]}
      ></View>

      <DeleteSheet
        show={show}
        onDismiss={() => {
          setShow(false);
        }}
        enableBackdropDismiss
        visible={setShow}
      >
        {isCurrentUser ? (
          <TouchableHighlight
            style={{ flex: 1 }}
            onPress={handlePress}
            underlayColor={colors.ripples}
          >
            <View style={styles.dltsize}>
              <Entypo
                style={{ paddingTop: 15, paddingLeft: 15 }}
                name="trash"
                size={17}
                color="#ff5c5c"
              />
              <AppText style={styles.Delete}>Delete</AppText>
            </View>
          </TouchableHighlight>
        ) : (
          <>
            <ReportList
              reportText={"comment"}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              successModal={successModal}
              setSuccessModal={setSuccessModal}
            />
            <TouchableHighlight
              style={{ flex: 1 }}
              onPress={() => setModalVisible(true)}
              underlayColor={colors.ripples}
            >
              <View style={styles.dltsize}>
                <MaterialIcons
                  style={{ paddingTop: 15, paddingLeft: 15 }}
                  name="report"
                  size={17}
                  color="#ff5c5c"
                />
                <AppText style={styles.Delete}>Report Comment</AppText>
              </View>
            </TouchableHighlight>
          </>
        )}
      </DeleteSheet>
    </>
  );
};

export default CommentSection;

const styles = StyleSheet.create({
  cmdssection: {
    padding: 5,
    paddingRight: 8,
    paddingLeft: 8,
    flexDirection: "column",
    justifyContent: "center",
  },
  cmdsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cmdsavatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  cmdstextContainer: {
    paddingLeft: 8,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cmdstitle: {
    fontSize: 14,
    marginBottom: 2,
  },
  cmdssubTitle: {
    fontSize: 12,
    color: "#9CB1D8",
    fontWeight: "bold",
  },
  cmdstime: {
    fontSize: 12,
    color: "#9CB1D8",
  },
  options: {},
  cmdstext: {
    fontSize: 15,
    textAlign: "justify",
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  line: {
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  Delete: {
    textAlign: "left",
    justifyContent: "center",
    paddingTop: 16,
    paddingLeft: 20,
    color: "#ff5c5c",
  },
  dltsize: {
    flexDirection: "row",
  },
});
