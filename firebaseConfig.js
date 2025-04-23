// firebaseConfig.js
import AsyncStorage from "@react-native-async-storage/async-storage"
import { initializeApp } from "firebase/app"
import { getReactNativePersistence, initializeAuth } from "firebase/auth"

// Your Firebase configuration (Replace these with your own project's config)

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_X_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_X_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_X_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_X_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_X_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_X_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_X_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase App
const app = initializeApp(firebaseConfig)

// Initialize Firebase Auth with persistence for React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

// Export initialized app and auth instances
export { app, auth }
