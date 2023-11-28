import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { UserState } from "../state/user";
import { AppState } from "../state/app";
import { BusinessState } from "../state/business";
import { useRecoilState } from "recoil";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Card } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";

const BusinessList = ({ refreshing }) => {
  const [userState, setUserState] = useRecoilState(UserState);
  const [appState, setAppState] = useRecoilState(AppState);
  const [businessState, setBusinessState] = useRecoilState(BusinessState);

  useEffect(() => {
    AsyncStorage.getItem("userData").then((data) => {
      console.log("heheheh", JSON.parse(data)._id);
      axios
        .post("http://192.168.0.13:4500/business/get", {
          userId: JSON.parse(data)._id,
        })
        .then((res) => {
          console.log(res);
          setBusinessState((prevBusinessState) => ({
            ...prevBusinessState,
            businesses: res.data.userBusinesses,
          }));
        });
    });
  }, [userState.userData, refreshing]);

  return (
    <View>
      {businessState.businesses.map((business) => {
        return (
          <Card
            style={{
              marginBottom: 8,
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                columnGap: 14,
                paddingLeft: 10,
                paddingTop: 10,
              }}
            >
              <Text style={{ color: "white" }}>{business.name}</Text>
            </View>
          </Card>
        );
      })}
    </View>
  );
};

export default BusinessList;

const styles = StyleSheet.create({});
