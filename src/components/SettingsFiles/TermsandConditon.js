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
import Constants from "expo-constants";
import { useTheme } from "../../config/ThemeProvider";

const TermsandConditon = () => {
  const { dark, colors, setScheme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const styles = StyleSheet.create({
    container: {
      padding: 15,
      alignItems: "center",
      flexDirection: "row",
    },
    title: {
      marginLeft: 10,
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
        <MaterialCommunityIcons
          name="file-document"
          size={24}
          color={colors.icons}
        />
        <Text style={styles.title}>Terms of conditions</Text>
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
            <Text style={{ fontSize: 20, right: 10, color: "#3570EC" }}>
              Terms and Conditon
            </Text>
            <View></View>
          </View>

          <WebView
            style={styles.container}
            source={{
              uri: "https://bloghopelook.blogspot.com/p/terms-and-conditions.html",
            }}
          />
        </LinearGradient>
      </Modal>
    </View>
  );
};

export default TermsandConditon;
