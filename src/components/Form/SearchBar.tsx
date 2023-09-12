import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FormInput from "./FormInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Icon } from "native-base";

const SearchBar = () => {
  return (
    <FormInput
      bg="coolGray.500"
      shadow="2"
      placeholder="Tìm kiếm"
      leftElement={
        <Icon ml="3" as={Ionicons} name="search-outline" size="md" color="coolGray.400" />
      }
    />
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
