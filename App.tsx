import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import Root from "./src/navigations/Root";
import { NativeBaseProvider } from "native-base";
import appTheme from "./src/theme";
import { Provider } from "react-redux";
import store from "./src/store";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <NativeBaseProvider theme={appTheme} isSSR={false}>
      <Provider store={store}>
        <StatusBar style="light" />
        <Root />
      </Provider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({});
