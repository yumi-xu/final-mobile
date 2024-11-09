import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

//Your web app's Firebase configuration.
//Copy this object from Firebase console
const {
  EXPO_PUBLIC_apikey,
  EXPO_PUBLIC_authDomain,
  EXPO_PUBLIC_projectId,
  EXPO_PUBLIC_storageBucket,
  EXPO_PUBLIC_messagingSenderId,
  EXPO_PUBLIC_appId,
} = process.env;

const firebaseConfig = {
  apiKey: EXPO_PUBLIC_apikey,
  authDomain: EXPO_PUBLIC_authDomain,
  projectId: EXPO_PUBLIC_projectId,
  storageBucket: EXPO_PUBLIC_storageBucket,
  messagingSenderId: EXPO_PUBLIC_messagingSenderId,
  appId: EXPO_PUBLIC_appId,
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
