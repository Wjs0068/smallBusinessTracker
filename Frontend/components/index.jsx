import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserState } from "../state/user";
import { AppState } from "../state/app";
import { useRecoilState } from "recoil";
import LoginPage from "./LoginPage";
import Nav from "./Nav";

import Ionicons from "@expo/vector-icons/Ionicons";

const App = () => {
  const [loading, setLoading] = useState(true);

  const [userState, setUserState] = useRecoilState(UserState);
  const [appState, setAppState] = useRecoilState(AppState);
  const [tokenPresent, setTokenPresent] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    console.log("called again");
    const checkTokenAndRender = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setTokenPresent(!!token); // Update state based on token presence
        setLoading(false); // Update loading state
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };

    if (userState.token === "") {
      console.log(1);
      setTimeout(checkTokenAndRender, 2000); // Simulating a loading delay
    } else {
      console.log(2);
      checkTokenAndRender();
    }
  }, [userState.token, appState.logoutClicked]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.onPrimary,
    },
  });

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{
            justifyContent: "center",
            // alignItems: "center",
            height: "100%",
          }}
        >
          <Ionicons
            style={{ alignSelf: "center", justifyContent: "center" }}
            name="logo-python"
            size={300}
            color={"white"}
          />
        </View>
      ) : tokenPresent ? (
        <>
          <Nav />
          {/* <CreateBusinessButton /> */}
        </>
      ) : (
        <LoginPage />
      )}
    </View>
  );
};

export default App;
