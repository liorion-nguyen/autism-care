import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Use this import
import Document from '../screens/main/Document';
import PDFViewer from '../components/PdfView';
import { DocumentStackParams } from './config';

const Stack = createNativeStackNavigator<DocumentStackParams>(); 

function DocumentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Document" component={Document} />
      <Stack.Screen name="PDFViewer" component={PDFViewer} />
    </Stack.Navigator>
  );
}

export default DocumentStack;