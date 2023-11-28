import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "react-native-paper";
import { AppState } from "../state/app";
import { useRecoilState } from "recoil";

const CreateBusinessButton = () => {
  const theme = useTheme();
  const [appState, setAppState] = useRecoilState(AppState);

  const styles = StyleSheet.create({
    fab: {
      position: "absolute",
      margin: 16,
      backgroundColor: theme.colors.onPrimary,
      right: 0,
      bottom: 50,
    },
  });

  return (
    <FAB
      icon="plus"
      style={styles.fab}
      onPress={() =>
        setAppState((prevAppState) => ({
          ...prevAppState,
          createBusiness: true,
        }))
      }
    ></FAB>
  );
};

export default CreateBusinessButton;
