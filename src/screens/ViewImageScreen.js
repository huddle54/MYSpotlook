import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { S3Image } from "aws-amplify-react-native";
import { Provider } from "react-native-paper";
import Download from "../components/Bottomsheets/VieImageSheet";

const ViewImageScreen = ({ navigation, route }) => {
  const [show, setShow] = useState(false);
  const { userImg } = route.params;
  return (
    <>
      <Provider>
        <View style={styles.header}>
          <Ionicons
            style={styles.backIcon}
            name="arrow-back-outline"
            size={25}
            color="#FFF"
            onPress={navigation.goBack}
          />

          {/* <TouchableOpacity style={styles.optionIcon} onPress={() => setShow(true)}>
                <Ionicons  name="ellipsis-vertical-outline" size={25} color="#FFF" />
            </TouchableOpacity> */}
        </View>

        <View style={styles.container}>
          <S3Image
            resizeMode="contain"
            style={styles.image}
            imgKey={userImg.image}
          />
        </View>
        <Download
          show={show}
          onDismiss={() => {
            setShow(false);
          }}
          enableBackdropDismiss
          visible={setShow}
        ></Download>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  optionIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  header: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
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
});

export default ViewImageScreen;
