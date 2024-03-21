import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Modal,
  Alert,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import {
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
  Feather,
} from "@expo/vector-icons";

import { Auth, API, graphqlOperation } from "aws-amplify";
import {
  getUser,
  listBlocks,
  listFollowings,
  listPosts,
} from "../graphql/queries";

import BlockAccounts from "../components/SettingsFiles/BlockAccounts";
import DeleteAccount from "../components/SettingsFiles/DeleteAccount";
import Privacypolicy from "../components/SettingsFiles/Privacypolicy";
import TermsandConditon from "../components/SettingsFiles/TermsandConditon";
import AboutUs from "../components/SettingsFiles/AboutUs";
import ContactUs from "../components/SettingsFiles/ContactUs";
import Theme from "../components/SettingsFiles/Theme";
import { useTheme } from "../config/ThemeProvider";

const ActivityScreen = () => {
  const signOut = () => {
    Auth.signOut();
  };

  const { dark, colors, setScheme } = useTheme();
  // const isDarkMode = useColorScheme() === "dark";
  // const [isDark, setIsDark] = useState(isDarkMode);

  // const toggleSwitch = (val) => {
  //   setIsDark(val);
  //   AsyncStorage.setItem("isDarkMode", JSON.stringify(val));
  // };

  // useEffect(() => {
  //   AsyncStorage.getItem("isDarkMode").then((value) => {
  //     if (value !== null) {
  //       setIsDark(JSON.parse(value));
  //     }
  //   });
  // }, []);

  // const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const [user, setUser] = useState([]);
  const [blockers, setBlockers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
    const userId = userInfo?.attributes?.sub;

    setLoading(true);
    try {
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: userId })
      );
      setUser(userData.data.getUser);
    } catch (e) {
    } finally {
      setLoading(false);
    }

    const userBlocking = await API.graphql(
      graphqlOperation(listBlocks, {
        filter: { blockedUserID: { eq: userId } },
      })
    );
    setBlockers(userBlocking.data.listBlocks.items);
    console.log(userBlocking);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <LinearGradient
      colors={[colors.gradientStartColor, colors.gradientEndColor]}
      // ["#E5F7FF", "#FFFFFF"]
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
      }}
    >
      <View
        style={[styles.header, { borderBottomColor: colors.postCardOutline }]}
      >
        <Ionicons
          style={styles.backIcon}
          name="arrow-back-outline"
          size={25}
          color={colors.icons}
          onPress={() => navigation.navigate("Profile2")}
        />
        <View>
          <Text style={[styles.headerText, { color: "#3570EC" }]}>
            Settings
          </Text>
        </View>
      </View>
      <Text style={{color: 'red'}}>* setting add a private account</Text>
      
      <View style={{ paddingRight: 5, paddingLeft: 5 }}>
        {/* <View style={styles.container1}>
          <MaterialCommunityIcons
            name="shield-account"
            size={24}
            color="#3B516E"
          />
          <Text style={styles.title}>Theme</Text>
          <Switch
            style={styles.move}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={dark ? "#81b0ff" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTheme}
            value={dark}
          />
        </View> */}
        <Theme />
        <BlockAccounts
          blockers={blockers}
          user={user}
          fetchUser={fetchUser}
          loading={loading}
        />
        {/* <DeleteAccount/> */}
        <Privacypolicy />
        <TermsandConditon />
        <AboutUs />
        <ContactUs />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 240,
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
          onPress={() => signOut()}
        >
          <Feather name="log-out" size={24} color="#ff5c5c" />
          <Text style={styles.title1}>Logout</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
  },
  backIcon: {
    position: "absolute",
    left: 10,
    bottom: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    bottom: -10,
    letterSpacing: 1,
  },
  container: {
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#3B516E",
    flexDirection: "row",
  },
  container1: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 3,
    padding: 3,
    alignItems: "center",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  title: {
    marginLeft: 10,
    color: "#3B516E",
  },
  title1: {
    marginLeft: 10,
    color: "#ff5c5c",
    fontWeight: "bold",
    fontSize: 16,
  },
  move: {
    marginLeft: 200,
  },
});

export default ActivityScreen;
