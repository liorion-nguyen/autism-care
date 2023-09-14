import { StyleSheet } from "react-native";
import React from "react";
import { Avatar, Column, Heading, Row, Text } from "native-base";
import FormButton from "../../components/Form/FormButton";
import { MeetingStackParams } from "../../navigations/config";
import { StackScreenProps } from "@react-navigation/stack";
import DoctorInfoTabs from "../../components/DoctorInfoTabs";

type Props = StackScreenProps<MeetingStackParams, "DoctorProfile">;

const DoctorProfile = ({ navigation, route }: Props) => {
  const { doctor } = route.params;
  return (
    <Column flex="1" bg="coolGray.700" py="4" space="4">
      {/* Avatar */}
      <Column flex="1" space="6">
        <Row alignItems="center" space="3" px="4">
          <Avatar size="lg" source={{ uri: doctor.avatarUrl }} />
          <Column space="1">
            <Heading size="md" color="white">
              {doctor.fullname}
            </Heading>
            <Text color="white">Chuyên viên Tâm lý</Text>
          </Column>
        </Row>
        <Column px="4">
          <FormButton>Tiếp</FormButton>
        </Column>
        {/* Body */}
        <DoctorInfoTabs doctor={doctor} />
      </Column>
    </Column>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({});
