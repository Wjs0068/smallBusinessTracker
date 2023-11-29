import * as React from "react";
import { Text, View, Button } from "react-native";
import { PaperProvider } from "react-native-paper";
import lightTheme from "./lightTheme.json";
import darkTheme from "./darkTheme.json";
import { Amplify } from "aws-amplify";
import amplifyconfig from "./src/amplifyconfiguration.json";

import App from "./components";
import { RecoilRoot } from "recoil";

export default function Main() {
  Amplify.configure(amplifyconfig);

  // React.useEffect(() => {
  //   async function call() {
  //     console.log("pooo");

  //     try {
  //       const result = await uploadData({
  //         key: filename,
  //         data: file,
  //       }).result;
  //       console.log("Succeeded: ", result);
  //     } catch (error) {
  //       console.log("Error : ", error);
  //     }
  //   }
  //   call();
  // }, []);

  return (
    <RecoilRoot>
      <PaperProvider theme={darkTheme}>
        <App />
      </PaperProvider>
    </RecoilRoot>
  );
}
