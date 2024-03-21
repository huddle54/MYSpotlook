import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

const ForgotPasswordScreen = () => {
  const onSendPressed = async (data) => {
    try {
      await Auth.forgotPassword(data.username);

      navigation.navigate("NewPassword");
    } catch (e) {
      Alert.alert("Oops!", e.message);
    }
    //console.warn(data);
    //navigation.navigate('NewPassword');
  };
  const onSignInPressed = () => {
    console.warn("onSignInPressed");
    navigation.navigate("SignIn");
  };
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();
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
          <Text style={styles.title}>Reset your password</Text>
          <CustomInput
            name="username"
            placeholder="Username"
            iconType="ios-mail-open-outline"
            control={control}
            rules={{
              required: "Username is required",
            }}
          />
          <CustomButton
            text="Send"
            onPress={handleSubmit(onSendPressed)}
            type="PRIMARY"
          />
          <CustomButton
            text="Back to Sign in"
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
});

export default ForgotPasswordScreen;
