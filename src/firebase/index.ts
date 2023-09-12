import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC1jWZI3yH5cxbeMMs5nsY44fA6kAnl6Kg",
  authDomain: "lgbt-app-fea12.firebaseapp.com",
  databaseURL: "https://lgbt-app-fea12-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lgbt-app-fea12",
  storageBucket: "lgbt-app-fea12.appspot.com",
  messagingSenderId: "560720405187",
  appId: "1:560720405187:web:47cbf2e1d410d74d3cf876",
  measurementId: "G-84N288JTYC",
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
export default firebaseApp;
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
