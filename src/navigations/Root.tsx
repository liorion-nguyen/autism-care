import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import TabNav from "./TabNav";
import ErrorOverlay from "../components/ErrorOverlay";
import { useAppSelector } from "../store";
import FillProfile from "../screens/auth/FillProfile";
import { useTheme } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import ChangePassword from "../screens/main/ChangePassword";
import { RootStackParams } from "./config";
import ResponseForUs from "../screens/main/ResponseForUs";

const Stack = createStackNavigator<RootStackParams>();

const Root = () => {
  const { colors } = useTheme();
  const { user } = useAppSelector((state) => state.user);

  return (
    <>
      <ErrorOverlay />

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: colors.coolGray[700],
            },
            headerTintColor: "white",
            headerTitleStyle: { fontSize: 20 },
            headerBackTitleVisible: false,
          }}
        >
          {!user && <Stack.Screen name="Auth" component={AuthStack} />}
          {user && <Stack.Screen name="TabNav" component={TabNav} />}
          <Stack.Screen
            name="FillProfile"
            component={FillProfile}
            options={{
              title: "Thông tin của bạn",
            }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{
              headerShown: true,
              headerBackTitleVisible: false,
              title: "Đổi mật khẩu",
            }}
          />
          <Stack.Screen name="ResponseForUs" component={ResponseForUs} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Root;

const styles = StyleSheet.create({});
