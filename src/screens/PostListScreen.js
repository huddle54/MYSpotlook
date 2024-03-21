import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Share,
} from "react-native";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import {
  createLike,
  deleteLike,
  createComment,
  deletePost,
  deleteComment,
} from "../graphql/mutations";
import { getUser } from "../graphql/queries";
import {
  onCreateComment,
  onDeleteComment,
  onCreateLike,
  onDeleteLike,
} from "../graphql/subscriptions";
import AppText from "../components/AppText";
import { S3Image } from "aws-amplify-react-native";
import { Provider } from "react-native-paper";
import DetailSheet from "../components/Bottomsheets/PostListBottomSheets";
import CommentSheet from "../components/Bottomsheets/CommentSheet";
import CommentSection from "../components/CommentSection";
import { InputField } from "../styles/AddPost";
import * as Linking from "expo-linking";
import VerifiedUser from "../config/VerifiedUser";
import Verified from "../components/Verifed";
import ReportList from "../components/Report";
import { useTheme } from "../config/ThemeProvider";

const PostListScreen = ({ route }) => {
  const { dark, colors, setScheme } = useTheme();
  const Url_A = "https://spotlook.example.com";

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const navigation = useNavigation();
  const { userlst } = route?.params;

  const [userLike, setUserLike] = useState(null);
  const [myLike, setMyLike] = useState(null);
  const [likesCount, setLikesCount] = useState(userlst.likes.items.length);
  const [loading, setLoading] = useState(false);

  const fetchLike = useCallback(async () => {
    const currentUser = await Auth.currentAuthenticatedUser();
    setUserLike(currentUser);

    const searchedLike = userlst?.likes.items.find(
      (like) => like.userID === currentUser.attributes.sub
    );
    setMyLike(searchedLike);
  }, [userlst?.likes.items]);

  useEffect(() => {
    fetchLike();
  }, [fetchLike]);

  useEffect(() => {
    let createLikeSubscription;
    let deleteLikeSubscription;

    const subscribeToCreateLike = () => {
      createLikeSubscription = API.graphql(
        graphqlOperation(onCreateLike)
      ).subscribe({
        next: (eventData) => {
          const {
            value: {
              data: { onCreateLike: createdLike },
            },
          } = eventData;

          if (
            createdLike.userID === userLike.attributes.sub &&
            createdLike.postID === userlst?.id
          ) {
            setLikesCount((prevCount) => prevCount + 1);
            setMyLike(createdLike);
          }
        },
        error: (error) => {
          console.log("Error subscribing to onCreateLike:", error);
        },
      });
    };

    const subscribeToDeleteLike = () => {
      deleteLikeSubscription = API.graphql(
        graphqlOperation(onDeleteLike)
      ).subscribe({
        next: (eventData) => {
          const {
            value: {
              data: { onDeleteLike: deletedLike },
            },
          } = eventData;

          if (deletedLike.id === myLike?.id) {
            setLikesCount((prevCount) => prevCount - 1);
            setMyLike(null);
          }
        },
        error: (error) => {
          console.log("Error subscribing to onDeleteLike:", error);
        },
      });
    };

    subscribeToCreateLike();
    subscribeToDeleteLike();

    return () => {
      if (createLikeSubscription) createLikeSubscription.unsubscribe();
      if (deleteLikeSubscription) deleteLikeSubscription.unsubscribe();
    };
  }, [userlst, userlst?.id, myLike?.id, userLike?.attributes?.sub]);

  // useEffect(() => {
  //   const createLikeSubscription = API.graphql(
  //     graphqlOperation(onCreateLike)
  //   ).subscribe({
  //     next: (eventData) => {
  //       const {
  //         value: {
  //           data: { onCreateLike: createdLike },
  //         },
  //       } = eventData;

  //       if (
  //         createdLike.userID === userLike.attributes.sub &&
  //         createdLike.postID === userlst?.id
  //       ) {
  //         setLikesCount((prevCount) => prevCount + 1);
  //         setMyLike(createdLike);
  //       }
  //     },
  //     error: (error) => {
  //       console.log("Error subscribing to onCreateLike:", error);
  //     },
  //   });

  //   const deleteLikeSubscription = API.graphql(
  //     graphqlOperation(onDeleteLike)
  //   ).subscribe({
  //     next: (eventData) => {
  //       const {
  //         value: {
  //           data: { onDeleteLike: deletedLike },
  //         },
  //       } = eventData;

  //       if (deletedLike.id === myLike?.id) {
  //         setLikesCount((prevCount) => prevCount - 1);
  //         setMyLike(null);
  //       }
  //     },
  //     error: (error) => {
  //       console.log("Error subscribing to onDeleteLike:", error);
  //     },
  //   });

  //   return () => {
  //     createLikeSubscription.unsubscribe();
  //     deleteLikeSubscription.unsubscribe();
  //   };
  // }, [userlst, userlst?.id, myLike?.id, userLike?.attributes?.sub]);

  const submitLike = async () => {
    setLoading(true);
    const like = {
      userID: userLike.attributes.sub,
      postID: userlst.id,
    };

    try {
      const res = await API.graphql(
        graphqlOperation(createLike, { input: like })
      );
      setMyLike(res.data.createLike);
      console.log(res);
      setLikesCount((prevCount) => prevCount + 1);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const removeLike = async () => {
    setLoading(true);
    try {
      await API.graphql(
        graphqlOperation(deleteLike, { input: { id: myLike.id } })
      );
      setLikesCount((prevCount) => prevCount - 1);
      setMyLike(null);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const onLike = async () => {
    if (!userLike) {
      return;
    }
    if (!loading) {
      if (!myLike) {
        await submitLike();
      } else {
        await removeLike();
      }
    }
  };

  const [comments, setComments] = useState("");

  const [userCmd, setUserCmd] = useState([]);
  const [myCmd, setMyCmd] = useState(null);
  const [cmdCount, setCmdCount] = useState(userlst.comments.items.length);

  useEffect(() => {
    const fetchComment = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setUserCmd(userInfo);
      const searchedComment = userlst.comments.items.find(
        (usrcomment) => usrcomment.userID === userInfo.attributes.sub
      );
      setMyCmd(searchedComment);
    };
    fetchComment();
  }, []);

  const submitComment = async () => {
    const usrComment = {
      userID: userCmd.attributes.sub,
      postID: userlst.id,
      text: comments,
      username: userCmd.username,
      name: userCmd.attributes.name,
      image: userCmd.attributes.image,
    };

    try {
      const res = await API.graphql(
        graphqlOperation(createComment, { input: usrComment })
      );
      setMyCmd(res.data.createComment);
      setCmdCount(cmdCount + 1);
      setComments(null);
    } catch (e) {
      console.log(e);
    }
  };

  const removeComment = async () => {
    try {
      await API.graphql(graphqlOperation(deleteComment, { id: myCmd.id }));
      setCmdCount(cmdCount - 1);
      setMyCmd(null);
    } catch (e) {
      console.log(e);
    }
  };

  const onComment = async () => {
    if (!userCmd) {
      return;
    }

    if (!myCmd) {
      await submitComment();
    } else {
      await removeComment();
    }
  };

  const [delpost, setDelPost] = useState(false);
  const removePost = async () => {
    const onDltPost = {
      id: userlst.id,
    };

    const delPost = await API.graphql(
      graphqlOperation(deletePost, { input: onDltPost })
    );
    await Storage.remove(userlst.image, {
      level: "public",
      conntentType: "image/png",
    });
    console.log(delPost);
    navigation.navigate("Home2");
    setDelPost("");
  };

  const [isMe, setIsMe] = useState(false);

  const [lstCmd, setLstCmd] = useState([]);
  const [usrCmd, setUsrCmd] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      const userId = userlst.user.id || userInfo.attributes.sub;

      if (!userId) {
        return;
      }

      const isMe = userId === userInfo.attributes.sub;
      setIsMe(isMe);

      try {
        // const getAuth = await API.graphql(
        //   graphqlOperation(getUser, { id: userId })
        // );
        if (!getAuth) {
          if (isMe) {
          } else {
          }
        }
      } catch (e) {}

      const getAuth = await API.graphql(
        graphqlOperation(getUser, { id: userInfo.attributes.sub })
      );
      setUsrCmd(getAuth.data.getUser);

      const cmdBlk = userlst.comments.items.filter(
        (cmdID) =>
          !usrCmd?.blockedUsers?.items?.find(
            (blockedUser) => blockedUser.userID === cmdID.user.id
          ) ===
          !usrCmd?.blockedBy?.items?.find(
            (blocked) => blocked.blockedUserID === cmdID.user.id
          )
      );
      // console.log(cmdBlk);
      setLstCmd(cmdBlk);
    };
    fetchUser();

    // Subscribe to new comments
    const subscription = API.graphql(
      graphqlOperation(onCreateComment)
    ).subscribe({
      next: (eventData) => {
        const newComment = eventData.value.data.onCreateComment;
        // Update lstCmd state with the new comment
        setLstCmd((prevCmds) => [...prevCmds, newComment]);
      },
      error: (error) => {
        console.error("Subscription error:", error);
      },
    });

    const onDeleteCommentSubscription = API.graphql(
      graphqlOperation(onDeleteComment)
    ).subscribe({
      next: (eventData) => {
        const deletedComment = eventData.value.data.onDeleteComment;
        // Remove the deleted comment from lstCmd state
        setLstCmd((prevCmds) =>
          prevCmds.filter((item) => item.id !== deletedComment.id)
        );
      },
      error: (error) => {
        console.error("Subscription error:", error);
      },
    });

    // Cleanup function to unsubscribe from the subscription
    return () => {
      subscription.unsubscribe();
      onDeleteCommentSubscription.unsubscribe();
    };
  }, [usrCmd.id]);

  // const generateDeepLink = () => {
  //   // Replace `example.com` with your own domain name
  //   const deepLink = `spotlook.page.link/LsKR/p/${userlst.id}`;

  //   return Linking.createURL(deepLink);
  // };

  // const onShare = async () => {
  //   try {
  //     const shareURL = await generateDeepLink();
  //     console.log(shareURL);
  //     await Share.share({ message: `hello ${shareURL}` });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const generateDeepLink = () => {
  //   // Replace `your.app.link` with your own domain name
  //   const deepLink = `spotlook.page.link/LsKR/p/${userlst.id}`;
  //   return Linking.createURL(deepLink);
  // };

  // const onShare = async () => {
  //   try {
  //     const shareURL = generateDeepLink();
  //     await Share.share({ message: `Check out this post: ${shareURL}` });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [modalVisible, setModalVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const handleSubmit = () => {
    setModalVisible(false);
    setSuccessModal(true);
  };

  const [check1, setCheck1] = useState(false);

  const nativeAdViewRef = useRef();

  React.useEffect(() => {
    nativeAdViewRef.current?.loadAd();
  }, []);

  return (
    <Provider>
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
            onPress={() => navigation.navigate("Home2")}
          />
          <View>
            <Text style={styles.headerText}>Post</Text>
            <Text style={{color: 'red'}}>*add Post Text link</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              padding: 15,
              paddingTop: 5,
            }}
          >
            <>
              <View style={styles.detailsContainer}>
                <View>
                  {userlst.user.image ? (
                    <View style={styles.avatar}>
                      <S3Image
                        style={styles.avatar}
                        imgKey={userlst.user.image}
                      />
                    </View>
                  ) : (
                    <Image
                      source={require("../../assets/user.png")}
                      style={styles.avatar}
                    />
                  )}
                </View>

                <View style={styles.textContainer}>
                  <View style={{ flexDirection: "row" }}>
                    <AppText style={styles.title}>{userlst.name}</AppText>
                    {VerifiedUser.verifiedUsersId.includes(userlst.user.id) && (
                      <Verified size={14} />
                    )}
                  </View>

                  <AppText style={styles.subTitle}>@{userlst.username}</AppText>
                </View>
                <TouchableOpacity
                  style={styles.optionIcon}
                  onPress={() => setShow(true)}
                >
                  <Ionicons
                    name="ellipsis-vertical"
                    size={22}
                    color={colors.icons}
                  />
                </TouchableOpacity>
              </View>

              <View>
                {userlst.content ? (
                  <Text style={[styles.postText, { color: colors.postText }]}>
                    {userlst.content}
                  </Text>
                ) : (
                  <></>
                )}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ViewImage", { userImg: userlst })
                  }
                >
                  {userlst.image ? (
                    <View style={styles.image}>
                      <S3Image style={styles.image} imgKey={userlst.image} />
                    </View>
                  ) : (
                    <></>
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.iconContainer}>
                <View style={{ flexDirection: "row" }}>
                  <TouchableWithoutFeedback
                    onPress={onLike}
                    item={userlst}
                    disabled={loading}
                  >
                    <Ionicons
                      name={!myLike ? "heart-outline" : "heart"}
                      color={!myLike ? "red" : "red"}
                      size={18}
                    />
                  </TouchableWithoutFeedback>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 2.5,
                      marginLeft: 2,
                      color: colors.postText,
                    }}
                  >
                    {likesCount}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableWithoutFeedback onPress={() => setShow1(true)}>
                    <Ionicons
                      name="ios-chatbubble-outline"
                      size={18}
                      color={colors.commentIcon}
                    />
                  </TouchableWithoutFeedback>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 2.5,
                      marginLeft: 2,
                      color: colors.postText,
                    }}
                  >
                    {lstCmd.length}
                  </Text>
                </View>
                {/* <TouchableWithoutFeedback onPress={onShare}>
                  <Ionicons
                    name="md-share-social-outline"
                    size={18}
                    color={colors.commentIcon}
                  />
                </TouchableWithoutFeedback> */}
              </View>
            </>

            <View
              style={[
                styles.Cmdcontainer,
                {
                  borderTopColor: colors.postCardOutline,
                  borderBottomColor: colors.postCardOutline,
                },
              ]}
            >
              <InputField
                style={[styles.Cmdinput, { color: colors.postText }]}
                multiline
                numberOfLines={1}
                placeholder="Post here........"
                value={comments}
                onChangeText={(value) => setComments(value)}
                placeholderTextColor={colors.textedPost}
              />
              <TouchableWithoutFeedback
                onPress={submitComment}
                item={userlst}
                style={styles.Cmdbutton}
                disabled={!comments}
              >
                <Text style={styles.CmdbuttonText}>Post</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </ScrollView>

        <DetailSheet
          show={show}
          onDismiss={() => {
            setShow(false);
          }}
          enableBackdropDismiss
          visible={setShow}
          size={0.11}
        >
          {/* <TouchableOpacity style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              style={{ paddingTop: 15, paddingLeft: 15 }}
              name="share"
              size={17}
              color="#3570EC"
            />
            <AppText style={styles.optionText1}>Share</AppText>
          </TouchableOpacity> */}

          {isMe ? (
            <>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={removePost}
                item={userlst}
                disabled={delpost}
              >
                <Entypo
                  style={{ paddingTop: 15, paddingLeft: 15 }}
                  name="trash"
                  size={17}
                  color="#ff5c5c"
                />
                <AppText style={styles.optionText2}>Delete</AppText>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <ReportList
                reportText={"post"}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                successModal={successModal}
                setSuccessModal={setSuccessModal}
              />
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => setModalVisible(true)}
              >
                <MaterialIcons
                  style={{ paddingTop: 15, paddingLeft: 15 }}
                  name="report"
                  size={17}
                  color="#ff5c5c"
                />
                <AppText style={styles.optionText2}>Report</AppText>
              </TouchableOpacity>
            </>
          )}
        </DetailSheet>
        <CommentSheet
          show={show1}
          onDismiss={() => {
            setShow1(false);
          }}
          enableBackdropDismiss
          visible={setShow1}
        >
          <ScrollView>
            <View style={{ paddingHorizontal: 5, marginBottom: 35 }}>
              {lstCmd.map((item) => (
                <CommentSection item={item} key={item.id} userlst={userlst} />
              ))}
            </View>
          </ScrollView>
        </CommentSheet>
      </LinearGradient>
    </Provider>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  header: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3570EC",
    bottom: -10,
    letterSpacing: 1,
  },
  backIcon: {
    position: "absolute",
    left: 10,
    bottom: 10,
  },

  detailsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    flexDirection: "row",
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  title: {
    fontSize: 14,
    marginBottom: 0,
    paddingRight: 2,
  },
  subTitle: {
    fontSize: 12,
    color: "#9CB1D8",
    fontWeight: "bold",
    opacity: 0.8,
  },
  optionIcon: {
    position: "absolute",
    right: 0,
  },
  image: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 20,
    overflow: "hidden",
    resizeMode: "cover",
    marginTop: 5,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 0,
    paddingTop: 0,
    marginTop: 10,
  },
  postText: {
    marginTop: 0,
    lineHeight: 18,
    marginBottom: 5,
    marginTop: 10,
  },
  Cmdcontainer: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    borderBottomColor: "#ddd",
    marginVertical: 10,
    paddingHorizontal: 30,
    padding: 6,
    paddingTop: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Cmdbutton: {
    width: "40%",
    height: 30,
    borderRadius: 5,
    right: 25,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
  },
  CmdbuttonText: {
    color: "#3673E6",
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 5,
    bottom: 1,
    fontSize: 16,
  },
  Cmdinput: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "left",
    fontSize: 18,
    right: 10,
    // color: "white",
  },
  optionText1: {
    textAlign: "center",
    justifyContent: "center",
    paddingTop: 15,
    paddingLeft: 30,
    color: "#3570EC",
  },
  optionText2: {
    textAlign: "center",
    justifyContent: "center",
    paddingTop: 15,
    paddingLeft: 30,
    color: "#ff5c5c",
  },
  optionText3: {
    textAlign: "center",
    justifyContent: "center",
    color: "#ff5c5c",
    marginStart: 20,
    fontWeight: "bold",
  },
});

export default PostListScreen;
