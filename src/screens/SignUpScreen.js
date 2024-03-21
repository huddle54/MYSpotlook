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
import { LinearGradient } from "expo-linear-gradient";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import SocialSignInButtons from "../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { createUser } from "../graphql/mutations";
import * as WebBrowser from "expo-web-browser";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignUpScreen = () => {
  const onRegisterPressed = async (data) => {
    const { username, password, email, name } = data;

    try {
      const signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: { email, name, preferred_username: username },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });

      const userSub = signUpResponse.userSub;
      console.log(userSub);

      navigation.navigate("ConfrimEmail", { username, name, email, userSub });
    } catch (e) {
      Alert.alert("Oops!", e.message);
    }
    //console.warn("onRegisterPressed");
    //navigation.navigate('ConfrimEmail');
  };
  const onSignInPressed = () => {
    console.warn("onSignInPressed");
    navigation.navigate("SignIn");
  };
  const onTermsofUsePressed = async () => {
    await WebBrowser.openBrowserAsync(
      "https://bloghopelook.blogspot.com/p/terms-and-conditions.html"
    );
  };
  const onPrivacyPolicyPressed = async () => {
    await WebBrowser.openBrowserAsync(
      "https://bloghopelook.blogspot.com/p/privacy-policy_14.html"
    );
  };
  const navigation = useNavigation();
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");

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
          <Text style={styles.title}>Create an account</Text>
          <CustomInput
            name="name"
            placeholder="Name"
            iconType="ios-person"
            control={control}
            rules={{
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
              maxLength: {
                value: 24,
                message: "Username must be at most 24 characters",
              },
            }}
          />
          <CustomInput
            name="username"
            placeholder="Username"
            iconType="ios-person"
            control={control}
            rules={{
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
              maxLength: {
                value: 24,
                message: "Username must be at most 24 characters",
              },
              pattern: {
                value: /^[a-z0-9_]{3,24}$/,
                message:
                  "Username can only contain lowercase letters, numbers, and underscores",
              },
            }}
          />
          <CustomInput
            name="email"
            placeholder="Email"
            iconType="mail"
            control={control}
            rules={{
              required: "Email is required",
              pattern: { value: EMAIL_REGEX, message: "Email is not valid" },
            }}
          />
          <CustomInput
            name="password"
            placeholder="Password"
            iconType="lock-closed"
            control={control}
            secureTextEntry={true}
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
          />
          <CustomInput
            name="password-repeat"
            placeholder="Repeat password"
            iconType="lock-closed"
            control={control}
            secureTextEntry={true}
            rules={{
              validate: (value) => value === pwd || "Password do not match",
            }}
          />
          <CustomButton
            text="Register"
            onPress={handleSubmit(onRegisterPressed)}
          />
          <Text style={styles.text}>
            By registering, you confirm that you accept our
            <Text style={styles.link} onPress={onTermsofUsePressed}>
              {" "}
              Terms and Conditions
            </Text>{" "}
            and
            <Text style={styles.link} onPress={onPrivacyPolicyPressed}>
              {" "}
              Privacy Policy
            </Text>
          </Text>
          {/* <SocialSignInButtons/> */}
          <CustomButton
            text="Have an account? Sign in"
            onPress={onSignInPressed}
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
  title: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 10,
    color: "#051c60",
  },
  text: {
    color: "gray",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  link: {
    color: "#FDB075",
  },
});

export default SignUpScreen;
