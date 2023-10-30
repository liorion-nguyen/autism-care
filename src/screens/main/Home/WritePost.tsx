import {
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Column, Input, useTheme, Image, ScrollView, Center } from "native-base";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParams } from "../../../navigations/config";
import Ionicons from "@expo/vector-icons/Ionicons";
import FormButton from "../../../components/Form/FormButton";
import * as ImagePicker from "expo-image-picker";
import { removeLoading, setLoading } from "../../../store/loading.reducer";
import { useAppDispatch, useAppSelector } from "../../../store";
import { uploadImage } from "../../../utils/image";
import { addDoc, collection } from "firebase/firestore";
import { firebaseDb } from "../../../firebase";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { IPost } from "../../../types/posts";

type Props = {} & StackScreenProps<HomeStackParams, "WritePost">;

const IMG_W = Dimensions.get("window").width * 0.7;

const WritePost = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const { isLoading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (!status || !status.granted) requestPermission();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.05,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  async function onPost() {
    try {
      dispatch(setLoading());
      if (content.length === 0) throw Error("Bạn cần viết nội dung chia sẻ");
      let imageName, imageUrl;
      if (image) {
        const result = await uploadImage(image);
        imageName = result.imageName;
        imageUrl = result.imageUrl;
      }
      const docData: IPost = {
        user: user!.phone,
        content,
        createdAt: new Date().toISOString(),
      };
      if (imageUrl) {
        docData["imageUrl"] = imageUrl;
      }
      await addDoc(collection(firebaseDb, "posts"), docData);

      navigation.navigate("Home");
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(removeLoading());
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: { backgroundColor: colors.coolGray[700] },
      headerTintColor: "white",
      headerBackTitleVisible: false,
      title: "Bài viết mới",
      headerRight: () => (
        <TouchableOpacity style={{ paddingHorizontal: 8 }} onPress={pickImage}>
          <Ionicons name="image-outline" color="white" size={24} />
        </TouchableOpacity>
      ),
    });
  }, []);

  if (isLoading)
    return (
      <Center flex={1} bg="coolGray.700">
        <LoadingOverlay />
      </Center>
    );
  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView bg="coolGray.700" flex="1" showsVerticalScrollIndicator={false}>
          <Column bg="coolGray.700" p="4" space="8" flex="1">
            <Input
              _focus={{ bg: "coolGray.700" }}
              borderWidth={0.2}
              placeholder="Bạn đang nghĩ gì?"
              w="100%"
              h="64"
              color="white"
              multiline
              value={content}
              onChangeText={setContent}
            />
            {image && (
              <Center>
                <Image source={{ uri: image }} alt="post-image" rounded="2xl" w={IMG_W} h={IMG_W} />
              </Center>
            )}
            <FormButton onPress={onPost}>Chia sẻ</FormButton>
          </Column>
        </ScrollView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default WritePost;

const styles = StyleSheet.create({});
