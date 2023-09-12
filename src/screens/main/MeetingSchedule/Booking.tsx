import { StyleSheet } from "react-native";
import React from "react";
import { Box, Column, Divider, FlatList, Heading, Text } from "native-base";
import BookingTimeButton from "../../../components/BookingTimeButton";
import FormButton from "../../../components/Form/FormButton";
import { StackScreenProps } from "@react-navigation/stack";
import { MeetingStackParams } from "../../../navigations/config";

type Props = StackScreenProps<MeetingStackParams, "Booking">;

// TODO: Đổi sang profile bác sĩ
const Booking = ({navigation}: Props) => {
  return (
    <Column flex="1" bg="coolGray.700" p="4" space="4">
      <Column flex="1" space="6">
        <Column space="1">
          <Heading color="white" fontSize="xl">
            Chọn thời gian
          </Heading>
          <Text color="coolGray.400">Vui lòng chọn thời gian phù hợp cho cuộc hẹn</Text>
        </Column>
        <Column bg="coolGray.600" style={{ borderRadius: 27 }}>
          <Box bg="coolGray.500" style={styles.headerContainer} shadow={9}>
            <Heading color="white" fontSize="xl" fontWeight="semibold">
              Hôm nay
            </Heading>
          </Box>
          <FlatList
            data={["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"]}
            px="4"
            renderItem={({ item }) => <BookingTimeButton time={item} />}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <Divider bg="coolGray.400" />}
          />
        </Column>
      </Column>
      <FormButton>Tiếp</FormButton>
    </Column>
  );
};

export default Booking;

const styles = StyleSheet.create({
  headerContainer: {
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
