import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const Capture = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          borderWidth: 2,
          height: 75,
          width: 75,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
          borderColor: "#F1F1F1",
          margin: 5,
        }}
      >
        <View
          style={{
            height: 65,
            width: 65,
            borderRadius: 50,
            backgroundColor: "#F1F1F1",
          }}
        ></View>
      </View>
    </TouchableOpacity>
  );
};

export default Capture;

const styles = StyleSheet.create({});
