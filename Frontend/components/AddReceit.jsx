import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import PhotoUpload from "./PhotoUpload";
import { AppState } from "../state/app";
import { uploadData, getUrl } from "@aws-amplify/storage";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

const AddReceit = () => {
  const [appState, setAppState] = useRecoilState(AppState);
  const [receit, setReceit] = useState([]);

  const handlePhotoSelect = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      let key = uuidv4();

      const imageUrl = await uploadData({
        key: key,
        data: blob,
        options: {
          contentType: response.headers.get("content-type"),
        },
      }).result;

      const presignedURL = await getUrl({
        key: key,
        options: { accessLevel: "guest", expiresIn: 900 },
      });

      setReceit((prevReceit) => [...prevReceit, presignedURL.url.toString()]);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <View>
      <FlatList
        horizontal
        data={receit}
        style={{ flexDirection: "row" }}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Image
            style={{
              height: 200,
              width: 200,
              objectFit: "cover",
              marginBottom: 10,
            }}
            source={{ uri: item }}
          />
        )}
      />

      <PhotoUpload onPhotoSelect={handlePhotoSelect} />
    </View>
  );
};

export default AddReceit;
