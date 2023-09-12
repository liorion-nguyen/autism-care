import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HistoryStackParams } from "./config";
import History from "../screens/main/History";
import PostDetail from "../screens/main/Home/PostDetail";
import { useTheme } from "native-base";

const Stack = createStackNavigator<HistoryStackParams>();

const HistoryStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: colors.coolGray[700] },
        headerTintColor: "white",
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="History"
        component={History}
        options={{ title: "Lịch sử đăng bài", headerShown: true }}
      />
      <Stack.Screen name="PostDetail" component={PostDetail} />
    </Stack.Navigator>
  );
};

export default HistoryStack;

const styles = StyleSheet.create({});
