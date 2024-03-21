import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Button,
  Image,
  TouchableHighlight,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Entypo } from "@expo/vector-icons";
import ProfileBottomSheet from "../components/ProfileBottomSheet";
import { Provider } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { useNavigation } from "@react-navigation/native";
import { updateUser } from "../graphql/mutations";
import { getUser } from "../graphql/queries";
import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import AppText from "../components/AppText";
import { useTheme } from "../config/ThemeProvider";
import AddCard from "../components/AddCard";

const ProfileEditScreen = ({ navigation }) => {
  const { dark, colors, setScheme } = useTheme();

  const [show, setShow] = useState(false);
  const [images, setImages] = useState(null);
  const [post, setPost] = useState(null);
  const [bios, setBios] = useState([]);
  // const [image, setImage] = useState()

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
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
        setImages(compressedImage.uri);
      }
      console.log(result);
    } catch (e) {
      console.log(e);
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
      setImages(compressedImage.uri);
    }
    console.log(result);
  };

  const uploadProfilePic = async () => {
    try {
      const response = await fetch(images);

      const blob = await response.blob();

      const key = `${uuidv4()}.png`;

      await Storage.put(key, blob, { contentType: "image/png" });

      return key;
    } catch (e) {
      console.log(e);
    }
    return "";
  };

  const removeImage = async () => {
    await Storage.remove(post.image, {
      level: "public",
      conntentType: "image/png",
    });
  };

  const updateBio = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      const user = await API.graphql(
        graphqlOperation(getUser, { id: currentUser?.attributes?.sub })
      );
      console.log(user.data.getUser);
      setPost(user.data.getUser);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    updateBio();
  }, []);

  const onSave = async () => {
    let image;
    if (!!images) {
      image = await uploadProfilePic();
    }

    const currentUser = await Auth.currentAuthenticatedUser({
      bypassCache: true,
    });
    const users = {
      id: currentUser.attributes.sub,
      image,
      bio: post?.bio,
    };
    await API.graphql(graphqlOperation(updateUser, { input: users }));
    navigation.navigate("Profile2");
  };

  return (
    <Provider>
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
        <View style={styles.header}>
          <Ionicons
            style={styles.backIcon}
            name="arrow-back-outline"
            size={25}
            color={colors.icons}
            onPress={() => navigation.navigate("Profile2")}
          />
          <View>
            <Text style={styles.headerText}>Edit Profile</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={{ margin: 20 }}>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={() => setShow(true)}>
                <View
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ImageBackground
                    source={
                      images
                        ? { uri: images }
                        : require("../../assets/user.png")
                    }
                    style={{ height: 100, width: 100 }}
                    imageStyle={{ borderRadius: 50 }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons
                        name="ios-camera"
                        size={35}
                        color="#fff"
                        style={{
                          opacity: 0.7,
                          alignItems: "center",
                          justifyContent: "center",
                          borderWidth: 0,
                          borderColor: "#fff",
                          borderRadius: 50,
                        }}
                      />
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 30 }}>
              {/* <View style={styles.action}>
        <Ionicons name="at-outline" size={20} color="#666"  style={{
          top: -5,
        }}/>
          <TextInput 
            placeholder='Username'
            placeholderTextColor='#666666'
            autoCorrect={false}
            style={styles.textInput}
            value={data}
            onChangeText={(data) => setData(data)}
          />
        </View> */}
              {/* <View style={styles.action}>
        <Ionicons name="person-outline" size={20} color="#666"  style={{
          top: -5,
        }}/>
          <TextInput 
            placeholder={profiler?.name ? profiler?.name : 'name' }
            placeholderTextColor='#666666'
            autoCorrect={false}
            style={styles.textInput}
            value={names}
            onChangeText={(value) => setNames(value)}
            
          />
        </View> */}
              {/* <View style={styles.action}>
        <Ionicons name="phone-portrait-outline" size={20} color="#666"  style={{
          top: -5,
        }}/>
          <TextInput 
            placeholder='Phone'
            placeholderTextColor='#666666'
            keyboardType='number-pad'
            autoCorrect={false}
            style={styles.textInput}
          />
        </View> */}
              {/* <View style={styles.action}>
        <Ionicons name="ios-mail" size={20} color="#666"  style={{
          top: -5,
        }}/>
          <TextInput 
            placeholder='Email'
            placeholderTextColor='#666666'
            keyboardType='email-address'
            autoCorrect={false}
            style={styles.textInput}
          />
        </View> */}
              <View
                style={[
                  styles.action,
                  { borderBottomColor: colors.postCardOutline },
                ]}
              >
                <TextInput
                  placeholder={"Bio"}
                  placeholderTextColor={colors.reportText}
                  autoCorrect={false}
                  style={[styles.textInput, { color: colors.reportText }]}
                  onChangeText={(value) => setPost({ ...post, bio: value })}
                  multiline
                  value={post ? post?.bio : ""}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.commandButton} onPress={onSave}>
              <Text style={styles.panelButtonTitle}>Save</Text>
            </TouchableOpacity>
          </View>
          {/* <AddCard item={images} /> */}
          <ProfileBottomSheet
            show={show}
            onDismiss={() => {
              setShow(false);
            }}
            enableBackdropDismiss
            visible={setShow}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: colors.postCardOutline,
                padding: 15,
              }}
            >
              <AppText style={styles.text}>Choose a picture</AppText>
              <TouchableOpacity
                style={styles.panelbuttons}
                onPress={() => setShow(false)}
              >
                <Text style={{ textAlign: "center", color: "white" }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableHighlight
              style={{ flex: 1, justifyContent: "center" }}
              underlayColor={colors.ripples}
              onPress={takePicture}
            >
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="ios-camera"
                  size={17}
                  color="#3570EC"
                  style={{ paddingLeft: 15 }}
                />
                <AppText style={styles.paneltext}>Take Photo</AppText>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              style={{ flex: 1, justifyContent: "center" }}
              underlayColor={colors.ripples}
              onPress={pickImage}
            >
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="ios-image"
                  size={17}
                  color="#3570EC"
                  style={{ paddingLeft: 15 }}
                />
                <AppText style={styles.paneltext}>Choose Photo</AppText>
              </View>
            </TouchableHighlight>
          </ProfileBottomSheet>
        </View>
      </LinearGradient>
    </Provider>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#2e64e5",
    alignItems: "center",
    marginTop: 10,
    width: "40%",
    alignSelf: "center",
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
  },
  header: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  panelbuttons: {
    backgroundColor: "#ff5c5c",
    width: 90,
    height: 30,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  paneltext: {
    textAlign: "left",
    justifyContent: "center",
    paddingLeft: 30,
    color: "#3570EC",
  },
  paneldlttext: {
    textAlign: "left",
    justifyContent: "center",
    paddingLeft: 30,
    color: "#ff5c5c",
  },
  text: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 20,
  },
});
