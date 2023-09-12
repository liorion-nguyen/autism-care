import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Column } from "native-base";
import FormInput from "../../components/Form/FormInput";
import FormButton from "../../components/Form/FormButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../navigations/config";

type Props = {} & NativeStackScreenProps<AuthStackParams, "ResetPassword">;

const ResetPassword = ({ navigation, route }: Props) => {
  function onResetPassword() {
    Alert.alert("Thông báo", "Đổi mật khẩu thành công", [
      {
        text: "Đăng nhập",
        onPress: () => {
          navigation.navigate("Login");
        },
      },
    ]);
  }
  return (
    <Column flex="1" bg="coolGray.700" px="6" space="5" py="10">
      <FormInput label="Mật khẩu mới" placeholder="Nhập mật khẩu mới" />
      <FormInput label="Nhập lại mật khẩu" placeholder="Nhập lại mật khẩu mới" />
      <FormButton mt="5" onPress={onResetPassword}>
        Đặt lại mật khẩu
      </FormButton>
    </Column>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
