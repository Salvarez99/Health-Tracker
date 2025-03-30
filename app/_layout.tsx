import { ThemeContext } from "@/contexts/ThemeContext";
import { UserPreferencesProvider } from "@/contexts/UserPreferencesContext";
import { store } from "@/services/store";
import { darkTheme } from "@/themes/DarkTheme";
import { lightTheme } from "@/themes/LightTheme";
import { Stack, Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
// import UnitsToggle from "../components/UnitsToggle";
import * as Local from "../localDB/InitializeLocal";

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
    getUserPrefs();
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
