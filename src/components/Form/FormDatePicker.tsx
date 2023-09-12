import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Box, Column, FormControl, Text } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";

type Props = {
  value: Date;
  onChange: (value: Date) => void;
};

const FormDatePicker = ({ value, onChange }: Props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onChange(date);
    hideDatePicker();
  };

  return (
    <>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Column>
        <FormControl.Label _text={{ color: "primary.600", fontWeight: "medium" }}>
          Ngày sinh
        </FormControl.Label>
        <TouchableOpacity onPress={showDatePicker}>
          <Box bg="coolGray.500" px="3" py="3" rounded="full" shadow="8">
            <Text color="white" fontWeight="medium">
              {moment(value).format("DD - MM - YYYY")}
            </Text>
          </Box>
        </TouchableOpacity>
      </Column>
    </>
  );
};

export default FormDatePicker;

const styles = StyleSheet.create({});
