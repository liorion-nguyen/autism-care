import { StyleSheet } from "react-native";
import React from "react";
import { Avatar, Button, Column, Divider, Heading, Icon, Row, Text } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import FormButton from "./Form/FormButton";
import { IMeeting } from "../types/meeting";
import moment from "moment";
import { EGender, IUserProfile } from "../types/user";

type Props = {
  onCancel?: () => void;
  onMeeting?: () => void;
  meeting: IMeeting;
  user: IUserProfile;
};

const MeetingInfo = ({ onCancel, meeting, user }: Props) => {
  return (
    <Column flex="1">
      <Column flex="1">
        <Heading my="5" color="primary.600" fontSize="lg">
          {moment(meeting.datetime).format("MMM Do YYYY, hh:mm")}
        </Heading>
        <Divider />
        <Row space="4" my="5">
          <Avatar source={require("../../assets/post_user.png")} />
          <Column justifyContent="center">
            <Heading color="white" fontSize="xl">
              {meeting.doctor.degree}
            </Heading>
            <Text color="white" fontSize="md">
              {meeting.doctor?.fullname}
            </Text>
          </Column>
        </Row>
        <Divider />
        <Row space="4" my="5">
          <Icon size="4xl" color="primary.600" as={Ionicons} name="person-outline" />
          <Column justifyContent="center" flex="1">
            <Heading color="white" fontSize="xl">
              {user.fullname}
            </Heading>

            <Column mt="4">
              <Text color="white" fontSize="md">
                <Text fontWeight="bold">Ngày sinh: </Text>
                {moment(user.birthday).format("DD/MM/YYYY")}
              </Text>
              <Text color="white" fontSize="md">
                <Text fontWeight="bold">Giới tính: </Text>
                {user.gender === EGender.F ? "Nữ" : "Nam"}
              </Text>
              <Text color="white" fontSize="md">
                <Text fontWeight="bold">Mong muốn: </Text>
                {meeting.note}
              </Text>
            </Column>
          </Column>
        </Row>
        <Row space="4" my="3">
          <Avatar source={require("../../assets/zoom-logo.png")} w="10" h="10" />
          <Column>
            <Text color="white" fontSize="md">
              <Text fontWeight="bold">ID: </Text>
              809 606 5447
            </Text>
            <Text color="white" fontSize="md">
              <Text fontWeight="bold">Pass: </Text>
              9999
            </Text>
          </Column>
        </Row>
      </Column>
      <Row space="4">
        <Button
          shadow="8"
          flex="1"
          rounded="full"
          colorScheme="red"
          onPress={onCancel}
          _text={{ fontWeight: "semibold" }}
        >
          Hủy
        </Button>
        <FormButton flex="1" disabled>
          Gặp ngay
        </FormButton>
      </Row>
    </Column>
  );
};

export default MeetingInfo;

const styles = StyleSheet.create({});
