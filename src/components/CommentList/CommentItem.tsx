import { StyleSheet } from "react-native";
import React from "react";
import { Avatar, Center, Column, Heading, Icon, Row, Text } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { IComment } from "../../types/comments";
import { IUserProfile } from "../../types/user";
import moment from "moment";

type Props = {
  comment: IComment;
};

const CommentItem = ({ comment }: Props) => {
  const user = comment.user as IUserProfile;
  return (
    <Row w="100%" space="3" mb="4">
      {user?.avatarUrl ? (
        <Avatar size="md" source={{ uri: user?.avatarUrl }} />
      ) : (
        <Center bg="white" rounded="full" w="12" h="12">
          <Ionicons name="person-outline" color="gray" size={30} />
        </Center>
      )}
      <Column flex="1">
        <Column p="3" bg="coolGray.500" rounded="2xl" space="1">
          <Row justifyContent="space-between">
            <Heading fontSize="md" color="white">
              {user.fullname}
            </Heading>
            <Text color="coolGray.300">{moment(comment.createdAt).format("DD-MM-YYYY")}</Text>
          </Row>
          <Text color="white">{comment.content}</Text>
        </Column>
        {/* <Row justifyContent="space-between" alignItems="center">
          <Row>
            <Button variant="unstyled" _text={{ color: "white" }}>
              Thích
            </Button>
            <Button variant="unstyled" _text={{ color: "white" }}>
              Phản hồi
            </Button>
          </Row>
          <Row space="1">
            <Text color="red.400">299</Text>
            <Icon size="lg" as={Ionicons} name="heart" color="red.400" />
          </Row>
        </Row> */}
      </Column>
    </Row>
  );
};

export default CommentItem;

const styles = StyleSheet.create({});
