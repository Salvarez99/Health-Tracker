import { ThemeContext } from "@/contexts/ThemeContext";
import { UserPreferencesProvider } from "@/contexts/UserPreferencesContext";
import { store } from "@/services/store";
import { darkTheme } from "@/themes/DarkTheme";
import { lightTheme } from "@/themes/LightTheme";
import { Stack, Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import * as Local from "../localDB/InitializeLocal";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";

export default function RootLayout() {
  const [theme, setTheme] = useState(lightTheme);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

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

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log("User state changed:", user);
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    getUserPrefs();

    return subscriber; // unsubscribe on unmount
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
