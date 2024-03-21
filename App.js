import React, { useCallback, useEffect, useState, useRef } from "react";
import { View, Text, Platform, PermissionsAndroid } from "react-native";
import { StatusBar } from "expo-status-bar";
import Approute from "./src/navigation/Approute";
import { Auth, API, graphqlOperation, Amplify } from "aws-amplify";
import config from "./src/aws-exports";
import "expo-dev-client";
import { ThemeProvier } from "./src/config/ThemeProvider";
import { getUser } from "./src/graphql/queries";
import { createUser} from "./src/graphql/mutations";
import useCachedResources from "./hooks/useCachedResources";
import { AdManager } from "react-native-admob-native-ads";
import * as Linking from "expo-linking"

AdManager.setRequestConfiguration({
  testDeviceIds: ["Your test device id"],
});

// import {
//   InterstitialAd,
//   TestIds,
//   AdEventType,
// } from "react-native-google-mobile-ads";

// const adUnitId = "ca-app-pub-2246403935295003/3101524021";

// const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
//   requestNonPersonalizedAdsOnly: true,
//   keywords: ["fashion", "clothing"],
// });


Amplify.configure(config);

export default function App() {
  const isLoadingComplete = useCachedResources();

  const saveUserToDB = async (user) => {
    // console.log(user);
    await API.graphql(graphqlOperation(createUser, { input: user }));
  };

  useEffect(() => {
    const updateUser = async () => {
      // get current authenticated user
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      // console.log(userInfo);

      if (userInfo) {
        // check if user already exists in database
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        );
        // console.log(userData);
        if (!userData.data.getUser) {
          const user = {
            id: userInfo.attributes.sub,
            username: userInfo.username,
            email: userInfo.attributes.email,
            name: userInfo.attributes.name,
            bio: "",
          };
          await saveUserToDB(user);
        } else {
          console.log("User already exists in database");
        }
      }

      // if it doesn't, create the user in the database
    };
    updateUser();
  }, []);

  // const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   const unsubscribe = interstitial.addAdEventListener(
  //     AdEventType.LOADED,
  //     () => {
  //       setLoaded(true);
  //     }
  //   );

  //   // Start loading the interstitial straight away
  //   interstitial.load();

  //   // Unsubscribe from events on unmount
  //   return unsubscribe;
  // }, []);

//   const url = Linking.useURL();

//     useEffect(() => {
//         // Do something with url
//         console.log(url);
//     }, [url]);

//   const nav = useRef();

// const handleURL = (url) => {
//     const { hostname, path, queryParams } = Linking.parse(url);
//     if (path === 'alert') {
//         alert(queryParams.str);
//     } else if (path === 'navigate') {
//         nav.current.navigate('Settings');
//     } else {
//         console.log(path, queryParams, hostname);
//     }
// }

// useEffect(() => {
//   // Do something with URL
//   if (url) {
//       handleURL(url);
//   } else {
//       console.log('No URL');
//   }
// }, [url])


  if (!isLoadingComplete) {
    return null;
  } else {
    // if (!loaded) {
    //   return null;
    // }
    return (
      <>
        <StatusBar style="light" backgroundColor="rgba(0,0,0,0.2)" />
        <ThemeProvier>
        
          <Approute />
        </ThemeProvier>
        {/* <Button
          title="Show Interstitial"
          onPress={() => {
            interstitial.show();
          }}
        /> */}
      </>
    );
  }
}
