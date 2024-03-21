import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
  Feather,
} from "@expo/vector-icons";

const DeleteAccount = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: "#3B516E" }}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="trash" size={24} color="#3B516E" />
        <Text style={styles.title}>Delete account</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <LinearGradient colors={["#E5F7FF", "#FFFFFF"]} style={{ flex: 1 }}>
          <View>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Text>D A</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    marginLeft: 10,
    color: "#3B516E",
  },
});
