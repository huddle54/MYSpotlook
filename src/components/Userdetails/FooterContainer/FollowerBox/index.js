import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import FollowerList from "./FollowerList";
import { useTheme } from "../../../../config/ThemeProvider";

const FollowerBox = ({ followings, isMe, myBlk, setShow }) => {
  const { dark, colors, setScheme } = useTheme();

  return (
    <View>
      <Text style={{ color: colors.postText }}>
        {" "}
        {myBlk ? `0 Follower` : `${followings.length} Followers`}
      </Text>
      {/* <ScrollView>
        {followings.map((item) => (<FollowerList item={item} key={item.id} isMe={isMe}/>))}
        </ScrollView> */}
      <View style={{ marginBottom: 66 }}>
        {myBlk ? (
          <></>
        ) : (
          <FlatList
            data={followings}
            renderItem={({ item }) => (
              <FollowerList item={item} isMe={isMe} setShow={setShow} />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
};

export default FollowerBox;

const styles = StyleSheet.create({});
