import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  Document: undefined;
  PDFViewer: {
    url: string;
  };
};
type Props = StackScreenProps<RootStackParamList, 'PDFViewer'>;

const PDFViewer = ({ route }: Props) => {
  const { url } = route.params;
  console.log(url);
  
  return (
    <View style={styles.container}>
      {/* <WebView source={{ uri: url, cache: true }} style={styles.webview} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default PDFViewer;
