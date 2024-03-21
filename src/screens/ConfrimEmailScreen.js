import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { useRoute } from "@react-navigation/native";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { getUser } from "../graphql/queries";
import { createUser } from "../graphql/mutations";

const ConfrimEmailScreen = () => {
  const route = useRoute();

  const { control, handleSubmit, watch } = useForm({
    defaultValues: { username: route?.params?.username },
  });
  const username = watch("username");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const onConfrimPressed = async (data) => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      await Auth.confirmSignUp(data.username, data.code);
      const user = {
        id: route?.params?.userSub,
        username: route?.params?.username,
        name: route?.params?.name,
        email: route?.params?.email,
        bio: "",
      };
      console.log(user);
      await API.graphql(graphqlOperation(createUser, { input: user }));
    } catch (e) {
      Alert.alert("Oops!", e.message);
    }
    setLoading(false);
    //console.warn(data);
    //navigation.navigate('Home');
  };
  const onSignInPressed = () => {
    console.warn("onSignInPressed");
    navigation.navigate("SignIn");
  };
  const onResendPressed = async () => {
    try {
      await Auth.resendSignUp(username);
      Alert.alert("Success!", "Code has been sent to your email");
    } catch (e) {
      Alert.alert("Oops!", e.message);
    }
    //console.warn("onResendPressed");
  };

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
          <Text style={styles.title}>Confrim your email</Text>
          <CustomInput
            name="username"
            placeholder="Username"
            iconType="ios-mail-open-outline"
            control={control}
            rules={{
              required: "Username is required",
            }}
          />
          <CustomInput
            name="code"
            placeholder="Enter your confirmation code"
            iconType="ios-mail-open-outline"
            control={control}
            rules={{
              required: "Confrimation code is required",
            }}
            keyboardType="phone-pad"
          />
          <CustomButton
            text={
              loading ? (
                <ActivityIndicator size="small" color="#e8f5fd" />
              ) : (
                "Confirm"
              )
            }
            onPress={handleSubmit(onConfrimPressed)}
            type="PRIMARY"
          />
          <CustomButton
            text="Resend code"
            onPress={onResendPressed}
            type="SECONDARY"
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

export default ConfrimEmailScreen;
