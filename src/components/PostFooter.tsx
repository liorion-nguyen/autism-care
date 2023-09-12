import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Icon, Row, Text } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  nReact?: number;
  nComment?: number;
  userReacted?: boolean;
  onReactPost: () => Promise<void>;
};

const PostFooter = ({ onReactPost, nReact = 0, userReacted = false, nComment = 0 }: Props) => {
  const [like, setLike] = useState(userReacted);
  const [react, setReact] = useState(nReact);

  async function onReactPress() {
    try {
      if (like) {
        setReact(react - 1);
      } else {
        setReact(react + 1);
      }
      setLike(!like);
      await onReactPost();
    } catch (err) {
      console.error(err);
    } finally {
    }
  }

  return (
    <Row alignItems="center" mt="3">
      <Row alignItems="center" flex="1" space="1">
        <TouchableOpacity onPress={onReactPress}>
          <Icon
            size="lg"
            as={Ionicons}
            name={like ? "heart" : "heart-outline"}
            color={like ? "red.400" : "coolGray.300"}
          />
        </TouchableOpacity>
        <Text color={like ? "red.400" : "coolGray.300"} fontSize="md">
          {react}
        </Text>
      </Row>
      <Text color="coolGray.300" fontSize="md">
        {nComment} bình luận
      </Text>
    </Row>
  );
};

export default PostFooter;
