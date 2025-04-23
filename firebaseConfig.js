import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfGcoVkigfHR0eMQz7bwB0ktdVx3KfOxo",

  authDomain: "health-app-de437.firebaseapp.com",

  projectId: "health-app-de437",

  storageBucket: "health-app-de437.firebasestorage.app",

  messagingSenderId: "679631654559",

  appId: "1:679631654559:web:703bc727d62925abce9caa",

  measurementId: "G-N575JCRHVK"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth };