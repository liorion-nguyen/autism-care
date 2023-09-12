import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CheckIcon, FormControl, IFormControlProps, ISelectProps, Select } from "native-base";
import { IMeeting } from "../../types/meeting";
import moment from "moment";

const DefaultSelectProps: ISelectProps = {
  height: "12",
  _selectedItem: {
    bg: "primary.100",
    endIcon: <CheckIcon size="3" />,
  },
  _item: {
    _pressed: { backgroundColor: "primary.100" },
  },
  _actionSheetBody: { scrollEnabled: false },
  rounded: "lg",
  fontSize: "sm",
  _text: { color: "white" },
  color: "white",
};

export type SelectItem = {
  id: string;
  label: string;
};

type Props = {
  label?: string;
  items?: IMeeting[];
  _stack?: IFormControlProps;
} & ISelectProps;

const FormSelect = (props: Props) => {
  const { label, _stack, items, ...selectProps } = props;

  return (
    <FormControl {..._stack}>
      {label && (
        <FormControl.Label _text={{ color: "primary.600", fontWeight: "medium" }}>
          {label}
        </FormControl.Label>
      )}
      <Select {...DefaultSelectProps} placeholder="Chọn thời gian" {...selectProps}>
        {items?.map((item) => (
          <Select.Item
            key={item.id}
            _stack={{justifyContent: "center"}}
            label={moment(item.datetime).format("DD-MM-YYYY hh:mm")}
            value={item.id!}
          />
        ))}
      </Select>
    </FormControl>
  );
};

export default React.memo(FormSelect);

const styles = StyleSheet.create({});
