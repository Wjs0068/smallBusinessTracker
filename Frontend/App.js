import * as React from "react";
import { Text, View, Button } from "react-native";
import { PaperProvider } from "react-native-paper";
import lightTheme from "./lightTheme.json";
import darkTheme from "./darkTheme.json";
import App from "./components";
import { RecoilRoot } from "recoil";

export default function Main() {
  return (
    <RecoilRoot>
      <PaperProvider theme={darkTheme}>
        <App />
      </PaperProvider>
    </RecoilRoot>
  );
}
