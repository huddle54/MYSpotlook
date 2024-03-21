import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Animated, ActivityIndicator } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

const LGloader = ({ size }) => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateAnimation = Animated.timing(rotation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      isInteraction: false,
    });

    Animated.loop(rotateAnimation).start();

    return () => {
      rotateAnimation.stop();
    };
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={{ alignItems: "center", transform: [{ rotate: spin }] }}
    >
      <MaskedView
        style={{ flexDirection: "row", height: size, width: size }}
        maskElement={
          <View
            style={{
              backgroundColor: "transparent",
              justifyContent: "center",
              flex: 1,
              alignItems: "center",
            }}
          >
            <Animated.View
              style={{
                height: size,
                width: size,
                borderWidth: 3,
                borderColor: "white",
                borderRadius: size / 2,
                transform: [{ rotate: spin }],
              }}
            />
          </View>
        }
      >
        <LinearGradient
          colors={["#DA5AFA", "#3570EC"]}
          style={{ flex: 1, justifyContent: "center", borderRadius: size }}
        />
      </MaskedView>
    </Animated.View>
  );
};

export default LGloader;
