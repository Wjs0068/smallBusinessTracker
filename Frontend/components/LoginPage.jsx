import React, { useState } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { TextInput, Button, Text, Switch } from "react-native-paper";
import { UserState } from "../state/user";
import { useRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [userState, setUserState] = useRecoilState(UserState);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = () => {
    if (isLogin) {
      axios
        .post("http://192.168.0.13:4500/user/login", {
          email,
          password,
        })
        .then((res) => {
          const { token, userData } = res.data;
          console.log(res.data);
          setUserState((prevUserState) => ({
            ...prevUserState,
            token: token,
            userData: userData,
          }));

          AsyncStorage.setItem("userToken", token).then(() => {
            console.log("Token saved to AsyncStorage");
          });
          AsyncStorage.setItem("userData", JSON.stringify(userData)).then(
            () => {
              console.log("userData saved to AsyncStorage");
            }
          );

          console.log("Login successful");
        })
        .catch((error) => {
          console.error("Login error:", error);
        });
    } else {
      axios
        .post("http://192.168.0.13:4500/user", {
          firstName,
          lastName,
          email,
          password,
        })
        .then((res) => {
          const { token, userData } = res.data;
          console.log(res.data);
          setUserState((prevUserState) => ({
            ...prevUserState,
            token: token,
            userData: userData,
          }));

          AsyncStorage.setItem("userToken", token).then(() => {
            console.log("Token saved to AsyncStorage");
          });
          AsyncStorage.setItem("userData", JSON.stringify(userData)).then(
            () => {
              console.log("userData saved to AsyncStorage");
            }
          );

          console.log("Login successful");
        })
        .catch((error) => {
          console.error("Login error:", error);
        });
    }
  };

  return (
    <View style={styles.container}>
      {!isLogin && (
        <>
          <TextInput
            label="First Name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Last Name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            mode="outlined"
            style={styles.input}
          />

          {/* <Text style={styles.label}>Select Date of Birth:</Text>
          <DatePicker
            label="Date of Birth"
            value={dateOfBirth}
            mode="date"
            onChange={(date) => setDateOfBirth(date)}
            style={styles.input}
          /> */}
        </>
      )}
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />

      {!isLogin && (
        <>
          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry
            mode="outlined"
            style={styles.input}
          />

          {/* <Text style={styles.label}>Select Date of Birth:</Text>
          <DatePicker
            label="Date of Birth"
            value={dateOfBirth}
            mode="date"
            onChange={(date) => setDateOfBirth(date)}
            style={styles.input}
          /> */}
        </>
      )}

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        {isLogin ? "Login" : "Sign Up"}
      </Button>

      <View style={styles.switchContainer}>
        <Text>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </Text>
        <Switch value={!isLogin} onValueChange={toggleForm} />
      </View>
    </View>
  );
};

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

export default LoginPage;
