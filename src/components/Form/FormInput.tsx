import { Platform, StyleSheet } from "react-native";
import React from "react";
import { Box, Column, FormControl, IInputProps, IStackProps, Input } from "native-base";

type Props = {
  label?: string;
  _stack?: IStackProps;
  shadow?: string;
} & IInputProps;

const isIOS = Platform.OS === "ios";

const FormInput = ({ label, _stack, shadow = "8", ...inputProps }: Props) => {
  return (
    <Column {..._stack}>
      {!!label && (
        <FormControl.Label _text={{ color: "primary.600", fontWeight: "medium" }}>
          {label}
        </FormControl.Label>
      )}
      <Box bg="transparent" rounded="full" shadow={shadow}>
        <Input
          size="md"
          bg="coolGray.500"
          borderColor="coolGray.500"
          placeholder={label}
          rounded="full"
          variant="filled"
          py={isIOS ? "3" : "2"}
          color="white"
          {...inputProps}
        />
      </Box>
    </Column>
  );
};

export default FormInput;

const styles = StyleSheet.create({});
