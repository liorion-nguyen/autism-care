import { Alert, Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../navigations/config";
import { Button, Center, Column, FormControl, Row, Text } from "native-base";
import AuthBg from "../../components/AuthBg";
import FormInput from "../../components/Form/FormInput";
import FormButton from "../../components/Form/FormButton";
import { useAppDispatch, useAppSelector } from "../../store";
import LoadingOverlay from "../../components/LoadingOverlay";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { onInputChange, signUpSchema } from "../../utils/form";
import { firebaseDb } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { ValidationError } from "yup";

type Props = {} & NativeStackScreenProps<AuthStackParams, "SignUp">;

type SignUpDataForm = {
  phone: string;
  password: string;
  repassword: string;
};

function showError(message: string) {
  Alert.alert("Đăng ký thất bại", message);
}

const SignUp = ({ navigation, route }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.loading);

  const [formData, setFormData] = useState<SignUpDataForm>({
    phone: "0337676999",
    password: "12345678",
    repassword: "12345678",
  });

  function onLoginBack() {
    navigation.navigate("Login");
  }

  async function onSignUp() {
    // Loading
    dispatch(setLoading());
    // Validate
    try {
      await signUpSchema.validate(formData);
      if (formData.password !== formData.repassword) {
        throw Error("Nhập lại mật khẩu chưa đúng");
      }
      const docRef = doc(firebaseDb, "users", formData.phone);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        throw Error("Số điện thoại đã tồn tại");
      }
      /**
       * * * * * * * * * * * * * * * * * * *
       * TODO: Move to OTP if didn't exist *
       * * * * * * * * * * * * * * * * * * *
       */

      navigation.navigate("FillProfile", {
        phone: formData.phone,
        password: formData.password,
      });
    } catch (err) {
      const { message } = err as ValidationError;
      showError(message);
    } finally {
      dispatch(removeLoading());
    }
  }

  return (
    <>
      {isLoading && <LoadingOverlay position="absolute" />}

      <AuthBg>
        <Column space="5">
          <FormControl>
            <FormInput
              label="Số điện thoại"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={onInputChange("phone", setFormData, formData)}
            />
          </FormControl>
          <FormControl>
            <FormInput
              label="Mật khẩu"
              type="password"
              value={formData.password}
              onChangeText={onInputChange("password", setFormData, formData)}
            />
          </FormControl>
          <FormControl>
            <FormInput
              label="Nhập lại mật khẩu"
              type="password"
              value={formData.repassword}
              onChangeText={onInputChange("repassword", setFormData, formData)}
            />
          </FormControl>
          <FormButton onPress={onSignUp} mt="5">
            Đăng ký
          </FormButton>
        </Column>
        <Center flexDirection="row" w="100%" mb="8" safeAreaBottom>
          <Text color="primary.600">Bạn đã có tài khoản?</Text>
          <Button variant="link" _text={{ color: "white" }} onPress={onLoginBack}>
            Đăng nhập
          </Button>
        </Center>
      </AuthBg>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
