import { ThemeContext } from "@/contexts/ThemeContext";
import { UserPreferencesProvider } from "@/contexts/UserPreferencesContext";
import { store } from "@/services/store";
import { darkTheme } from "@/themes/DarkTheme";
import { lightTheme } from "@/themes/LightTheme";
import { Stack, Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import * as Local from "../localDB/InitializeLocal";

// import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
// import { initializeApp } from "firebase/app";
import { auth } from "@/firebaseConfig"

export default function RootLayout() {
  const [theme, setTheme] = useState(lightTheme);

  const headerStyle = {
    backgroundColor: theme.colors.tertiary,
    elevation: 10,
  };

  const headerTitleStyle = {
    color: theme.colors.textColor,
  };

  const getUserPrefs = async () => {
    const user = await Local.fetchUserPrefs();
    console.log("User theme mode:", user.theme_mode);
    if (user.theme_mode === "dark") {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in:", user.email);
      } else {
        console.log("No user is signed in.");
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <UserPreferencesProvider>
        <ThemeContext.Provider value={theme}>
          <Stack
            initialRouteName="index"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" options={{}} />
            <Stack.Screen name="tabs" options={{}} />
          </Stack>
        </ThemeContext.Provider>
      </UserPreferencesProvider>
    </Provider>
  );
}
