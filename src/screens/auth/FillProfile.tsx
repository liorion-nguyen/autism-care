import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { Column, Divider, Heading, Row, Text } from "native-base";
import FormInput from "../../components/Form/FormInput";
import FormButton from "../../components/Form/FormButton";
import GenderSelect from "../../components/Form/GenderSelect";
import { useAppDispatch, useAppSelector } from "../../store";
import { setUser } from "../../store/user.reducer";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigations/config";
import { EGender, EUserRole } from "../../types/user";
import { fillProfileSchema, onInputChange } from "../../utils/form";
import FormDatePicker from "../../components/Form/FormDatePicker";
import LoadingOverlay from "../../components/LoadingOverlay";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { ValidationError } from "yup";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { firebaseDb } from "../../firebase";
import moment from "moment";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {} & StackScreenProps<RootStackParams, "FillProfile">;

type ProfileForm = {
  fullname: string;
  birthday: Date;
  gender: EGender;
  email: string;
};

const FillProfile = ({ navigation, route }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const editMode = !!user;
  const { isLoading } = useAppSelector((state) => state.loading);
  const title = editMode ? "Cập nhật thông tin" : "Điền thông tin";

  const [formData, setFormData] = useState<ProfileForm>({
    fullname: editMode ? user.fullname : "",
    birthday: editMode ? new Date(user.birthday) : new Date(),
    gender: editMode ? user.gender : EGender.M,
    email: editMode ? user.email : "",
  });

  async function onSignUp() {
    const { password, phone } = route.params!;
    dispatch(setLoading());
    try {
      await fillProfileSchema.validate(formData);
      if (moment(new Date()).diff(formData.birthday, "y") < 16) {
        throw Error("Bạn chưa đủ tuổi dùng ứng dụng");
      }
      const newDoc = doc(firebaseDb, "users", phone);
      const docData = {
        phone,
        password,
        role: EUserRole.Member,
        ...formData,
        birthday: formData.birthday.toISOString(),
      };
      await setDoc(newDoc, docData);
      dispatch(setUser(docData));
      navigation.navigate("TabNav");
    } catch (err) {
      const { message } = err as ValidationError;
      Alert.alert("Thông báo", message);
    } finally {
      dispatch(removeLoading());
    }
  }

  async function onUpdateProflie() {
    try {
      dispatch(setLoading());
      const userDoc = doc(firebaseDb, "users", user!.phone);
      const docData = {
        ...formData,
        birthday: formData.birthday.toISOString(),
      };
      await updateDoc(userDoc, docData);
      dispatch(setUser({ ...user!, ...docData }));
      Alert.alert("Thông báo", "Cập nhật thông tin thành công");
    } catch (err) {
      const { message } = err as ValidationError;
      Alert.alert("Thông báo", message);
    } finally {
      dispatch(removeLoading());
    }
  }

  function onFilled() {
    if (!editMode) onSignUp();
    else onUpdateProflie();
  }

  return (
    <>
      {isLoading && <LoadingOverlay position="absolute" />}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Column flex="1" bg="coolGray.700" safeArea>
          <Row alignItems="center" px="3" pb="3" pt="1">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={28} color="white" />
            </TouchableOpacity>
            <Heading textAlign="center" flex="1" color="white" fontSize="lg" fontWeight="semibold">
              {title}
            </Heading>
            <Row style={{ width: 28 }} />
          </Row>
          <Divider style={{ height: 0.2 }} />
          <Column space="5" px="6" flex="1" py="6">
            <FormInput
              label="Tên"
              placeholder="Nhập tên"
              value={formData.fullname}
              onChangeText={onInputChange<ProfileForm>("fullname", setFormData, formData)}
            />
            <FormDatePicker
              value={formData.birthday}
              onChange={onInputChange<ProfileForm>("birthday", setFormData, formData)}
            />
            <GenderSelect
              selected={formData.gender}
              onChange={onInputChange<ProfileForm>("gender", setFormData, formData)}
            />
            <FormInput
              label="Email"
              placeholder="youremail@gmail.com"
              value={formData.email}
              onChangeText={onInputChange<ProfileForm>("email", setFormData, formData)}
            />
          </Column>
          <FormButton mb="4" mx="4" onPress={onFilled}>
            {editMode ? "Cập nhật" : "Hoàn thành"}
          </FormButton>
        </Column>
      </TouchableWithoutFeedback>
    </>
  );
};

export default FillProfile;

const styles = StyleSheet.create({});
