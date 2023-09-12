import { Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Avatar, Center, Column, Divider, Heading, IconButton, Row } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import PostList from "../../../components/PostList/PostList";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParams } from "../../../navigations/config";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { IPost, getPosts } from "../../../types/posts";
import { removeLoading, setLoading } from "../../../store/loading.reducer";
import LoadingOverlay from "../../../components/LoadingOverlay";

type Props = {} & StackScreenProps<HomeStackParams, "Home">;

const iconBtnProps = {
  variant: "solid",
  rounded: "full",
  bg: "white",
  size: "sm",
};
const Home = ({ navigation }: Props) => {
  const { user } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [refresh, setRefresh] = useState(true);
  const focused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      async function loadData() {
        try {
          dispatch(setLoading());
          const allPosts = await getPosts(user!.phone);
          setPosts(allPosts);
        } catch (err) {
          Alert.alert("Thông báo", (err as any).message);
        } finally {
          dispatch(removeLoading());
        }
      }
      if (focused && refresh) loadData();
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
    <Column flex="1" bg="coolGray.700" safeAreaTop>
      <Row alignItems="center" space="3" px="4" mb="4" mt="1">
        {user?.avatarUrl ? (
          <Avatar size="md" source={{ uri: user?.avatarUrl }} />
        ) : (
          <Center bg="white" rounded="full" w="12" h="12">
            <Ionicons name="person-outline" color="gray" size={24} />
          </Center>
        )}
        <Row flex="1">
          <Heading color="white" fontSize="xl">
            {user?.fullname}
          </Heading>
        </Row>
        <Row space="2">
          <IconButton
            {...iconBtnProps}
            _icon={{
              as: Ionicons,
              name: "add",
              color: "#373737",
            }}
            onPress={() => navigation.navigate("WritePost")}
          />
          <IconButton
            {...iconBtnProps}
            _icon={{
              as: Ionicons,
              name: "search-outline",
              color: "#373737",
            }}
          />
        </Row>
      </Row>
      <Divider bg="coolGray.400" h={0.3} />
      {isLoading ? <LoadingOverlay /> : <PostList data={posts} />}
    </Column>
  );
};

export default Home;

const styles = StyleSheet.create({});
