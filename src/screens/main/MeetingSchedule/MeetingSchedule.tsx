import { Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { MeetingStackParams } from "../../../navigations/config";
import { Center, Column, Heading, Icon, Row, Text } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StackScreenProps } from "@react-navigation/stack";
import FormButton from "../../../components/Form/FormButton";
import MeetingInfo from "../../../components/MeetingInfo";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useFocusEffect } from "@react-navigation/native";
import { removeLoading, setLoading } from "../../../store/loading.reducer";
import { and, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { firebaseDb } from "../../../firebase";
import { IMeeting } from "../../../types/meeting";
import LoadingOverlay from "../../../components/LoadingOverlay";

type Props = StackScreenProps<MeetingStackParams, "MeetingSchedule">;

const MeetingSchedule = ({ navigation }: Props) => {
  const { user } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.loading);
  const [meeting, setMeeting] = useState<IMeeting | null>(null);
  const dispatch = useAppDispatch();

  useFocusEffect(
    React.useCallback(() => {
      async function loadData() {
        try {
          dispatch(setLoading());
          const meetingRef = collection(firebaseDb, "meetings");
          const q = query(meetingRef, and(where("user", "==", user!.phone)));
          const snapshots = await getDocs(q);
          if (snapshots.size) {
            const meetingDoc = snapshots.docs[0];
            const doctor = (
              await getDoc(doc(firebaseDb, "users", meetingDoc.data().doctor))
            ).data();
            setMeeting({
              ...meetingDoc.data(),
              id: meetingDoc.id,
              datetime: meetingDoc.data().datetime.toDate(),
              doctor,
            } as IMeeting);
          }
        } catch (err) {
          Alert.alert("Thông báo", (err as any).message);
        } finally {
          dispatch(removeLoading());
        }
      }
      loadData();
    }, [])
  );

  async function userCancelMeeting() {
    try {
      dispatch(setLoading());
      await updateDoc(doc(firebaseDb, "meetings", meeting!.id!), {
        avai: true,
        user: null,
        note: null,
      });
      setMeeting(null);
    } catch (err) {
      Alert.alert("Thông báo", (err as any).message);
    } finally {
      dispatch(removeLoading());
    }
  }

  function onCancel() {
    Alert.alert("Thông báo", "Bạn chắc chắn muốn hủy hẹn", [
      { text: "Xác nhận", onPress: userCancelMeeting },
      { text: "Đóng", isPreferred: true },
    ]);
  }

  return (
    <>
      {isLoading ? (
        <Column flex="1" bg="coolGray.700">
          <LoadingOverlay />
        </Column>
      ) : (
        <Column flex="1" bg="coolGray.700" p="4" space="4">
          <Column space="1">
            <Heading color="white" fontSize="xl">
              Lịch hẹn của bạn
            </Heading>
            <Text color="coolGray.400">Ngày giờ hiển thị theo giờ Việt Nam (BMT+7:00)</Text>
          </Column>
          {meeting ? (
            <MeetingInfo user={user!} meeting={meeting} onCancel={onCancel} />
          ) : (
            <>
              <Center flex={1}>
                <Icon as={Ionicons} color="coolGray.500" name="calendar" size={32} />
                <Text color="coolGray.200">Không có lịch hẹn sắp tới</Text>
              </Center>
              <FormButton
                leftIcon={<Icon as={Ionicons} name="add" color="coolGray.800" size="md" />}
                rounded="full"
                onPress={() => navigation.navigate("OurDoctors")}
              >
                Đặt lịch tư vấn từ xa
              </FormButton>
            </>
          )}
        </Column>
      )}
    </>
  );
};

export default MeetingSchedule;

const styles = StyleSheet.create({});
