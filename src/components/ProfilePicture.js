import { StyleSheet, Image, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getUser, listUsers } from "../graphql/queries";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { S3Image } from "aws-amplify-react-native";

const ProfilePicture = ({ image, size = 40 }) => {
  // const [user, setUser] = useState([])

  //   useEffect(() => {
  //     const fetchUser = async () => {
  //         try {
  //             const userInfo = await Auth.currentAuthenticatedUser()
  //             const userData = await API.graphql(graphqlOperation(getUser, {id: userInfo.attributes.sub}));
  //             console.log(userData);

  //             setUser(userData.data.getUser)

  //         } catch (e) {
  //             console.log(e);
  //         }
  //     }
  //     fetchUser();
  // },[])

  // useEffect(() => {
  //   // get the current user
  //   const fetchUser = async () => {
  //     const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
  //     if (!userInfo) {
  //       return;
  //     }

  //     try {
  //       const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub }))
  //       if (userData) {
  //         setUser(userData.data.getUser);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   fetchUser();
  // }, [])

  return (
    <View>
      {image ? (
        <S3Image
          style={{ width: size, height: size, borderRadius: size }}
          imgKey={image}
        />
      ) : (
        <Image
          source={require("../../assets/user.png")}
          style={{ width: size, height: size, borderRadius: size }}
        />
      )}
    </View>
    // <View>
    //   <Image style={{
    //     width: size,
    //     height: size,
    //     borderRadius: size,
    // }} source={user?.image? {uri: user?.image} : require('../../assets/user.png')}/>
    // </View>
  );
};

export default ProfilePicture;
