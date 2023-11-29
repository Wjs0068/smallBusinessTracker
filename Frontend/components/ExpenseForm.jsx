import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { UserState } from "../state/user";
import { AppState } from "../state/app";
import { TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";

import { Modal, Portal, TextInput, Button } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import UserAvatar from "./UserAvatar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import AddReceit from "./AddReceit";

const ExpenseForm = () => {
  const [appState, setAppState] = useRecoilState(AppState);
  const [userState, setUserState] = useRecoilState(UserState);
  const [name, setName] = useState("");
  const [miles, setMiles] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const hideModal = () =>
    setAppState((prevAppState) => ({ ...prevAppState, enterExpense: false }));

  const handlePost = () => {
    axios
      .post("http://192.168.0.13:4500/business", {
        owner: userState.userData._id,
        name,
        description,
        address,
        website,
      })
      .then((res) => {
        setUserState((prevUserState) => ({
          ...prevUserState,
          userData: res.data.owner,
        }));
        hideModal();
      });
  };

  return (
    <Portal>
      <Modal
        visible={appState.enterExpense}
        onDismiss={hideModal}
        contentContainerStyle={{
          height: "100%",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <ScrollView style={{ paddingTop: 10 }}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={hideModal}>
              <Ionicons name="close-outline" size={32} />
            </TouchableOpacity>
            <Button
              style={{ alignSelf: "flex-end" }}
              onPress={handlePost}
              mode="contained"
            >
              Finish
            </Button>
          </View>

          <TextInput
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            // mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Description"
            style={styles.input}
            underlineColor="white"
            activeUnderlineColor="white"
            multiline
            // mode="outlined"
            onChangeText={(t) => setDescription(t)}
            contentStyle={{ height: 300, width: "100%" }}
          />
          <TextInput
            label="Miles"
            value={miles}
            onChangeText={(text) => setMiles(text)}
            // mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Amount"
            value={amount}
            onChangeText={(text) => setAmount(text)}
            // mode="outlined"
            style={styles.input}
          />
          <AddReceit />
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginTop: 16,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 14,
    justifyContent: "center",
    marginTop: 16,
  },
  label: {
    marginTop: 8,
    marginBottom: 4,
    color: "rgba(0, 0, 0, 0.54)",
  },
});
