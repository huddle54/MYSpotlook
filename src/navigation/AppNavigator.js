import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import CameraScreen from "../screens/CameraScreen";
import PostEditScreen from "../screens/PostEditScreen";
import ChatListScreen from "../screens/ChatListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProfileEditScreen from "../screens/ProfileEditScreen";
import SettingsScreen from "../screens/ActivityScreen";
import PostListScreen from "../screens/PostListScreen";
import ViewImageScreen from "../screens/ViewImageScreen";
import ChatScreen from "../screens/ChatScreen";
import ChatProfile from "../screens/ChatProfile";
import AddMessageScreen from "../screens/AddMessageScreen";
import PostScreen from "../screens/PostListScreens";
import AppsButton from "../navigation/AppsButton";
import SearchScreen from "../screens/SearchScreen";
import EventScreen from "../screens/EventScreen";
import {
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import { Provider } from "react-native-paper";
import { useTheme } from "../config/ThemeProvider";

const Tab = createBottomTabNavigator();

const FeedStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const FeedStackNavigator = () => {
  const { dark, colors, setScheme } = useTheme();

  return (
    <FeedStack.Navigator screenOptions={{}}>
      <FeedStack.Screen
        name="Home2"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <FeedStack.Screen
        name="PostList"
        component={PostListScreen}
        options={{
          headerShown: false,
        }}
      />
      <FeedStack.Screen
        name="ViewImage"
        component={ViewImageScreen}
        options={{
          headerShown: false,
          defaultNavigationOptions: {
            headerForceInset: { top: "never", bottom: "never" },
          },
        }}
      />
      <FeedStack.Screen
        name="Profile3"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <FeedStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.gradientStartColor,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#3570EC",
          },
          headerTintColor: colors.icons,
          headerShadowVisible: false,
        }}
      />
      {/* <FeedStack.Screen
        name="Events"
        component={EventScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.gradientStartColor,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#3570EC",
          },
          headerTintColor: colors.icons,
          headerShadowVisible: false,
        }}
      /> */}
      <FeedStack.Screen
        name="Post"
        component={PostScreen}
        options={{
          headerShown: false,
        }}
      />
    </FeedStack.Navigator>
  );
};

const ChatStackNavigator = () => {
  const { dark, colors, setScheme } = useTheme();
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="ChatList2"
        component={ChatListScreen}
        options={{
          headerShown: false,
        }}
      />
      <ChatStack.Screen
        name="AddChat"
        component={AddMessageScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.gradientStartColor,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#3570EC",
          },
          headerTintColor: colors.icons,
        }}
      />
      <ChatStack.Screen
        name="Chatuser"
        component={ChatProfile}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.gradientStartColor,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#3570EC",
          },
          headerTintColor: colors.icons,
          headerTitleAlign: "center",
        }}
      />
      <ChatStack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerStyle: {
            backgroundColor: colors.gradientStartColor,
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#3570EC",
          },
          headerTintColor: colors.icons,
        })}
      />
    </ChatStack.Navigator>
  );
};
const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile2"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="Profile4"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="ProfileEdit"
        component={ProfileEditScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  );
};

const AppNavigator = () => {
  const { dark, colors, setScheme } = useTheme();
  return (
    <Provider>
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="initialRoute"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: { backgroundColor: "blue" },
          tabBarInactiveTintColor: "#D1DFFD",
          tabBarActiveTintColor: "#3570EC",
          tabBarHideOnKeyboardDismiss: true,
          tabBarItemStyle: {
            backgroundColor: colors.gradientEndColor,
          },
        }}
      >
        {/* <Tab.Screen
          name="Camera"
          component={CameraScreen}
          options={({ route }) => ({
            tabBarStyle: {
              display: "none",
              backgroundColor: colors.gradientEndColor,
              borderTopWidth: 0,
              elevation: 0,
            },
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-camera" size={24} color={color} />
            ),
            unmountOnBlur: true,
          })}
        /> */}
        <Tab.Screen
          name="Events"
          component={EventScreen}
          options={({ route }) => ({
            tabBarStyle: {
              display: getTabBarStyle(route),
              backgroundColor: colors.gradientEndColor,
              borderTopWidth: 0,
              elevation: 0,
            },
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.gradientStartColor,
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#3570EC",
            },
            headerTintColor: colors.icons,
            headerShadowVisible: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="event-note" size={24} color={color} />
            ),
          })}
        />
        <Tab.Screen
          name="Home"
          component={FeedStackNavigator}
          initialParams={{ icon: "ios-home" }}
          options={({ route }) => ({
            tabBarStyle: {
              display: getTabBarStyle(route),
              backgroundColor: colors.gradientEndColor,
              borderTopWidth: 0,
              elevation: 0,
            },
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="home-assistant"
                size={24}
                color={color}
              />
            ),
          })}
        />
        <Tab.Screen
          name="PostEdit"
          component={PostEditScreen}
          options={({ navigation, route }) => ({
            tabBarButton: () => (
              <AppsButton
                onPress={() =>
                  navigation.navigate("PostEdit", { screen: "PostEdit" })
                }
              />
            ),
            headerShown: false,
            tabBarStyle: { display: "none" },
            // image: route.params?.image,
          })}
        />
        <Tab.Screen
          name="ChatList"
          component={ChatStackNavigator}
          options={({ route }) => ({
            tabBarStyle: {
              display: getTabBarStyle(route),
              backgroundColor: colors.gradientEndColor,
              borderTopWidth: 0,
              elevation: 0,
            },
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Entypo name="feather" size={24} color={color} />
            ),
          })}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStackNavigator}
          options={({ route }) => ({
            tabBarStyle: {
              display: getTabBarStyle(route),
              backgroundColor: colors.gradientEndColor,
              borderTopWidth: 0,
              elevation: 0,
            },
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={24} color={color} />
            ),
          })}
        />
      </Tab.Navigator>
    </Provider>
  );
};

const getTabBarStyle = (route) => {
  const routeName =
    getFocusedRouteNameFromRoute(route) ??
    ("ChatList", "Home", "Camera", "Profile");
  if (
    routeName === "ViewImage" ||
    routeName === "PostList" ||
    routeName === "Chat" ||
    routeName === "ProfileEdit" ||
    routeName === "Profile3" ||
    routeName === "Settings" ||
    routeName === "Profile4" ||
    routeName === "AddChat" ||
    routeName === "Search" ||
    routeName === "Chatuser"
  ) {
    return "none";
  }
  return "flex";
};

export default AppNavigator;
