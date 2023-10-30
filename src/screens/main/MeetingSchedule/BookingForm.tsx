import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Column, Input } from "native-base";
import FormButton from "../../../components/Form/FormButton";
import { StackScreenProps } from "@react-navigation/stack";
import { MeetingStackParams } from "../../../navigations/config";
import { useAppDispatch, useAppSelector } from "../../../store";
import FormSelect from "../../../components/Form/FormSelect";
import { removeLoading, setLoading } from "../../../store/loading.reducer";
import { and, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { firebaseDb } from "../../../firebase";
import { IMeeting } from "../../../types/meeting";

type Props = StackScreenProps<MeetingStackParams, "BookingForm">;

const BookingForm = ({ navigation, route }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const { doctor } = route.params;

  const [meetingSchedule, setMeetingSchedule] = useState<IMeeting[]>([]);
  const [note, setNote] = useState("");
  const [selectMeeting, setSelectMeeting] = useState("");

  useEffect(() => {
    async function loadSchedule() {
      try {
        dispatch(setLoading());
        const meetingRef = collection(firebaseDb, "meetings");
        const q = query(
          meetingRef,
          and(where("doctor", "==", doctor.phone), where("avai", "==", true))
        );
        const snapshots = await getDocs(q);
        const meetingLoaded = snapshots.docs.map(
          (meetingDoc) =>
            ({
              ...meetingDoc.data(),
              id: meetingDoc.id,
              datetime: meetingDoc.data().datetime.toDate(),
            } as IMeeting)
        );
        console.log(meetingLoaded);

        setMeetingSchedule(meetingLoaded);
      } catch (err) {
        Alert.alert("Thông báo", (err as any).message);
      } finally {
        dispatch(removeLoading());
      }
    }

    loadSchedule();
  }, []);

  async function onSave() {
    try {
      dispatch(setLoading());
      const meetingDoc = doc(firebaseDb, "meetings", selectMeeting);
      await updateDoc(meetingDoc, {
        user: user?.phone,
        note,
        avai: false,
      });
      navigation.navigate("MeetingSchedule");
    } catch (err) {
      Alert.alert("Thông báo", (err as any).message);
      dispatch(removeLoading());
    }
  }

  function onBookMeeting() {
    Alert.alert("Thông báo", `Bạn muốn đặt lịch với ${doctor.degree} ${doctor.fullname}`, [
      { text: "Xác nhận", onPress: onSave },
      { text: "Hủy" },
    ]);
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Column flex="1" bg="coolGray.700" px="5" py="4">
        <Column space="5" flex="1">
          <FormSelect label="Lịch hẹn" items={meetingSchedule} onValueChange={setSelectMeeting} />
          <Input
            _focus={{ bg: "coolGray.700" }}
            borderWidth={0.2}
            placeholder="Bạn đang mong muốn điều gì?"
            h="32"
            color="white"
            multiline
            textAlignVertical="top"
            value={note}
            onChangeText={setNote}
          />
        </Column>
        <FormButton onPress={onBookMeeting} disabled={!selectMeeting.length}>
          Đặt lịch
        </FormButton>
      </Column>
    </TouchableWithoutFeedback>
  );
};

export default BookingForm;

const styles = StyleSheet.create({});
