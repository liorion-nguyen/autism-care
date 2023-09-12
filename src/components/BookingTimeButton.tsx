import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Icon, Row, Text, useTheme } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  time: string;
};

const BookingTimeButton = ({ time }: Props) => {
  const [active, setActive] = useState(false);
  const textColor = active ? "primary.600" : "white";
  return (
    <TouchableOpacity
      onPress={() => {
        setActive(!active);
      }}
    >
      <Row justifyContent="space-between" alignItems="center" py="5">
        <Text color={textColor} fontSize="md">
          {time}
        </Text>
        <Icon
          size="md"
          as={Ionicons}
          name={active ? "radio-button-on" : "radio-button-off"}
          color={textColor}
        />
      </Row>
    </TouchableOpacity>
  );
};

export default BookingTimeButton;

const styles = StyleSheet.create({});
