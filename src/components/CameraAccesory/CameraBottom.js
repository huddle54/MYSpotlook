import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CaptureButton from "./Capture";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

const CameraBottom = ({ onPress, takePicture, pickImage }) => {
  // const [imagePath, setImagePath] = useState(null);
  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     // aspect: [1, 1],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     const compressedImage = await ImageManipulator.manipulateAsync(
  //       result.assets[0].uri,
  //       [
  //         {
  //           resize: {
  //             width: result.assets[0].width,
  //             height: result.assets[0].height,
  //           },
  //         },
  //       ],
  //       { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
  //     );
  //     setImagePath(compressedImage.uri);
  //   }
  //   console.log(result);
  // };

  return (
    <View
      style={{
        // flex: 1,
        backgroundColor: "transparent",
        // borderWidth: 1,
        // borderColor: "#FFF",
        flexDirection: "row",
        // height: 100,
        width: "85%",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <TouchableOpacity
        onPress={pickImage}
        style={{
          // alignSelf: "flex-start",
          alignItems: "center",
          // marginRight: 80,
        }}
        // onPress={handleCameraType}
      >
        <MaterialIcons name="photo-library" size={35} color="white" />
      </TouchableOpacity>
      <CaptureButton onPress={takePicture} />
      <TouchableOpacity
        style={{
          // alignSelf: "flex-start",
          alignItems: "center",
          // marginRight: 80,
        }}
        onPress={onPress}
      >
        <MaterialIcons name="flip-camera-android" size={35} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default CameraBottom;

const styles = StyleSheet.create({});
