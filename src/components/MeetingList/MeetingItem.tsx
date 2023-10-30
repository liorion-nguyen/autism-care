import {
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { Avatar, Box, Column, Heading, Row, Text } from "native-base";

type Props = {
  doctorName: string;
  degree: string;
  avt: string;
} & TouchableOpacityProps;

const MeetingItem = ({ doctorName, degree, avt, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box bg="coolGray.500" shadow="8" rounded="2xl" py="3" px="4">
        <Row space="3">
          <Avatar size="md" source={{ uri: avt }} />
          <Column flex="1" justifyContent="space-between">
            <Column>
              <Heading fontSize="lg" color="white">
                {doctorName}
              </Heading>
              <Text color="coolGray.300">{degree}</Text>
            </Column>
          </Column>
        </Row>
      </Box>
    </TouchableOpacity>
  );
};

export default MeetingItem;

const styles = StyleSheet.create({});
