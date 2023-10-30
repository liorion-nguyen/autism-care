import { Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Column } from "native-base";
import { StackScreenProps } from "@react-navigation/stack";
import { HistoryStackParams } from "../../navigations/config";
import PostList from "../../components/PostList/PostList";
import { useAppDispatch, useAppSelector } from "../../store";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { where } from "firebase/firestore";
import { IPost, getPosts } from "../../types/posts";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import LoadingOverlay from "../../components/LoadingOverlay";

type Props = StackScreenProps<HistoryStackParams, "History">;

const History = ({ navigation }: Props) => {
  const { user } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [refresh, setRefresh] = useState(true);
  const focused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      async function loadPosts() {
        try {
          dispatch(setLoading());
          const ownPosts = await getPosts(user!.phone, where("user", "==", user?.phone));
          setPosts(ownPosts);
        } catch (err) {
          Alert.alert("Thông báo", (err as any).message);
        } finally {
          dispatch(removeLoading());
          setRefresh(false);
        }
      }

      if (focused && refresh) loadPosts();
    }, [focused])
  );

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      // Do something when the screen blurs
      setRefresh(true);
      setPosts([]);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Column flex="1" bg="coolGray.700">
      {isLoading ? <LoadingOverlay /> : <PostList data={posts} />}
    </Column>
  );
};

export default History;

const styles = StyleSheet.create({});
