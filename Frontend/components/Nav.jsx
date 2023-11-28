import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "react-native-paper";
import HomePage from "./HomePage";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Nav = () => {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Nav;

const styles = StyleSheet.create({});
