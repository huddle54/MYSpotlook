import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  Modal,
  Image,
} from "react-native";
import React, { useState } from "react";
import { CheckBox, Icon } from "@rneui/themed";
import { useTheme } from "../config/ThemeProvider";

const Report = ({
  modalVisible,
  setModalVisible,
  successModal,
  setSuccessModal,
  reportText,
}) => {
  const { dark, colors, setScheme } = useTheme();
  const [check1, setCheck1] = useState(null);

  const handleSubmit = () => {
    setModalVisible(false);
    setSuccessModal(true);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
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
              <View
                style={{ justifyContent: "center", alignItems: "flex-start" }}
              >
                <Text
                  style={{
                    fontWeight: "800",
                    paddingVertical: 5,
                    color: colors.reportText,
                  }}
                >
                  Are you sure you want to report this {reportText} ?
                </Text>
              </View>
              <TouchableHighlight
                style={{ justifyContent: "center" }}
                underlayColor={colors.ripples}
                onPress={() => setCheck1("Inappropriate language")}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CheckBox
                    containerStyle={{
                      backgroundColor: "transparent",
                      marginLeft: 1,
                      marginRight: 1,
                      padding: 1,
                    }}
                    checkedIcon={
                      <Icon
                        name="radio-button-checked"
                        type="material"
                        color="dodgerblue"
                        size={18}
                        iconStyle={{ marginRight: 0 }}
                      />
                    }
                    uncheckedIcon={
                      <Icon
                        name="radio-button-unchecked"
                        type="material"
                        color="grey"
                        size={18}
                        iconStyle={{ marginRight: 0 }}
                      />
                    }
                    checked={check1 === "Inappropriate language"}
                  />
                  <Text style={{ color: colors.reportText }}>
                    Inappropriate language
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ justifyContent: "center" }}
                underlayColor={colors.ripples}
                onPress={() => setCheck1("Harassment or bullying")}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CheckBox
                    containerStyle={{
                      backgroundColor: "transparent",
                      marginLeft: 1,
                      marginRight: 1,
                      padding: 1,
                    }}
                    checkedIcon={
                      <Icon
                        name="radio-button-checked"
                        type="material"
                        color="dodgerblue"
                        size={18}
                        iconStyle={{ marginRight: 0 }}
                      />
                    }
                    uncheckedIcon={
                      <Icon
                        name="radio-button-unchecked"
                        type="material"
                        color="grey"
                        size={18}
                        iconStyle={{ marginRight: 0 }}
                      />
                    }
                    checked={check1 === "Harassment or bullying"}
                  />
                  <Text style={{ color: colors.reportText }}>
                    Harassment or bullying
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ justifyContent: "center" }}
                underlayColor={colors.ripples}
                onPress={() => setCheck1("Spam or spammy content")}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CheckBox
                    containerStyle={{
                      backgroundColor: "transparent",
                      marginLeft: 1,
                      marginRight: 1,
                      padding: 1,
                    }}
                    checkedIcon={
                      <Icon
                        name="radio-button-checked"
                        type="material"
                        color="dodgerblue"
                        size={18}
                        iconStyle={{ marginRight: 0 }}
                      />
                    }
                    uncheckedIcon={
                      <Icon
                        name="radio-button-unchecked"
                        type="material"
                        color="grey"
                        size={18}
                        iconStyle={{ marginRight: 0 }}
                      />
                    }
                    checked={check1 === "Spam or spammy content"}
                  />
                  <Text style={{ color: colors.reportText }}>
                    Spam or spammy content
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ justifyContent: "center" }}
                underlayColor={colors.ripples}
                onPress={() => setCheck1("Misleading or false information")}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CheckBox
                    containerStyle={{
                      backgroundColor: "transparent",
                      marginLeft: 1,
                      marginRight: 1,
                      padding: 1,
                    }}
                    checkedIcon={
                      <Icon
                        name="radio-button-checked"
                        type="material"
                        color="dodgerblue"
                        size={18}
                        iconStyle={{ marginRight: 0 }}
                      />
                    }
                    uncheckedIcon={
                      <Icon
                        name="radio-button-unchecked"
                        type="material"
                        color="grey"
                        size={18}
                        iconStyle={{ marginRight: 0 }}
                      />
                    }
                    checked={check1 === "Misleading or false information"}
                  />
                  <Text style={{ color: colors.reportText }}>
                    Misleading or false information
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ justifyContent: "center" }}
                underlayColor={colors.ripples}
                onPress={() => setCheck1("Harmful or dangerous content")}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CheckBox
                    containerStyle={{
                      backgroundColor: "transparent",
                      marginLeft: 1,
                      marginRight: 1,
                      padding: 1,
                    }}
                    checkedIcon={
                      <Icon
                        name="radio-button-checked"
                        type="material"
                        color="dodgerblue"
                        size={18}
                        iconStyle={{ marginRight: 0 }}
                      />
                    }
                    uncheckedIcon={
                      <Icon
                        name="radio-button-unchecked"
                        type="material"
                        color="grey"
                        size={18}
                        iconStyle={{ marginRight: 0 }}
                      />
                    }
                    checked={check1 === "Harmful or dangerous content"}
                  />
                  <Text style={{ color: colors.reportText }}>
                    Harmful or dangerous content
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ justifyContent: "center" }}
                underlayColor={colors.ripples}
                onPress={() => setCheck1("Nudity or explicit content")}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CheckBox
                    containerStyle={{
                      backgroundColor: "transparent",
                      marginLeft: 1,
                      marginRight: 1,
                      padding: 1,
                    }}
                    checkedIcon={
                      <Icon
                        name="radio-button-checked"
                        type="material"
                        color="dodgerblue"
                        size={18}
                        iconStyle={{ marginRight: 0 }}
                      />
                    }
                    uncheckedIcon={
                      <Icon
                        name="radio-button-unchecked"
                        type="material"
                        color="grey"
                        size={18}
                        iconStyle={{ marginRight: 0 }}
                      />
                    }
                    checked={check1 === "Nudity or explicit content"}
                  />
                  <Text style={{ color: colors.reportText }}>
                    Nudity or explicit content
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ justifyContent: "center" }}
                underlayColor={colors.ripples}
                onPress={() => setCheck1("Threats or violence")}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CheckBox
                    containerStyle={{
                      backgroundColor: "transparent",
                      marginLeft: 1,
                      marginRight: 1,
                      padding: 1,
                    }}
                    checkedIcon={
                      <Icon
                        name="radio-button-checked"
                        type="material"
                        color="dodgerblue"
                        size={18}
                        iconStyle={{ marginRight: 0 }}
                      />
                    }
                    uncheckedIcon={
                      <Icon
                        name="radio-button-unchecked"
                        type="material"
                        color="grey"
                        size={18}
                        iconStyle={{ marginRight: 0 }}
                      />
                    }
                    checked={check1 === "Threats or violence"}
                  />
                  <Text style={{ color: colors.reportText }}>
                    Threats or violence
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ justifyContent: "center" }}
                underlayColor={colors.ripples}
                onPress={() => setCheck1("Illegal activity")}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CheckBox
                    containerStyle={{
                      backgroundColor: "transparent",
                      marginLeft: 1,
                      marginRight: 1,
                      padding: 1,
                    }}
                    checkedIcon={
                      <Icon
                        name="radio-button-checked"
                        type="material"
                        color="dodgerblue"
                        size={18}
                        iconStyle={{ marginRight: 0 }}
                      />
                    }
                    uncheckedIcon={
                      <Icon
                        name="radio-button-unchecked"
                        type="material"
                        color="grey"
                        size={18}
                        iconStyle={{ marginRight: 0 }}
                      />
                    }
                    checked={check1 === "Illegal activity"}
                  />
                  <Text style={{ color: colors.reportText }}>
                    Illegal activity
                  </Text>
                </View>
              </TouchableHighlight>

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
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.optionText3}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleSubmit} disabled={!check1}>
                    <Text
                      style={{
                        textAlign: "center",
                        justifyContent: "center",
                        color: check1 ? "#ff5c5c" : "rgba(0,0,0,0.2)",
                        marginStart: 20,
                        fontWeight: "bold",
                      }}
                    >
                      Report
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={successModal}
        onRequestClose={() => {
          setSuccessModal(!successModal);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              { backgroundColor: colors.sheetBackground },
            ]}
          >
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Text style={{ fontWeight: "bold", color: colors.reportText }}>
                This {reportText} has been reported successfully!
              </Text>
            </View>
            <View style={{ marginTop: 10, marginBottom: 20 }}>
              <Image
                source={require("../../assets/check.png")}
                style={{ height: 70, width: 70 }}
              />
            </View>
            <View style={{ marginTop: 0, marginBottom: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <TouchableOpacity
                  style={{
                    padding: 5,
                    borderRadius: 5,
                    width: 60,
                    backgroundColor: colors.reportText,
                  }}
                  onPress={() => {
                    setSuccessModal(!successModal);
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Ok
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Report;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,

    borderRadius: 10,
    padding: 15,
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
  optionText3: {
    textAlign: "center",
    justifyContent: "center",
    color: "#ff5c5c",
    marginStart: 20,
    fontWeight: "bold",
  },
});
