import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../assets/Logo_3.png";
import { LinearGradient } from "expo-linear-gradient";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import SocialSignInButtons from "../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const onSignInPressed = async (data) => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await Auth.signIn(data.username, data.password);
      console.log(response);
    } catch (e) {
      Alert.alert("Oops!", e.message);
    }
    setLoading(false);
    //console.warn("Sign in pressed");
    //navigation.navigate('Home');
  };
  const onForgotPasswordPressed = () => {
    console.warn("onForgotPasswordPressed");
    navigation.navigate("ForgotPassword");
  };
  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
  };
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  return (
    <LinearGradient
      colors={["#E5F7FF", "#FFFFFF"]}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Image
            source={Logo}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode="contain"
          />

          <CustomInput
            name="username"
            placeholder="Username"
            iconType="ios-person"
            control={control}
            rules={{ required: "Username is required" }}
          />
          <CustomInput
            name="password"
            placeholder="Password"
            iconType="lock-closed"
            control={control}
            secureTextEntry
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password should be minimum 8 charcters",
              },
            }}
          />
          <CustomButton
            text={loading ? "Loading...." : "Sign In"}
            onPress={handleSubmit(onSignInPressed)}
            type="PRIMARY"
          />
          <CustomButton
            text="Forgot Password?"
            onPress={onForgotPasswordPressed}
            type="TERTIARY"
          />
          {/* <SocialSignInButtons/> */}
          <CustomButton
            text="Don't have an account? Create one"
            onPress={onSignUpPressed}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;
