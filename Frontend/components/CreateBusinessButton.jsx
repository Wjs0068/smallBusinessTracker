import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "react-native-paper";
import { AppState } from "../state/app";
import { useRecoilState } from "recoil";

const CreateBusinessButton = () => {
  const theme = useTheme();
  const [appState, setAppState] = useRecoilState(AppState);

  const styles = StyleSheet.create({
    fab: {
      margin: 16,
    },
  });

  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={() =>
        setAppState((prevAppState) => ({
          ...prevAppState,
          createBusiness: true,
        }))
      }
    >
      <Ionicons name="add-outline" size={30} />
    </TouchableOpacity>
  );
};

export default CreateBusinessButton;
