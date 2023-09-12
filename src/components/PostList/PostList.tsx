import { StyleSheet } from "react-native";
import React from "react";
import { FlatList } from "native-base";
import PostCard from "./PostCard";
import { IPost } from "../../types/posts";

type Props = {
  data: IPost[];
};

const PostList = ({ data }: Props) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => <PostCard post={item} mt={index === 0 ? "0" : "2"} />}
      // ItemSeparatorComponent={() => <Divider py="1" bg="coolGray.800" />}
      bg="coolGray.800"
      showsVerticalScrollIndicator={false}
      px="2"
      py="3"
    />
  );
};

export default PostList;

const styles = StyleSheet.create({});
