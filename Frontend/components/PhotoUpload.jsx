import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { AppState } from "../state/app";
import { useRecoilState } from "recoil";
import * as ImagePicker from "react-native-image-picker";
import React, { useState } from "react";

const PhotoUpload = ({ onPhotoSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [appState, setAppState] = useRecoilState(AppState);

  const handleImagePick = () => {
    ImagePicker.launchImageLibrary({
      mediaType: "photo",
      quality: 0.5,
    }).then((resp) => {
      setSelectedImage(resp.assets[0].uri);
      onPhotoSelect(resp.assets[0].uri);
      setAppState((prevAppState) => ({
        ...prevAppState,
        showLoading: !prevAppState.showLoading,
      }));
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePick} style={styles.selectButton}>
        <Text>Upload Receipts</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhotoUpload;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  selectButton: {
    backgroundColor: "lightgray",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
