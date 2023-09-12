import { Alert, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Column, Divider, Icon, IconButton, Image, Row, Text, ScrollView } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import PostFooter from "../../../components/PostFooter";
import CommentItem from "../../../components/CommentList/CommentItem";
import FormInput from "../../../components/Form/FormInput";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParams } from "../../../navigations/config";
import PostOwner from "../../../components/PostOwner";
import { IUserProfile } from "../../../types/user";
import { onReact } from "../../../types/react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useFocusEffect } from "@react-navigation/native";
import { removeLoading, setLoading } from "../../../store/loading.reducer";
import { IComment, getAllComments } from "../../../types/comments";
import { addDoc, collection } from "firebase/firestore";
import { firebaseDb } from "../../../firebase";
import { createNoti } from "../../../types/notification";

const IMG_W = Dimensions.get("window").width;

type Props = StackScreenProps<HomeStackParams, "PostDetail">;

const PostDetail = ({ navigation, route }: Props) => {
  const { post } = route.params;
  const [comments, setComments] = useState<IComment[]>([]);
  const [userComment, setUserComment] = useState("");
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  async function onReactPost() {
    await onReact(user!.phone, post.id!);
    if (!post.userReacted)
      await createNoti({
        fromUser: user!.phone,
        toUser: post.user.phone,
        content: "Đã thích bài viết của bạn",
        createdAt: new Date(),
      });
  }

  useFocusEffect(
    React.useCallback(() => {
      function loadData() {
        try {
          dispatch(setLoading());
          const unsubcribe = getAllComments(post.id!, setComments);
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

  async function onSendComment() {
    try {
      dispatch(setLoading());
      const commentRef = collection(firebaseDb, "comments");
      const newCommentData: IComment = {
        content: userComment,
        createdAt: new Date(),
        user: user!.phone,
        post: post.id!,
      };
      const cmtDoc = await addDoc(commentRef, newCommentData);
      await createNoti({
        fromUser: user!.phone,
        toUser: post.user.phone,
        content: "Đã bình luận trong bài viết của bạn",
        createdAt: new Date(),
      });
      setComments([
        {
          ...newCommentData,
          user: user!,
          id: cmtDoc.id,
        },
        ...comments,
      ]);
      setUserComment("");
    } catch (err) {
      Alert.alert("Thông báo", (err as any).message);
    } finally {
      dispatch(removeLoading());
    }
  }

  return (
    <Column bg="coolGray.700" flex="1" safeAreaTop pt="2">
      <Row w="100%" px="2" pr="3" mb="4" space="2">
        <IconButton
          onPress={() => navigation.goBack()}
          variant="variant"
          p="0"
          icon={<Icon size="xl" as={Ionicons} name="chevron-back" color="white" />}
        />
        <PostOwner
          user={post.user as IUserProfile}
          createdAt={post.createdAt}
          _stack={{ flex: "1" }}
        />
      </Row>
      <Divider bg="coolGray.300" style={{ height: 0.3 }} />
      <ScrollView flex="1" px="4">
        <Column mt="4">
          <Text color="white" mb="4">
            {post.content}
          </Text>
          {post.imageUrl && (
            <Image
              source={{ uri: post.imageUrl }}
              alt="post-image"
              rounded="2xl"
              w={IMG_W}
              h={IMG_W}
            />
          )}
          <PostFooter
            onReactPost={onReactPost}
            nReact={post.react}
            nComment={comments.length}
            userReacted={post.userReacted}
          />
        </Column>
        <Divider my="4" bg="coolGray.300" />
        <Column>
          {comments.map((comment) => (
            <CommentItem comment={comment} key={comment.id!} />
          ))}
        </Column>
      </ScrollView>
      <Divider bg="coolGray.500" />
      <Row p="2" space="4">
        <FormInput
          shadow="0"
          _stack={{ flex: 1 }}
          placeholder="Bình luận"
          value={userComment}
          onChangeText={setUserComment}
        />
        <IconButton
          variant="unstyled"
          icon={
            <Icon
              size="xl"
              as={Ionicons}
              name="send"
              color={userComment.length === 0 ? "muted.500" : "primary.600"}
            />
          }
          onPress={onSendComment}
          disabled={userComment.length === 0}
        />
      </Row>
    </Column>
  );
};

export default PostDetail;

const styles = StyleSheet.create({});
