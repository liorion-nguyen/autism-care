import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import { Column, IStackProps, Pressable, Text } from "native-base";
import PostOwner from "../PostOwner";
import { Image } from "native-base";
import PostFooter from "../PostFooter";
import { useNavigation } from "@react-navigation/native";
import { IPost } from "../../types/posts";
import { IUserProfile } from "../../types/user";
import { onReact } from "../../types/react";
import { useAppSelector } from "../../store";
import { createNoti } from "../../types/notification";

const IMG_W = Dimensions.get("window").width;

type Props = { post: IPost } & IStackProps;

const PostCard = ({ mt, post }: Props) => {
  const navigation = useNavigation<any>();
  const { user } = useAppSelector((state) => state.user);
  function goPostDetail() {
    navigation.navigate("PostDetail", { post });
  }
  async function onReactPost() {
    await onReact(user!.phone, post.id!);
    if (!post.userReacted)
      await createNoti({
        fromUser: user!.phone,
        toUser: (post.user as IUserProfile).phone,
        content: "Đã thích bài viết của bạn",
        createdAt: new Date(),
      });
  }

  return (
    <Pressable onPress={goPostDetail}>
      <Column p="4" space="4" mt={mt} bg="coolGray.700" rounded="lg">
        <PostOwner user={post.user as IUserProfile} createdAt={post.createdAt} />
        <Text color="white" fontSize="sm" numberOfLines={4}>
          {post.content}
        </Text>
        <Column>
          {post.imageUrl && (
            <Image
              source={{ uri: post.imageUrl }}
              alt="post-image"
              rounded="lg"
              w={IMG_W}
              h={(IMG_W * 3) / 4}
            />
          )}
          <PostFooter
            onReactPost={onReactPost}
            nReact={post.react}
            nComment={post.ncomments}
            userReacted={post.userReacted}
          />
        </Column>
      </Column>
    </Pressable>
  );
};

export default PostCard;

const styles = StyleSheet.create({});
