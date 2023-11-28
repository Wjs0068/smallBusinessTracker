import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Button, Drawer } from "react-native-paper";
import { AppState } from "../state/app.js";
import { useRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserState } from "../state/user.js";

const UserAvatar = () => {
  const [appState, setAppState] = useRecoilState(AppState);
  const [userState, setUserState] = useRecoilState(UserState);

  const handleAvatarClick = () => {
    setAppState((prevAppState) => ({
      ...prevAppState,
      avatarClicked: !prevAppState.avatarClicked,
    }));
  };

  const handleLogout = () => {
    AsyncStorage.clear().then(() => {
      setAppState((prevAppState) => ({
        ...prevAppState,
        logoutClicked: !prevAppState.logoutClicked,
      }));
    });
    handleAvatarClick();
  };

  return (
    <View>
      <TouchableOpacity onPress={handleAvatarClick}>
        <Avatar.Image size={32}></Avatar.Image>
      </TouchableOpacity>

      {appState.avatarClicked ? (
        <Drawer.Section style={styles.drawer} title="Some title">
          <Drawer.Item style={styles.item} label="First Item" />
          <Drawer.Item label="Log Out" onPress={handleLogout} />
        </Drawer.Section>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    top: 64, // Adjust the top position based on your layout
    left: 0,
    backgroundColor: "white",
    position: "absolute",
  },
});

export default UserAvatar;
