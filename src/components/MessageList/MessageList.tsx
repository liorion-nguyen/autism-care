import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MessageItem from "./MessageItem";
import { FlatList, Stack } from "native-base";

const MessageList = () => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5, 6, 6, 7, 3]}
      renderItem={() => <MessageItem />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default MessageList;

const styles = StyleSheet.create({});
