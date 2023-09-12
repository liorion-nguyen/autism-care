import { StyleSheet } from "react-native";
import React from "react";
import { Button, IButtonProps } from "native-base";

type Props = IButtonProps;

const FormButton = ({ children, disabled, ...buttonProps }: Props) => {
  return (
    <Button
      shadow="8"
      opacity={disabled ? 0.3 : 1}
      _text={{ color: "black", fontWeight: "medium" }}
      variant="solid"
      rounded="full"
      h="12"
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

export default FormButton;

const styles = StyleSheet.create({});
