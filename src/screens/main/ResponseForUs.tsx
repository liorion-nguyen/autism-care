import { Alert, StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import { Column } from "native-base";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigations/config";
import FormInput from "../../components/Form/FormInput";
import FormButton from "../../components/Form/FormButton";

type Props = StackScreenProps<RootStackParams, "ResponseForUs">;

const ResponseForUs = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Phản hồi & trợ giúp",
    });
  }, []);

  function onSend() {
    Alert.alert("Thông báo", "Cảm ơn bạn đã gửi phản hồi cho chúng tôi", [
      {
        text: "Đóng",
        onPress: () => navigation.goBack(),
      },
    ]);
  }

  return (
    <Column flex="1" bg="coolGray.700" px="4" safeAreaBottom pb="6">
      <Column flex="1" mt="10">
        <FormInput
          label="Nội dung"
          placeholder="Nhập nội dung bạn muốn gửi đến chúng tôi"
          multiline
          h="64"
          rounded="3xl"
          fontSize="md"
        />
      </Column>
      <FormButton onPress={onSend}>Gửi</FormButton>
    </Column>
  );
};

export default ResponseForUs;

const styles = StyleSheet.create({});
