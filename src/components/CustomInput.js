import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Controller } from "react-hook-form";

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  iconType,
  keyboardType,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View style={styles.container}>
            <View style={styles.iconstyle}>
              <Ionicons name={iconType} size={18} color="#666" />
            </View>
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder={placeholder}
              onBlur={onBlur}
              style={styles.input}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
            />
          </View>
          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    width: "95%",
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginTop: 5,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    padding: 10,
    flex: 1,
    fontFamily: "Roboto",
    color: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  iconstyle: {
    padding: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderRightWidth: 1,
    width: 45,
  },
});

export default CustomInput;
