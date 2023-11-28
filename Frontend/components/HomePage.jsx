import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import React, { useState, useCallback } from "react";
import { Modal, Portal, Text, Button, PaperProvider } from "react-native-paper";
import { AppState } from "../state/app";
import { useRecoilState } from "recoil";
import BusinessForm from "./BusinessForm";
import BusinessList from "./BusinessList";

const HomePage = () => {
  const [appState, setAppState] = useRecoilState(AppState);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}
    >
      <BusinessList refreshing={refreshing} />
      <BusinessForm />
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
