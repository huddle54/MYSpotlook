import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Auth, API, graphqlOperation } from "aws-amplify";
import {
  Ionicons,
  AntDesign,
  Octicons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  getUser,
  listBlocks,
  listFollowings,
  listPosts,
} from "../graphql/queries";
import PostCard from "../components/PostCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { S3Image } from "aws-amplify-react-native";
import {
  createFollowing,
  deleteFollowing,
  createBlock,
  deleteBlock,
} from "../graphql/mutations";
import { onUpdateUser } from "../graphql/subscriptions";
import Userdetails from "../components/Userdetails";
import AppText from "../components/AppText";
import ProfileSheet from "../components/Bottomsheets/PostListBottomSheets";
import VerifiedUser from "../config/VerifiedUser";
import Verified from "../components/Verifed";
import ReportList from "../components/Report";
import { useTheme } from "../config/ThemeProvider";

const ProfileScreenHeader = ({
  user,
  posts,
  isMe,
  followers,
  followings,
  myBlk,
  removeBlock,
}) => {
  const { dark, colors, setScheme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const [userFlw, setUserFle] = useState(null);
  const [myFlw, setMyFlw] = useState(null);
  const [followerCnt, setFollowerCnt] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [blockModal, setBlockModal] = useState(false);

  useEffect(() => {
    const fetchUserFollower = async () => {
      const currentUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUserFle(currentUser);

      const searchedFollowing = user?.following?.items?.find(
        (follow) => follow?.followingID === currentUser?.attributes?.sub
      );
      setMyFlw(searchedFollowing);
    };
    fetchUserFollower();
  }, []);

  const submitFollowing = async () => {
    const follower = {
      followerID: user.id,
      followingID: userFlw?.attributes?.sub,
    };

    try {
      const res = await API.graphql(
        graphqlOperation(createFollowing, { input: follower })
      );
      setMyFlw(res.data.createFollowing);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const removeFollowing = async () => {
    try {
      await API.graphql(
        graphqlOperation(deleteFollowing, { input: { id: myFlw.id } })
      );
      setMyFlw(null);
    } catch (e) {
      console.log(e);
    }
  };

  const onFollowing = async () => {
    if (!userFlw) {
      return;
    }

    if (!myFlw) {
      await submitFollowing();
    } else {
      await removeFollowing();
    }
  };

  const signOut = () => {
    Auth.signOut();
  };

  if (!user) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.userImg}>
          {myBlk ? (
            <>
              <Image
                style={styles.userImg}
                source={require("../../assets/user.png")}
              />
            </>
          ) : (
            <>
              {user.image ? (
                <S3Image style={styles.userImg} imgKey={user.image} />
              ) : (
                <Image
                  style={styles.userImg}
                  source={require("../../assets/user.png")}
                />
              )}
            </>
          )}
        </View>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text style={styles.userName}>{user.name}</Text>
          {VerifiedUser.verifiedUsersId.includes(user.id) && (
            <Verified size={18} />
          )}
        </View>
        <Text style={styles.aboutUser}>{user.username}</Text>
        {myBlk ? (
          <></>
        ) : (
          <>
            {user.bio ? (
              <Text style={styles.aboutUser2}>{user.bio}</Text>
            ) : (
              <></>
            )}
          </>
        )}
        <View style={styles.userBtnWrapper}>
          {myBlk ? (
            <>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                  setBlockModal(true);
                }}
              >
                <Text style={styles.userBtnText}>
                  {myBlk ? "Unblock" : "block"}
                </Text>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={blockModal}
                onRequestClose={() => {
                  setBlockModal(!blockModal);
                }}
              >
                <View style={styles.centeredView}>
                  <View
                    style={[
                      styles.modalView,
                      { backgroundColor: colors.sheetBackground },
                    ]}
                  >
                    <View>
                      <View style={{ marginBottom: 10 }}>
                        <Text
                          style={{
                            fontWeight: "bold",
                            color: "#9CB1D8",
                            fontSize: 18,
                          }}
                        >
                          Unblock {user.username}?
                        </Text>
                      </View>
                      <View
                        style={{ justifyContent: "center", marginBottom: 10 }}
                      >
                        <Text
                          style={{
                            color: "#9CB1D8",
                            fontSize: 13,
                            textAlign: "justify",
                            lineHeight: 17,
                          }}
                        >
                          Are you sure you want to unblock this user?
                        </Text>
                        <Text
                          style={{
                            color: "#9CB1D8",
                            fontSize: 13,
                            textAlign: "justify",
                            lineHeight: 17,
                          }}
                        >
                          This could follow the user and see content from the
                          person's posts and comments.
                        </Text>
                      </View>
                      <View style={{ marginTop: 10 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              setBlockModal(!blockModal);
                            }}
                          >
                            <Text style={styles.optionText3}>Cancel</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              setBlockModal(!blockModal || removeBlock);
                            }}
                          >
                            <Text
                              style={{
                                textAlign: "center",
                                justifyContent: "center",
                                color: "#ff5c5c",
                                marginStart: 20,
                                fontWeight: "bold",
                              }}
                            >
                              Unblock
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            </>
          ) : (
            <>
              {isMe ? (
                <>
                  <TouchableOpacity
                    style={styles.userBtn}
                    onPress={() => navigation.navigate("ProfileEdit")}
                  >
                    <Text style={styles.userBtnText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.userBtn2}
                    onPress={() => signOut()}
                  >
                    <Text style={styles.userBtnText2}>Logout</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  {/* <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                    <Text style={styles.userBtnText}>Message</Text>
                  </TouchableOpacity> */}

                  <TouchableOpacity
                    style={styles.userBtn}
                    onPress={onFollowing}
                    user={user}
                  >
                    <Text style={styles.userBtnText}>
                      {myFlw ? "Unfollow" : "Follow"}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          )}
        </View>
        <View style={styles.userInfoWrapper}>
          <Userdetails
            posts={posts}
            followers={followers}
            followings={followings}
            isMe={isMe}
            user={user}
            myBlk={myBlk}
          />
        </View>
      </View>
    </View>
  );
};

const ProfileScreen = () => {
  const { dark, colors, setScheme } = useTheme();
  const [user, setUser] = useState([]);
  const [isMe, setIsMe] = useState(false);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [blockers, setBlockers] = useState([]);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const navigation = useNavigation();

  const [show, setShow] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [blockModal, setBlockModal] = useState(false);

  // get the current user
  const fetchUser = async () => {
    const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
    const userId = route?.params?.id || userInfo?.attributes?.sub;

    if (!userId) {
      return;
    }

    const isMe = userId === userInfo?.attributes?.sub;
    setIsMe(isMe);
    setLoading(true);
    try {
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: userId })
      );

      if (!userData) {
        if (isMe) {
        } else {
          // otherwise, Alert the user
        }
        return;
      }
      setUser(userData.data.getUser);
    } catch (e) {
    } finally {
      setLoading(false);
    }

    const userPost = await API.graphql(
      graphqlOperation(listPosts, { filter: { userID: { eq: userId } } })
    );
    setPosts(userPost.data.listPosts.items);

    const userData = await API.graphql(
      graphqlOperation(getUser, { id: userInfo?.attributes?.sub })
    );

    const cUser = userData?.data?.getUser;

    const filterBlk = cUser?.blockedUsers?.items;
    const filterBlks = cUser?.blockedBy?.items;

    const userFollower = await API.graphql(
      graphqlOperation(listFollowings, {
        filter: { followerID: { eq: userId } },
      })
    );
    const filtereds = userFollower.data.listFollowings.items.filter(
      (fler) =>
        !filterBlk.find((blks) => blks.userID === fler.followingID) ===
        !filterBlks.find((blks) => blks.blockedUserID === fler.followingID)
    );
    // setFollowers(userFollower.data.listFollowings.items);
    setFollowings(filtereds);
    // console.log(filterBlk);

    const userFollowing = await API.graphql(
      graphqlOperation(listFollowings, {
        filter: { followingID: { eq: userId } },
      })
    );
    // console.log(
    //   userFollowing.data.listFollowings.items.filter(
    //     (fler) =>
    //       !filterBlk.find((blks) => blks.userID === fler.followerID) ===
    //       !filterBlks.find((blks) => blks.blockedUserID === fler.followerID)
    //   )
    // );
    // console.log(userFollowing.data.listFollowings.items)
    const filtered = userFollowing.data.listFollowings.items.filter(
      (fler) =>
        !filterBlk.find((blks) => blks.userID === fler.followerID) ===
        !filterBlks.find((blks) => blks.blockedUserID === fler.followerID)
    );
    setFollowers(filtered);

    const userBlocking = await API.graphql(
      graphqlOperation(listBlocks, {
        filter: { blockedUserID: { eq: userId } },
      })
    );

    setBlockers(userBlocking.data.listBlocks.items);
  };

  
  useEffect(() => {
    fetchUser();
  }, []);

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

      const userIds = route?.params?.id || currentUser.attributes.sub;

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
  }, []);

  const submitBlock = async () => {
    const blockUser = {
      userID: user.id,
      blockedUserID: userblock?.attributes?.sub,
    };

    try {
      const res = await API.graphql(
        graphqlOperation(createBlock, { input: blockUser })
      );
      setMyBlk(res.data.createBlock);
    } catch (e) {
      console.log(e);
    }
  };
  const removeBlock = async () => {
    try {
      await API.graphql(
        graphqlOperation(deleteBlock, { input: { id: myBlk.id } })
      );
      setMyBlk(null);
    } catch (e) {
      console.log(e);
    }
  };

  const onBlocking = async () => {
    if (!userblock) {
      return;
    }

    if (!myBlk) {
      await submitBlock();
    } else {
      await removeBlock();
    }
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
      <View style={styles.header}>
        <Ionicons
          style={styles.backIcon}
          name="arrow-back-outline"
          size={25}
          color={colors.icons}
          onPress={() => navigation.goBack("Home")}
        />
        <View>
          <Text style={styles.headerText}>Profile</Text>
        </View>
        {isMe ? (
          <Ionicons
            style={styles.backsIcon}
            name="ios-settings"
            size={24}
            color={colors.icons}
            onPress={() => navigation.navigate("Settings")}
          />
        ) : (
          <Ionicons
            style={styles.backsIcon}
            name="ellipsis-vertical"
            size={22}
            color={colors.icons}
            onPress={() => setShow(true)}
          />
        )}
      </View>

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={{ paddingTop: 10, paddingHorizontal: 20 }}>
            {myBlk ? (
              <></>
            ) : (
              <PostCard
                item={item}
                onPress={() =>
                  navigation.navigate("PostList", { userlst: item })
                }
              />
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={fetchUser}
        ListHeaderComponent={() => (
          <>
            <ProfileScreenHeader
              user={user}
              posts={posts}
              isMe={isMe}
              followers={followers}
              followings={followings}
              loading={loading}
              myBlk={myBlk}
              removeBlock={removeBlock}
            />
          </>
        )}
      />
      <ProfileSheet
        show={show}
        onDismiss={() => {
          setShow(false);
        }}
        enableBackdropDismiss
        visible={setShow}
        size={0.15}
      >
        <BlockComponent
          user={user}
          myBlk={myBlk}
          onBlocking={onBlocking}
          followers={followers}
          followings={followings}
          setShow={setShow}
        />
      </ProfileSheet>
    </LinearGradient>
  );
};

const BlockComponent = ({
  myBlk,
  user,
  onBlocking,
  followers,
  followings,
  setShow,
}) => {
  const { dark, colors, setScheme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [blockModal, setBlockModal] = useState(false);

  const [blkFlw, setBlkFlw] = useState(null);
  const [blkFlws, setBlkFlws] = useState(null);

  useEffect(() => {
    const fetchBlocks = async () => {
      const currentUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      const searchedBlocks = followers?.find(
        (flw) => flw?.followerID === currentUser?.attributes?.sub
      );
      setBlkFlw(searchedBlocks);
    };
    fetchBlocks();
  }, []);

  const removeFollowings = async () => {
    try {
      const res = await API.graphql(
        graphqlOperation(deleteFollowing, { input: { id: blkFlw?.id } })
      );
      setBlkFlw(null);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchBlockss = async () => {
      const currentUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      const blockSearch = followings?.find(
        (flw) => flw?.followingID === currentUser?.attributes?.sub
      );
      setBlkFlws(blockSearch);
    };
    fetchBlockss();
  }, []);

  const removeFollower = async () => {
    try {
      const res = await API.graphql(
        graphqlOperation(deleteFollowing, { input: { id: blkFlws?.id } })
      );
      setBlkFlws(null);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePress = async () => {
    // Function 1
    setShow(false);
    console.log("Function 1 executed");

    setBlockModal(!blockModal);
    console.log("Function 2 executed");

    await onBlocking();
    console.log("Function 3 executed");

    // Function 2
    await removeFollowings();
    console.log("Function 4 executed");

    await removeFollower();
    console.log("Function 5 executed");
  };

  return (
    <>
      <ReportList
        reportText={"user"}
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
        <AppText style={styles.optionText2}>Report User</AppText>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={blockModal}
        onRequestClose={() => {
          setBlockModal(!blockModal);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              { backgroundColor: colors.sheetBackground },
            ]}
          >
            <View>
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#9CB1D8",
                    fontSize: 18,
                  }}
                >
                  {myBlk
                    ? `Unblock ${user.username}`
                    : `Block ${user.username}`}
                  ?
                </Text>
              </View>
              <View style={{ justifyContent: "center", marginBottom: 10 }}>
                <Text
                  style={{
                    color: "#9CB1D8",
                    fontSize: 13,
                    textAlign: "justify",
                    lineHeight: 17,
                  }}
                >
                  {myBlk
                    ? "Are you sure you want to unblock this user? This could follow the user and see content from the person's posts and comments."
                    : "Are you sure you want to block this user? The user is no longer able to see content from the person who blocked them. This could include posts, comments, and other forms of content."}
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setBlockModal(!blockModal);
                    }}
                  >
                    <Text style={styles.optionText3}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handlePress}>
                    <Text
                      style={{
                        textAlign: "center",
                        justifyContent: "center",
                        color: "#ff5c5c",
                        marginStart: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {myBlk ? "Unblock" : "Block"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => {
          setBlockModal(true);
        }}
      >
        <MaterialIcons
          style={{ paddingTop: 15, paddingLeft: 15 }}
          name="block"
          size={17}
          color="#ff5c5c"
        />
        <AppText style={styles.optionText2}>Block User</AppText>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  optionText3: {
    textAlign: "center",
    justifyContent: "center",
    color: "#ff5c5c",
    marginStart: 20,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 40,
    borderRadius: 10,
    padding: 20,
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
  container: {
    flex: 1,
    paddingTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  userImg: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3673E6",
    textAlign: "center",
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    color: "#9CB1D8",
  },
  aboutUser2: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 5,
    textAlign: "center",
    color: "#9CB1D8",
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
    marginTop: 15,
  },
  userBtn: {
    borderRadius: 10,
    borderColor: "#2e64e5",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    borderWidth: 2,
    width: "25%",
  },
  userBtnText: {
    color: "#2e64e5",
    textAlign: "center",
  },
  userInfoWrapper: {
    width: "100%",
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",

    textAlign: "center",
    color: "#3B516E",
  },
  userInfoSubtitle: {
    fontSize: 12,
    color: "#9CB1D8",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
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
  backsIcon: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  userBtnText2: {
    color: "#FF0000",
    textAlign: "center",
  },
  userBtn2: {
    borderRadius: 10,
    borderColor: "#FF0000",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    borderWidth: 2,
    width: "25%",
  },
  optionText2: {
    textAlign: "center",
    justifyContent: "center",
    paddingTop: 15,
    paddingLeft: 30,
    color: "#ff5c5c",
  },
});

export default ProfileScreen;
