import { Alert, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabsParams } from "../../navigations/config";
import { Column } from "native-base";
import NotificationList from "../../components/NotificationList/NotificationList";
import { useFocusEffect } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../store";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import LoadingOverlay from "../../components/LoadingOverlay";
import { INotification, getAllNoti } from "../../types/notification";
import * as Notifications from "expo-notifications";
import { setNoti } from "../../store/notification.reducer";

type Props = BottomTabScreenProps<BottomTabsParams, "Notification">;

const Notification = ({ navigation }: Props) => {
  // const { colors } = useTheme();
  const { isLoading } = useAppSelector((state) => state.loading);
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loaded, setLoaded] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      function loadData() {
        try {
          dispatch(setLoading());
          const unsubcribe = getAllNoti(user!.phone, setNotifications);
          setLoaded(true);
          return () => unsubcribe();
        } catch (err) {
          Alert.alert("Thông báo", (err as any).message);
        } finally {
          dispatch(removeLoading());
        }
      }
      loadData();
    }, [])
  );

  useEffect(() => {
    if (loaded) {
      dispatch(setNoti());
    }
  }, [notifications, loaded]);

  return (
    <Column bg="coolGray.700" flex="1">
      {/* <Center flex="1">
        <Icon as={Ionicons} color="coolGray.500" name="notifications-outline" size={24} />
        <Text color="coolGray.300" mt="2">
          Không có thông báo nào
        </Text>
      </Center> */}
      {isLoading ? <LoadingOverlay /> : <NotificationList data={notifications} />}
    </Column>
  );
};

export default Notification;

const styles = StyleSheet.create({});
