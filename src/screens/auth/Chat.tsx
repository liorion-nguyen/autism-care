import { StyleSheet } from "react-native";
import React from "react";
import { Column, Divider } from "native-base";
import SearchBar from "../../components/Form/SearchBar";
import MessageList from "../../components/MessageList/MessageList";

const Chat = () => {
  return (
    <Column bg="coolGray.700" flex="1" safeAreaTop>
      <Column px="4" mt="3">
        <SearchBar />
      </Column>
      <Divider mt="6" bg="coolGray.500" />
      <Column flex="1" px="4">
        <MessageList />
      </Column>
    </Column>
  );
};

export default Chat;

const styles = StyleSheet.create({});
