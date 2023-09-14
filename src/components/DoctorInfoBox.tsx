import { StyleSheet } from "react-native";
import React from "react";
import { Column, Divider, Heading, Text } from "native-base";

type Props = {
  title: string;
  contents: string[];
};

const DoctorInfoBox = ({ title, contents }: Props) => {
  return (
    <Column borderWidth={0.3} py="3" borderColor="coolGray.200" rounded="lg">
      <Heading color="white" size="sm" px="3">
        {title}
      </Heading>
      <Divider h={0.3} my="3" />
      <Column px="3">
        {contents.map((text) => (
          <Text color="white">{text}</Text>
        ))}
      </Column>
    </Column>
  );
};

export default DoctorInfoBox;

const styles = StyleSheet.create({});
