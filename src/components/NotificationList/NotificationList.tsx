import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Divider, FlatList } from "native-base";
import NotificationItem from "./NotificationItem";
import { INotification } from "../../types/notification";

type Props = {
  data?: INotification[];
};

const NotificationList = ({ data = [] }: Props) => {
  return (
    <FlatList
      px="6"
      data={data}
      renderItem={({ item }) => <NotificationItem data={item} />}
      // ItemSeparatorComponent={() => <Divider bg="coolGray.400" />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default NotificationList;

const styles = StyleSheet.create({});
