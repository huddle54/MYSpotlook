import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

const CameraKit = ({ children, cameraType, cameraRef }) => {
  const [hasPermission, setHasPermission] = useState(null);
  // const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  // const cameraRef = useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const gallery = await Camera.requestCameraPermissionsAsync();
      setHasPermission(gallery.status === "granted");
    })();
  }, []);

  // const takePicture = async () => {
  //   if (cameraRef.current) {
  //     const options = { quality: 0.5, base64: true };
  //     const data = await cameraRef.current.takePictureAsync(options);
  //     console.log(data.uri);
  //   }
  // };

  // const handleCameraType = () => {
  //   setCameraType(
  //     cameraType === Camera.Constants.Type.back
  //       ? Camera.Constants.Type.front
  //       : Camera.Constants.Type.back
  //   );
  // };

  if (!isFocused) {
    return null;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    // <View style={styles.container}>
    <Camera
      onMountError={true}
      ref={cameraRef}
      type={cameraType}
      ratio="16:9"
      mirrorImage={true}
      //   onCameraReady={() => {
      //     const { width, height } = Dimensions.get("window");
      //     const ratio = height / width;
      //     const adjustedWidth = 720;
      //     const adjustedHeight = adjustedWidth * ratio;
      //     // cameraRef.current?.setResolutionAsync({
      //     //   width: adjustedWidth,
      //     //   height: adjustedHeight,
      //     // });
      //   }}
      style={styles.camera}
    >
      {children}
    </Camera>
    // </View>
  );
};

export default CameraKit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    aspectRatio: 9 / 16,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#FFF",
  },
});
