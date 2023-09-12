import React from "react";
import { StyleSheet } from "react-native";
import AuthBg from "../../components/AuthBg";
import { Button, Center, Column, Heading, Text } from "native-base";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../navigations/config";

type Props = {} & NativeStackScreenProps<AuthStackParams, "OTPInput">;

const OTPInput = ({ navigation, route }: Props) => {
  function onCodeFilled(code: string) {
    const { target } = route.params;
    if (target == "FillProfile") {
      navigation.navigate("FillProfile");
    } else {
      navigation.navigate("ResetPassword")
    }
  }

  return (
    <AuthBg>
      <Column flex="1">
        <Center>
          <Heading color="primary.600" fontSize="lg" mb="2">
            Mã xác thực OTP đã được gửi tới
          </Heading>
          <Heading color="primary.600" fontSize="lg">
            SĐT 0345xxx467
          </Heading>
        </Center>
        <OTPInputView
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          style={styles.otpView}
          onCodeFilled={onCodeFilled}
        />
      </Column>
    </AuthBg>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  otpView: {
    height: 150,
    borderWidth: 0,
  },
  underlineStyleBase: {
    width: 40,
    height: 45,
    fontSize: 20,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: "#76CFF1",
  },
  underlineStyleHighLighted: {
    borderColor: "#76CFF1",
  },
});
