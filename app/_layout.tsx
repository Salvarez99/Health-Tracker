import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import UnitsToggle from "@/components/UnitsToggle";
import { darkTheme } from "@/themes/DarkTheme";
import { lightTheme } from "@/themes/LightTheme";
import { ThemeContext } from "@/contexts/ThemeContext";
import * as Local from "../localDB/InitializeLocal";
import { UserPreferencesProvider } from "@/contexts/UserPreferencesContext";

export default function RootLayout() {
  // const [userThemePref, setUserThemePref] = useState("light");
  const [theme, setTheme] = useState(lightTheme);
  // const [isLoading, setIsLoading] = useState(true);

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

  return (
    <UserPreferencesProvider>
      <ThemeContext.Provider value={lightTheme}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerRight: () => <UnitsToggle />,
              title: "Index",
              headerStyle: headerStyle,
              headerTitleStyle: headerTitleStyle,
            }}
          />
          <Stack.Screen
            name="record/[date]"
            options={{
              title: "Record Weight",
              headerStyle: headerStyle,
              headerTitleStyle: headerTitleStyle,
            }}
          />
        </Stack>
      </ThemeContext.Provider>
    </UserPreferencesProvider>
  );
}
