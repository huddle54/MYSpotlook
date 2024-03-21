import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { InputWrapper, InputField } from "../styles/AddPost";
import Icon from "react-native-vector-icons/Ionicons";
import CustomButtons from "../components/CustomButtons";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { createPost } from "../graphql/mutations";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { FAB, Portal, Provider } from "react-native-paper";
import { useTheme } from "../config/ThemeProvider";
import { useRoute } from "@react-navigation/native";

function PostEditScreen({ navigation }) {
  const { dark, colors, setScheme } = useTheme();
  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const route = useRoute();
  const photoURI = route.params.image;

  const [post, setPost] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const compressedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 720, height: 720 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      setImageUrl(compressedImage.uri);
    }
  };

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      const compressedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 720, height: 720 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      setImageUrl(compressedImage.uri);
    }
  };

  if (hasGalleryPermission === false) {
    return <Text>No permission </Text>;
  }

  const uploadImage = async (filesUrl) => {
    try {
      const response = await fetch(filesUrl);

      const blob = await response.blob();

      const key = `${uuidv4()}.jpg`;

      await Storage.put(key, blob, { conntentType: "image/jpg" });

      return key;
    } catch (e) {
      console.log(e);
    }
    return "";
  };

  const onPost = async () => {
    if (uploading) {
      return;
    }

    setUploading(true);

    const currentUser = await Auth.currentAuthenticatedUser({
      bypassCache: true,
    });
    const newPost = {
      content: post,
      userID: currentUser.attributes.sub,
      username: currentUser.username,
      name: currentUser.attributes.name,
    };

    if (imageUrl) {
      newPost.image = await uploadImage(imageUrl);
    } else if (photoURI) {
      newPost.image = await uploadImage(photoURI); // Uploading photoURI if imageUrl is not available
    }

    await API.graphql(graphqlOperation(createPost, { input: newPost }));
    navigation.navigate("Home");
    setPost("");
    setImageUrl("");

    setUploading(false);

    // try {
    //   const currentUser = await Auth.currentAuthenticatedUser({bypassCache: true});
    //   const newPost = {
    //     content: post,
    //     image,
    //     userID: currentUser.attributes.sub,
    //     username: currentUser.username,
    //     name: currentUser.attributes.name
    //   }
    //   await API.graphql(graphqlOperation(createPost, {input: newPost}));
    //   navigation.navigate('Home')
    //   setImageUrl("")
    //   setPost("")
    // } catch (e) {
    //   console.log(e);
    // }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <InputWrapper>
          <View style={styles.backIcon}>
            <Ionicons
              name="arrow-back-outline"
              size={25}
              color="#3B516E"
              onPress={() => navigation.navigate("Home")}
            />
            <Text style={{
              color: 'red',
              fontWeight: 'bold',
            }}>* need with backhandlers discard and close pic for post need and writing input bar to change new</Text>
          </View>
          <View
            style={{
              position: "absolute",
              top: 80,
              left: 10,
              borderRadius: 10,
            }}
          >
            <ImageBackground
              source={
                imageUrl
                  ? { uri: imageUrl }
                  : photoURI
                  ? { uri: photoURI }
                  : null
              }
              style={styles.imager}
              imageStyle={{ borderRadius: 10 }}
            />
          </View>

          <InputField
            placeholder="Write Your Post...."
            multiline
            numberOfLines={2}
            style={styles.input}
            value={post}
            onChangeText={setPost}
            placeholderTextColor={colors.textedPost}
          />

          <CustomButtons
            text={
              uploading ? (
                <ActivityIndicator size="small" color="#e8f5fd" />
              ) : (
                "Post"
              )
            }
            bgColor={
              post || imageUrl || photoURI ? "#3673E6" : "rgba(0,0,0,0.2)"
            }
            fgColor={post || imageUrl || photoURI ? "#e8f5fd" : "#e8f5fd"}
            onPress={onPost}
            disabled={!post && !imageUrl && !photoURI}
          />
        </InputWrapper>
        <Portal>
          <FAB.Group
            open={open}
            icon={open ? "plus-circle" : "plus"}
            fabStyle={{ backgroundColor: "#3673E6", borderRadius: 50 }}
            actions={[
              {
                icon: "camera",
                label: "Camera",
                labelTextColor: "#3B516E",
                onPress: takePicture,
                color: "white",
                fabstyle: { backgroundColor: "#3673E6" },
                style: { borderRadius: 50, backgroundColor: "#3673E6" },
                small: false,
              },
              {
                icon: "image-multiple-outline",
                label: "Images",
                color: "white",
                labelTextColor: "#3B516E",
                fabstyle: { backgroundColor: "#3673E6" },
                style: { borderRadius: 50, backgroundColor: "#3673E6" },
                onPress: pickImage,
                small: false,
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 20,
    color: "white",
  },
  backIcon: {
    position: "absolute",
    top: 40,
    left: 10,
  },
  position: {
    marginBottom: 10,
  },
  imager: {
    width: 100,
    height: 100,
  },
  input: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PostEditScreen;
