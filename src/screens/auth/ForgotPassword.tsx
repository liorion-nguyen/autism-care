import { StyleSheet } from "react-native";
import React from "react";
import AuthBg from "../../components/AuthBg";
import { Center, Column, FormControl, Heading, Stack, Text } from "native-base";
import FormInput from "../../components/Form/FormInput";
import FormButton from "../../components/Form/FormButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../navigations/config";

type Props = {} & NativeStackScreenProps<AuthStackParams, "ForgotPassword">;

const ForgotPassword = ({ navigation }: Props) => {
  return (
    <AuthBg>
      <Stack space="6">
        <Center>
          <Heading color="primary.600" fontSize="xl" mb="2">
            Quên mật khẩu
          </Heading>
          <Text color="coolGray.300">Nhập số điện thoại để đặt lại mật khẩu</Text>
        </Center>
        <Column space="6">
          <FormControl>
            <FormInput label="Số điện thoại" />
          </FormControl>
          <FormButton onPress={() => navigation.navigate("OTPInput", { target: "ResetPassword" })}>
            Tiếp tục
          </FormButton>
        </Column>
      </Stack>
    </AuthBg>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
