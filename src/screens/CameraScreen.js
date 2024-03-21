import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../config/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import CaptureButton from "../components/CameraAccesory/Capture";
import { Camera, CameraType } from "expo-camera";
import CameraKit from "../components/CameraAccesory/CameraKit";
import CameraBottom from "../components/CameraAccesory/CameraBottom";
import { ImageType } from "expo-camera/build/Camera.types";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

const CameraScreen = () => {
  const { dark, colors, setScheme } = useTheme();
  const navigation = useNavigation();
  const cameraRef = useRef(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);

  const handleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        // base64: true,
        isImageMirror: true,
        imageType: ImageType.jpg,
      };
      const data = await cameraRef.current.takePictureAsync(options);
      setPhoto(data.uri);

      const compressedImage = await ImageManipulator.manipulateAsync(
        data.uri,
        [
          {
            resize: {
              width: 1080,
              height: 1920,
            },
          },
        ],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      setPhoto(compressedImage.uri);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      const compressedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [
          {
            resize: {
              width: result.assets[0].width,
              height: result.assets[0].height,
            },
          },
        ],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      setPhoto(compressedImage.uri);
    }
  };

  const handleSendPhoto = () => {
    // Pass the photo URI to the post-edit screen in the tab navigator
    navigation.navigate("PostEdit", {
      screen: "PostEdit",
      image: photo,
    });
  };

  return (
    <>
      <View style={styles.container}>
        {photo ? (
          <View style={styles.previewContainer}>
            <ImageBackground
              source={{ uri: photo }}
              style={styles.previewImage}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginBottom: 30,
                }}
              >
                <TouchableOpacity
                  style={{
                    // borderWidth: 1,
                    paddingHorizontal: 15,
                    borderRadius: 20,
                    paddingVertical: 10,
                    justifyContent: "center",
                    backgroundColor: "rgba(0,0,0,0.2)",
                  }}
                  onPress={() => setPhoto(null)}
                >
                  <Text style={[styles.cancelButtonText, { color: "#F1F1F1" }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    // borderWidth: 1,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 20,
                    justifyContent: "center",
                    backgroundColor: "rgba(0,0,0,0.2)",
                  }}
                  onPress={handleSendPhoto}
                >
                  <Text style={[styles.cancelButtonText, { color: "#F1F1F1" }]}>
                    {" "}
                    Send{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        ) : (
          <CameraKit cameraType={cameraType} cameraRef={cameraRef}>
            <View style={{ flex: 1 }} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                // borderWidth: 1,
                // borderColor: "#000",
              }}
            >
              <CameraBottom
                onPress={handleCameraType}
                takePicture={takePicture}
                pickImage={pickImage}
              />
            </View>
          </CameraKit>
        )}
      </View>
    </>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  cancelButtonText: {
    // color: "#3570EC",
    fontSize: 18,
    fontWeight: "bold",
    // alignSelf: "center",
    // marginVertical: 20,
    // backgroundColor: "white",
  },
  previewImage: {
    flex: 1,
    // resizeMode: "contain",
    justifyContent: "flex-end",
    // padding: 10,
    height: "100%",
    width: "100%",
    aspectRatio: 9 / 16,
    resizeMode: "cover",
  },
});
