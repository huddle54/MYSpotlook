import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
  Feather,
  Entypo,
} from "@expo/vector-icons";
import { useTheme } from "../../config/ThemeProvider";
import {
  GAMBannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = "ca-app-pub-2246403935295003/3149625489";

const PointsTable = () => {
  const { dark, colors, setScheme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const pointsData = [
    {
      name: "kevin",
      rank: 1,
      postPoints: 0,
      likesPoints: 0,
      commentPoints: 0,
    },
    {
      name: "StoryVerse",
      rank: 2,
      postPoints: 0,
      likesPoints: 0,
      commentPoints: 0,
    },
    {
      name: "murray",
      rank: 3,
      postPoints: 0,
      likesPoints: 0,
      commentPoints: 0,
    },
    {
      name: "Emily",
      rank: 4,
      postPoints: 0,
      likesPoints: 0,
      commentPoints: 0,
    },
    {
      name: "Kailash",
      rank: 5,
      postPoints: 0,
      likesPoints: 0,
      commentPoints: 0,
    },
    {
      name: "Akash",
      rank: 6,
      postPoints: 0,
      likesPoints: 0,
      commentPoints: 0,
    },
    {
      name: "brook22",
      rank: 7,
      postPoints: 0,
      likesPoints: 0,
      commentPoints: 0,
    },
    {
      name: "English",
      rank: 8,
      postPoints: 0,
      likesPoints: 0,
      commentPoints: 0,
    },
    {
      name: "Lyrics_club",
      rank: 9,
      postPoints: 0,
      likesPoints: 0,
      commentPoints: 0,
    },
    {
      name: "Arlo",
      rank: 10,
      postPoints: 0,
      likesPoints: 0,
      commentPoints: 0,
    },
  ];

  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    // Sort data based on total points in descending order
    const sortedPointsData = pointsData.slice().sort((a, b) => {
      const totalPointsA = a.postPoints + a.likesPoints + a.commentPoints;
      const totalPointsB = b.postPoints + b.likesPoints + b.commentPoints;
      return totalPointsB - totalPointsA;
    });

    // Assign ranks
    const rankedData = sortedPointsData.map((data, index) => ({
      ...data,
      rank: index + 1,
    }));

    setSortedData(rankedData);
  }, []);

  // const handleLikePress = (name) => {
  //   const updatedData = sortedData.map((data) => {
  //     if (data.name === name) {
  //       data.likesPoints += 1;
  //     }
  //     return data;
  //   });
  //   updateRanks(updatedData);
  // };

  // const handleCommentPress = (name) => {
  //   const updatedData = sortedData.map((data) => {
  //     if (data.name === name) {
  //       data.commentPoints += 1;
  //     }
  //     return data;
  //   });
  //   updateRanks(updatedData);
  // };

  // const updateRanks = (updatedData) => {
  //   const sortedPointsData = updatedData.slice().sort((a, b) => {
  //     const totalPointsA = a.postPoints + a.likesPoints + a.commentPoints;
  //     const totalPointsB = b.postPoints + b.likesPoints + b.commentPoints;
  //     return totalPointsB - totalPointsA;
  //   });

  //   const rankedData = sortedPointsData.map((data, index) => ({
  //     ...data,
  //     rank: index + 1,
  //   }));

  //   setSortedData(rankedData);
  // };

  // const getMedalIcon = (position) => {
  //   let iconColor = "gray";
  //   let iconName = "md-medal";

  //   if (position === 1) {
  //     iconColor = "gold";
  //   } else if (position === 2) {
  //     iconColor = "silver";
  //   } else if (position === 3) {
  //     iconColor = "#CD7F32";
  //     iconName = "md-medal-outline";
  //   }

  //   return <Ionicons name={iconName} size={24} color={iconColor} />;
  // };

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: colors.postCardOutline,
      }}
    >
      <TouchableOpacity
        style={styles.containers}
        onPress={() => setModalVisible(true)}
      >
        <Entypo name="trophy" size={24} color={colors.icons} />
        <Text style={[styles.title, { color: colors.icons }]}>Point Table</Text>
        <Text style={{color: 'red'}}> * points table with new symbols</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <LinearGradient
          colors={[colors.gradientStartColor, colors.gradientEndColor]}
          style={{ flex: 1 }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              padding: 5,
              borderBottomWidth: 1,
            }}
          >
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Ionicons
                style={styles.backIcon}
                name="arrow-back-outline"
                size={25}
                color={colors.icons}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 24, right: 10, color: "#3570EC" }}>
              Points Table
            </Text>
            <View></View>
          </View>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={[styles.headerText, { color: colors.username }]}>
                  Points Table
                </Text>
              </View>
              <View style={[styles.row, { borderColor: colors.reportText }]}>
                <Text style={[styles.column1, { color: colors.reportText }]}>
                  Name
                </Text>
                <Text style={[styles.column1, { color: colors.reportText }]}>
                  Rank
                </Text>
                <Text style={[styles.column1, { color: colors.reportText }]}>
                  Post{"\n"}Points
                </Text>
                <Text style={[styles.column1, { color: colors.reportText }]}>
                  Likes{"\n"}Points
                </Text>
                <Text style={[styles.column1, { color: colors.reportText }]}>
                  Comment{"\n"}Points
                </Text>
                <Text style={[styles.column1, { color: colors.reportText }]}>
                  Total{"\n"}Points
                </Text>
              </View>
              {sortedData.map((data, index) => (
                <View
                  key={index}
                  style={[styles.row, { borderColor: colors.reportText }]}
                >
                  <Text
                    style={[
                      styles.Fcolumn,
                      {
                        borderColor: colors.reportText,
                        color: colors.reportText,
                      },
                    ]}
                  >
                    {/* {getMedalIcon(data.rank)} */}
                    {data.name}
                  </Text>
                  <Text
                    style={[
                      styles.column,
                      {
                        borderColor: colors.reportText,
                        color: colors.reportText,
                      },
                    ]}
                  >
                    {data.rank}
                  </Text>
                  <Text
                    style={[
                      styles.column,
                      {
                        borderColor: colors.reportText,
                        color: colors.reportText,
                      },
                    ]}
                  >
                    {data.postPoints}
                  </Text>
                  <Text
                    style={[
                      styles.column,
                      {
                        borderColor: colors.reportText,
                        color: colors.reportText,
                      },
                    ]}
                  >
                    {data.likesPoints}
                  </Text>
                  <Text
                    style={[
                      styles.column,
                      {
                        borderColor: colors.reportText,
                        color: colors.reportText,
                      },
                    ]}
                  >
                    {data.commentPoints}
                  </Text>
                  <Text
                    style={[
                      styles.column,
                      {
                        borderColor: colors.reportText,
                        color: colors.reportText,
                      },
                    ]}
                  >
                    {data.postPoints + data.likesPoints + data.commentPoints}
                  </Text>
                  {/* <View style={styles.actions}>
                  <TouchableOpacity onPress={() => handleLikePress(data.name)}>
                    <Text style={styles.actionText}>Like</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleCommentPress(data.name)}
                  >
                    <Text style={styles.actionText}>Comment</Text>
                  </TouchableOpacity>
                </View> */}
                </View>
              ))}

              {/* Add more rows as needed */}
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <GAMBannerAd
                  unitId={adUnitId}
                  sizes={[BannerAdSize.MEDIUM_RECTANGLE]}
                  requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </Modal>
    </View>
  );
};

export default PointsTable;

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
  },
  actionText: {
    marginLeft: 8,
    color: "blue",
    textDecorationLine: "underline",
  },
  containers: {
    padding: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    marginLeft: 15,
    color: 'red'
  },
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginBottom: 5,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
  },
  column: {
    flex: 1,
    textAlign: "center",
    // borderWidth: 1,
    marginVertical: 5,
    // borderLeftWidth: 1,
  },
  Fcolumn: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    // borderWidth: 1,
    // marginVertical: 5,
    // marginRight: 10,
  },
  column1: {
    flex: 1,
    textAlign: "center",
  },
});
