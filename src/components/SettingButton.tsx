import React, { PropsWithChildren } from "react";
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Icon, Row, Text } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = { leftIconName: string } & TouchableOpacityProps;
const SettingButton = ({ leftIconName, children, ...btnProps }: Props) => {
  return (
    <TouchableOpacity {...btnProps}>
      <Row rounded="full" bg="coolGray.500" px="6" py="3" shadow={9} space="4">
        <Icon size="lg" as={Ionicons} name={leftIconName} color="primary.600" />
        <Text flex="1" color="white" fontSize="md">
          {children}
        </Text>
        <Icon size="lg" as={Ionicons} name="chevron-forward" color="primary.600" />
      </Row>
    </TouchableOpacity>
  );
};

export default SettingButton;

const styles = StyleSheet.create({});
