import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";
import { Avatar, Box, Column, Heading, Row, Text } from "native-base";

type Props = {
  doctorName: string;
  degree: string;
} & TouchableOpacityProps;

const MeetingItem = ({ doctorName, degree, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box bg="coolGray.500" shadow="8" rounded="2xl" py="3" px="4">
        <Row space="3">
          <Avatar size="md" source={require("../../../assets/post_user.png")} />
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
