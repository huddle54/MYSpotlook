import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import FollowingList from "./FollowingList";
import { useTheme } from "../../../../config/ThemeProvider";

const FollowingBox = ({ followers, myBlk, setShow1 }) => {
  const { dark, colors, setScheme } = useTheme();

  return (
    <View>
      <Text style={{ color: colors.postText }}>
        {" "}
        {myBlk ? `0 Following` : `${followers.length} Followings`}
      </Text>
      {/* <ScrollView>
        {followers.map((item) => (<FollowingList item={item} key={item.id} /> ))}
    </ScrollView>            */}
      <View style={{ marginBottom: 66 }}>
        {myBlk ? (
          <></>
        ) : (
          <FlatList
            data={followers}
            renderItem={({ item }) => (
              <FollowingList item={item} setShow1={setShow1} />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
};

export default FollowingBox;

const styles = StyleSheet.create({});
