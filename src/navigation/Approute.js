import { View, Text, Platform, PermissionsAndroid } from "react-native";
import React, { useEffect, useState, useRef, forwardRef } from "react";
import Navigation from "./AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";
// import { Auth, API, graphqlOperation } from "aws-amplify";
// import { createUser, createPushToken } from "../graphql/mutations";
// import * as Notifications from "expo-notifications";
// import { onCreateMessage } from "../graphql/subscriptions";
// import * as Device from "expo-device";
// import Constants from "expo-constants";

const linking = {
  prefixes: [
    Linking.createURL(`spotlink.me`),
    "https://spotlink.me/",
  ],
  config: {
    screens: {
      Home2: {
        screens: {
          Home: {
            screens: {
              PostList: "pl/:id",
              Post: {
                path: "p/:id",
                parse: {
                  id: (id) => id,
                },
              },
            },
          },
          PostEdit: "e",
          Profile: {
            screens: {
              Settings: "s",
              ProfileEdit: "g",
            },
          },
        },
      },
    },
  },
};
// console.log(linking);

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });
// // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
// async function sendPushNotification(expoPushToken, notificationContent) {
//   if (expoPushToken) {
//     try {
//       const user = await Auth.currentAuthenticatedUser();

//       // Check if the recipient of the message is the current user
//       if (notificationContent.userID !== user.attributes.sub) {
//         // Create the push token using the createPushToken mutation
//         const createPushTokenInput = {
//           token: expoPushToken,
//           userID: user.attributes.sub,
//         };

//         await API.graphql(
//           graphqlOperation(createPushToken, { input: createPushTokenInput })
//         );

//         // Send the push notification using scheduleNotificationAsync
//         await Notifications.scheduleNotificationAsync({
//           content: {
//             to: expoPushToken,
//             title: notificationContent.title,
//             body: notificationContent.body,
//             data: { data: "goes here" },
//             launchImageName: notificationContent.image,
//           },
//           trigger: null, // No need to specify a trigger, send immediately
//         });

//         console.log("Push notification sent successfully.");
//       } else {
//         console.log(
//           "Notification recipient is the current user. Skipping push notification."
//         );
//       }
//     } catch (error) {
//       console.log("Error sending push notification:", error);
//     }
//   } else {
//     console.log("expoPushToken is missing. Push notification cannot be sent.");
//   }
// }

const Approute = ((navigation) => {
  // const [expoPushToken, setExpoPushToken] = useState("");
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setExpoPushToken(token)
  //   );

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   subscribeToNewChatMessages();

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, [expoPushToken, notification]);

  // async function registerForPushNotificationsAsync() {
  //   let token;
  //   const deviceType = await Device.getDeviceTypeAsync();

  //   if (deviceType !== "unknown") {
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;

  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }

  //     if (finalStatus !== "granted") {
  //       alert("Failed to get push token for push notification!");
  //       return;
  //     }

  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //   } else {
  //     alert("Must use a physical device for Push Notifications");
  //   }

  //   if (Platform.OS === "android") {
  //     Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }

  //   return token;
  // }

  // async function subscribeToNewChatMessages() {
  //   try {
  //     const user = await Auth.currentAuthenticatedUser();
  //     const userId = user.attributes.sub;
  //     const subscription = API.graphql(
  //       graphqlOperation(onCreateMessage)
  //     ).subscribe({
  //       next: (eventData) => {
  //         const newChatMessage = eventData.value.data.onCreateMessage;
  //         if (newChatMessage.userID !== userId) {
  //           const notificationContent = {
  //             title: "New Chat Message",
  //             body: newChatMessage.text,
  //             image:
  //               "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
  //           };
  //           sendPushNotification(expoPushToken, notificationContent);
  //         }
  //       },
  //       error: (error) => {
  //         console.log("Subscription error:", error);
  //       },
  //     });

  //     return () => subscription.unsubscribe();
  //   } catch (error) {
  //     console.log("Error subscribing to new chat messages:", error);
  //   }
  // }

  return (
    <NavigationContainer linking={linking}>
      <Navigation />
    </NavigationContainer>
  );
});

export default Approute;
