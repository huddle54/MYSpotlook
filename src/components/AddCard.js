import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import NativeAdView, {
  AdManager,
  AdBadge,
  HeadlineView,
  TaglineView,
  AdvertiserView,
  PriceView,
  StoreView,
  NativeMediaView,
  ImageView,
  IconView,
  StarRatingView,
  CallToActionView,
} from "react-native-admob-native-ads";
import { useTheme } from "../config/ThemeProvider";

AdManager.registerRepository({
  name: "videoAd",
  adUnitId: "ca-app-pub-2246403935295003/1352778682",
  numOfAds: 10,
  nonPersonalizedAdsOnly: false,
  videoOptions: {
    mute: true,
  },

  expirationPeriod: 3600000, // in milliseconds (optional)
  mediationEnabled: false,
}).then((result) => {
  console.log("registered: ", result);
});

const AddCard = ({ item }) => {
  const { dark, colors, setScheme } = useTheme();
  const nativeAdViewRef = useRef();
  const [showAd, setShowAd] = useState(true);

  useEffect(() => {
    // Load ad only if showAd is true
    if (showAd) {
      nativeAdViewRef.current?.loadAd();
    }
  }, [showAd]);

  if (item.ad && showAd) {
    return <View></View>;
  } else {
    return (
      <View
        style={{
          borderRadius: 20,
          marginBottom: 20,
          backgroundColor: "transparent",
          overflow: "hidden",
          borderRightColor: colors.postCardOutline,
          borderRightWidth: 1,
          borderLeftColor: colors.postCardOutline,
          borderLeftWidth: 1,
          borderBottomColor: colors.postCardOutline,
          borderBottomWidth: 1,
        }}
      >
        <NativeAdView
          style={
            {
              // padding: 10,
              // borderWidth: 1,
              // marginLeft: 10,
              // backgroundColor: "#000000",
            }
          }
          ref={nativeAdViewRef}
          repository="videoAd"
        >
          <View
            style={
              {
                // borderWidth: 1,
                // padding: 10,
              }
            }
          >
            <TouchableOpacity>
              <ImageView
                style={{
                  width: "100%",
                  height: 200,
                  resizeMode: "cover",
                  overflow: "hidden",
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                }}
              />
            </TouchableOpacity>
            {/* <NativeMediaView
                style={{
                  width: "100%",
                  height: 200,
                  resizeMode: "cover",
                  overflow: "hidden",
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                }}
              /> */}
            <AdBadge
              style={{
                width: 20,
                height: 20,
                borderWidth: 1,
                borderRadius: 2,
                borderColor: "green",
                position: "absolute",
                overflow: "hidden",
                marginLeft: 10,
                marginTop: 10,
              }}
              textStyle={{
                fontSize: 15,
                color: "green",
                textAlign: "center",
              }}
            />
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <IconView
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                }}
              />
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: 5,
                }}
              >
                <HeadlineView
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: colors.username,
                    marginBottom: 2,
                  }}
                />

                <TaglineView
                  style={{
                    fontSize: 12,
                    color: "#9CB1D8",
                    fontWeight: "normal",
                  }}
                />
                <StarRatingView />
              </View>
            </View>

            {/* 
                  
    
              {/* <CallToActionView
                      style={{
                        height: 45,
                        width: "100%",
                        paddingHorizontal: 12,
                        backgroundColor: "purple",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                        elevation: 10,
                      }}
                      textStyle={{ color: "white", fontSize: 14 }}
                    /> */}
          </View>
        </NativeAdView>
      </View>
    );
  }
};

export default AddCard;

const styles = StyleSheet.create({});
