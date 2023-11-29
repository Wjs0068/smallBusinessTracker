import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import HomePage from "./HomePage";
import Dashboard from "./Dashboard";
import BusinessPage from "./BusinessPage";
import CalendarPage from "./CalendarPage";
import CreateBusinessButton from "./CreateBusinessButton";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Nav = () => {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{
            headerRight: () => {
              return <CreateBusinessButton />;
            },
            headerStyle: {
              flexDirection: "row",
              alignItems: "center",
            },
          }}
        />
        <Stack.Screen name="Business" component={BusinessTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return <Ionicons name="home-outline" size={20} color={"grey"} />;
          } else if (route.name === "Dashboard") {
            return (
              <Ionicons name="pie-chart-outline" size={20} color={"grey"} />
            );
          }
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: false }}
      ></Tab.Screen>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

const BusinessTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Business") {
            return (
              <Ionicons name="business-outline" size={20} color={"grey"} />
            );
          } else if (route.name === "Calendar") {
            return (
              <Ionicons name="calendar-outline" size={20} color={"grey"} />
            );
          }
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Business"
        component={BusinessPage}
      ></Tab.Screen>

      <Tab.Screen
        options={{ headerShown: false }}
        name="Calendar"
        component={CalendarPage}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default Nav;

const styles = StyleSheet.create({});
