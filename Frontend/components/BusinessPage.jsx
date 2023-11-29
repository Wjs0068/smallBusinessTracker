import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilState } from "recoil";
import { AppState } from "../state/app";
import { BusinessState } from "../state/business";
import { Button } from "react-native-paper";
import ExpenseForm from "./ExpenseForm";
import SaleForm from "./SaleForm";

const BusinessPage = () => {
  const [businessState, setBusinessState] = useRecoilState(BusinessState);
  const [appState, setAppState] = useRecoilState(AppState);

  useEffect(() => {
    AsyncStorage.getItem("selectedBusiness").then((res) => {
      setBusinessState((prevBusinessState) => ({
        ...prevBusinessState,
        selectedBusiness: JSON.parse(res),
      }));
    });
  }, []);

  const handleEnterExpense = () => {
    setAppState((prevAppState) => ({
      ...prevAppState,
      enterExpense: true,
    }));
  };
  const handleEnterSale = () => {
    setAppState((prevAppState) => ({
      ...prevAppState,
      enterSale: true,
    }));
  };

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View
        style={{
          position: "absolute",
          bottom: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <ExpenseForm />
        <SaleForm />
        <Button
          onPress={handleEnterExpense}
          mode="outlined"
          labelStyle={{ fontSize: 20, color: "red" }}
        >
          Enter Expense
        </Button>
        <Button
          onPress={handleEnterSale}
          mode="outlined"
          labelStyle={{ fontSize: 20, color: "green" }}
        >
          Enter Income
        </Button>
      </View>
    </View>
  );
};

export default BusinessPage;

const styles = StyleSheet.create({});
