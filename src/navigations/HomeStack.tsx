import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackParams } from "./config";
import Home from "../screens/main/Home/Home";
import PostDetail from "../screens/main/Home/PostDetail";
import WritePost from "../screens/main/Home/WritePost";

const Stack = createStackNavigator<HomeStackParams>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PostDetail" component={PostDetail} />
      <Stack.Screen name="WritePost" component={WritePost} />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
