import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import { Center, HStack, Heading, Spinner } from "native-base";

const LoadingOverlay = ({ position, bg }: any) => {
  return (
    <Center flex={1} style={[styles.container, position && { position }]} bg={bg}>
      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" size="lg" />
      </HStack>
    </Center>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.15)",
    // position: "absolute",
    zIndex: 10,
    width: "100%",
    height: Dimensions.get("window").height,
  },
});
