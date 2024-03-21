import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const Verifed = ({ size }) => {
  return (
    <View style={{ alignItems: "center" }}>
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
            <MaterialIcons
              name="verified"
              size={size}
              color="white"
              style={styles.shadow}
            />
          </View>
        }
      >
        <LinearGradient
          colors={["#DA5AFA", "#3570EC"]}
          style={{ flex: 1, justifyContent: "center", borderRadius: size }}
        />
      </MaskedView>
    </View>
  );
};

export default Verifed;

const styles = StyleSheet.create({});
