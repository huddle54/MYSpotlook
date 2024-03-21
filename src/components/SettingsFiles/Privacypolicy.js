import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
  Feather,
} from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { useTheme } from "../../config/ThemeProvider";

const Privacypolicy = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { dark, colors, setScheme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      padding: 15,
      alignItems: "center",
      flexDirection: "row",
    },
    title: {
      marginLeft: 15,
      color: colors.icons,
    },
  });

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: colors.postCardOutline,
      }}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}
      >
        <Octicons name="shield-lock" size={24} color={colors.icons} />
        <Text style={styles.title}>Privacy policy</Text>
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
              Privacy policy
            </Text>
            <View></View>
          </View>
          <WebView
            style={styles.container}
            source={{
              uri: "https://bloghopelook.blogspot.com/p/privacy-policy_14.html",
            }}
          />
        </LinearGradient>
      </Modal>
    </View>
  );
};

export default Privacypolicy;
