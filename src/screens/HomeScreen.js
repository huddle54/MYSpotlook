import { LinearGradient } from "expo-linear-gradient";
import Logo from "../../assets/Logo_3.png";
import StoryHeader from "../components/StoryHeader";
import Feed from "../components/Feed";
import { View, StyleSheet, Image, Text } from "react-native";
import React from "react";
import { useTheme } from "../config/ThemeProvider";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from "react-native-google-mobile-ads";

// const adUnitId = "ca-app-pub-2246403935295003/3149625489";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { dark, colors, setScheme } = useTheme();
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
      {/* <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      /> */}
      {/* <StoryHeader/> */}
      {/* <ScrollView showsVerticalScrollIndicator={false} > */}
      <View style={styles.header}>
        <MaterialIcons
          name="event-note"
          size={26}
          color={colors.gradientStartColor}
        />
        <View>
          <Image source={Logo} style={{ width: 140, height: 70 }} />
        </View>

        <Ionicons
          name="ios-search-circle-outline"
          size={35}
          color={colors.commentIcon}
          onPress={() => navigation.navigate("Search")}
        />
      </View>
      <Text style={{color: 'red'}}> * Ads Re UI modification with in app purchases</Text>
      <View
        style={{
          // padding: 20,
          paddingTop: 0,
          paddingHorizontal: 20,
          flex: 1,
        }}
      >
        <Feed />
      </View>
      {/* </ScrollView> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#3570EC",
    paddingTop: 25,
    paddingHorizontal: 15,
    // borderWidth: 1,
  },
});

export default HomeScreen;
