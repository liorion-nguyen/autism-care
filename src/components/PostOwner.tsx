import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Center,
  Column,
  Heading,
  IStackProps,
  Icon,
  IconButton,
  Row,
  Text,
} from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment";
import { IUserProfile, EUserRole } from "../types/user";

type Props = {
  _stack?: IStackProps;
  user: IUserProfile;
  createdAt?: any;
};

const PostOwner = ({ _stack, user, createdAt }: Props) => {
  return (
    <Row space="3" {..._stack}>
      {user?.avatarUrl ? (
        <Avatar size="md" source={{ uri: user?.avatarUrl }} />
      ) : (
        <Center bg="white" rounded="full" w="12" h="12">
          <Ionicons name="person-outline" color="gray" size={32} />
        </Center>
      )}
      <Column flex="1" space="0.5" justifyContent="center">
        <Row alignItems="center" space="2">
          <Heading fontSize="lg" color="white">
            {user?.fullname}
          </Heading>
          {user.role === EUserRole.Doctor && (
            <Icon as={Ionicons} name="checkmark-circle" color="primary.600" size="md" />
          )}
        </Row>
        <Row space="2" alignItems="center">
          <Text color="coolGray.500">{moment(createdAt.toDate()).format("DD MMM YYYY")}</Text>
          <Icon as={Ionicons} name="ellipse" color="coolGray.500" size="2xs" />
          <Icon as={Ionicons} name="globe-outline" color="coolGray.500" size="sm" />
        </Row>
      </Column>
      <IconButton
        variant="unstyled"
        p="0"
        icon={<Icon size="lg" as={Ionicons} name="ellipsis-vertical" color="white" />}
      />
    </Row>
  );
};

export default PostOwner;

const styles = StyleSheet.create({});
