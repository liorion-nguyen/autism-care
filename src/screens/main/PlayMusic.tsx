import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Box, Button, Center, Heading, Icon } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Audio } from "expo-av";

const PlayMusic = () => {
  const [audio, setAudio] = React.useState<Audio.Sound | null>();
  const [playing, setPlaying] = useState(false);

  async function playSound() {
    try {
      if (!audio) {
        const { sound } = await Audio.Sound.createAsync(require("../../../assets/test.mp3"), {
          isLooping: true,
        });
        setAudio(sound);
        await sound.playAsync();
      } else {
        await audio!.playAsync();
      }
      setPlaying(true);
    } catch (err) {
      console.error(err);
      Alert.alert("Thông báo", "Lỗi không thể phát audio!");
    }
  }

  async function pauseSound() {
    try {
      if (playing) {
        await audio!.pauseAsync();
        setPlaying(false);
      }
    } catch (err) {
      Alert.alert("Thông báo", "Lỗi không thể phát audio!");
    }
  }
  function onPlay() {
    if (playing) {
      pauseSound();
    } else {
      playSound();
    }
  }

  React.useEffect(() => {
    return audio
      ? () => {
          console.log("Unloading Sound");
          audio.unloadAsync();
        }
      : undefined;
  }, [audio]);

  return (
    <Center flex="1" bg="coolGray.700">
      <Heading color="coolGray.200" mb="8">
        Hãy thư giãn nhé!
      </Heading>
      <Center w="64" h="64" rounded="full" bg="coolGray.900">
        <Center w="24" h="24" bg="coolGray.700" rounded="full" shadow="8">
          <TouchableOpacity onPress={onPlay}>
            {!playing ? (
              <Icon as={Ionicons} name="play" size="3xl" color="white" />
            ) : (
              <Icon as={Ionicons} name="pause" size="3xl" color="white" />
            )}
          </TouchableOpacity>
        </Center>
      </Center>
    </Center>
  );
};

export default PlayMusic;

const styles = StyleSheet.create({});
