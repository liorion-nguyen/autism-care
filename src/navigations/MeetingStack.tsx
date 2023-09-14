import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MeetingStackParams } from "./config";
import MeetingSchedule from "../screens/main/MeetingSchedule/MeetingSchedule";
import OurDoctors from "../screens/main/MeetingSchedule/OurDoctors";
import Booking from "../screens/main/MeetingSchedule/Booking";
import { useTheme } from "native-base";
import BookingForm from "../screens/main/MeetingSchedule/BookingForm";
import DoctorProfile from "../screens/main/DoctorProfile";

const Stack = createStackNavigator<MeetingStackParams>();

const MeetingStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.coolGray[700] },
        headerTintColor: "white",
        title: "Hẹn lịch tư vấn từ xa",
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="MeetingSchedule" component={MeetingSchedule} />
      <Stack.Screen name="OurDoctors" component={OurDoctors} />
      <Stack.Screen name="Booking" component={Booking} />
      <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
      <Stack.Screen name="BookingForm" component={BookingForm} />
    </Stack.Navigator>
  );
};

export default MeetingStack;

const styles = StyleSheet.create({});
