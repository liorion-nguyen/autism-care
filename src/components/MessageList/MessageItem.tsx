import { StyleSheet, Pressable } from "react-native";
import React from "react";
import { Avatar, Center, Column, Heading, Row, Text } from "native-base";

const MessageItem = () => {
  return (
    <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }]}>
      <Row space="3" py="3">
        <Avatar size="lg" source={require("../../../assets/user_avatar.png")} />
        <Column flex="1" space="2" justifyContent="center">
          <Heading color="white" size="md">
            Ahmad Geidt
          </Heading>
          <Text color="coolGray.500" fontSize="sm">
            Tin nhắn cuối cùng
          </Text>
        </Column>
        <Center>
          <Text color="coolGray.500" fontSize="md">
            07:00
          </Text>
        </Center>
      </Row>
    </Pressable>
  );
};

export default MessageItem;

const styles = StyleSheet.create({});
