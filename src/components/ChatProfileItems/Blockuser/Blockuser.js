import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useTheme } from "../../../config/ThemeProvider";
import ReportList from "../../Report";
import AppText from "../../AppText";

const Blockuser = ({
  myBlk,
  user,
  onBlocking,
  followers,
  followings,
  setShow,
}) => {
  const { dark, colors, setScheme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [blockModal, setBlockModal] = useState(false);
  //   const [myBlk, setMyBlk] = useState(null);
  const handlePress = async () => {
    // setShow(false);
    // console.log("Function 1 executed");

    await onBlocking();
    console.log("Function 3 executed");

    setBlockModal(!blockModal);
    console.log("Function 2 executed");
  };
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={blockModal}
        onRequestClose={() => {
          setBlockModal(!blockModal);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              { backgroundColor: colors.sheetBackground },
            ]}
          >
            <View>
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#9CB1D8",
                    fontSize: 18,
                  }}
                >
                  {myBlk
                    ? `Unblock ${user?.username}`
                    : `Block ${user?.username}`}
                  ?
                </Text>
              </View>
              <View style={{ justifyContent: "center", marginBottom: 10 }}>
                <Text
                  style={{
                    color: "#9CB1D8",
                    fontSize: 13,
                    textAlign: "justify",
                    lineHeight: 17,
                  }}
                >
                  {myBlk
                    ? "Are you sure you want to unblock this user? This could follow the user and see content from the person's posts and comments."
                    : "Are you sure you want to block this user? The user is no longer able to see content from the person who blocked them. This could include posts, comments, and other forms of content."}
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setBlockModal(!blockModal);
                    }}
                  >
                    <Text style={styles.optionText3}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handlePress}>
                    <Text
                      style={{
                        textAlign: "center",
                        justifyContent: "center",
                        color: "#ff5c5c",
                        marginStart: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {myBlk ? "Unblock" : "Block"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => {
          setBlockModal(true);
        }}
      >
        <AppText style={styles.optionText2}>
          {myBlk ? "Unblock user" : "Block user"}
        </AppText>
      </TouchableOpacity>

      <ReportList
        reportText={"user"}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        successModal={successModal}
        setSuccessModal={setSuccessModal}
      />
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => setModalVisible(true)}
      >
        <AppText style={styles.optionText2}>Report user</AppText>
      </TouchableOpacity>
    </>
  );
};

export default Blockuser;

const styles = StyleSheet.create({
  optionText2: {
    textAlign: "center",
    justifyContent: "center",
    paddingVertical: 10,
    // paddingLeft: 30,
    color: "#ff5c5c",
  },
  optionText3: {
    textAlign: "center",
    justifyContent: "center",
    color: "#ff5c5c",
    marginStart: 20,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 40,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
