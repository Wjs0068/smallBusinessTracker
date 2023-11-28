import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "react-native-paper";
import React from "react";

const AddPrivateMessage = () => {
  const theme = useTheme();
  return (
    <View>
      <Ionicons
        name="chatbox-ellipses-outline"
        size={35}
        color={theme.colors.outline}
      />
    </View>
  );
};

export default AddPrivateMessage;

const styles = StyleSheet.create({});
