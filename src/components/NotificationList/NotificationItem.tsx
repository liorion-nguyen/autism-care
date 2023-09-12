import { StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Center, Column, Heading, Icon, Row, Text } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { INotification } from "../../types/notification";
import { EUserRole, IUserProfile } from "../../types/user";
import moment from "moment";

type Props = {
  data: INotification;
};

const NotificationItem = ({ data }: Props) => {
  const fromUser = data.fromUser as IUserProfile;
  return (
    <TouchableOpacity>
      <Row space="4" py="3">
        {(data.fromUser as IUserProfile).avatarUrl ? (
          <Avatar w="16" h="16" source={{ uri: fromUser.avatarUrl }} />
        ) : (
          <Center bg="white" rounded="full" w="16" h="16">
            <Ionicons name="person-outline" color="gray" size={32} />
          </Center>
        )}
        <Column justifyContent="center" space="1">
          <Column>
            <Row alignItems="center" space="2">
              <Heading fontSize="md" color="white">
                {fromUser.fullname}
              </Heading>
              {fromUser.role === EUserRole.Doctor && (
                <Icon as={Ionicons} name="checkmark-circle" color="primary.600" size="md" />
              )}
            </Row>
            <Text color="white">{data.content}</Text>
          </Column>
          <Row alignItems="center" space="1">
            {/* <Icon color="coolGray.500" as={Ionicons} name="time-outline" /> */}
            <Text color="coolGray.500">{moment(data.createdAt.toDate()).format("DD-MM-YYYY")}</Text>
          </Row>
        </Column>
      </Row>
    </TouchableOpacity>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({});
