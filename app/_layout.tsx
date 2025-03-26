import { ThemeContext } from "@/contexts/ThemeContext"
import { UserPreferencesProvider } from "@/contexts/UserPreferencesContext"
import { store } from "@/services/store"
import { darkTheme } from "@/themes/DarkTheme"
import { lightTheme } from "@/themes/LightTheme"
import { Tabs } from "expo-router"
import React, { useEffect, useState } from "react"
import { Provider } from "react-redux"
import UnitsToggle from "../components/UnitsToggle"
import * as Local from "../localDB/InitializeLocal"

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
    getUserPrefs()
  }, [])

  return (
    <Provider store={store}>
      <UserPreferencesProvider>
        <ThemeContext.Provider value={theme}>
          <Tabs
            screenOptions={{
              headerStyle,
              headerTitleStyle,
              tabBarActiveTintColor: theme.colors.textColor,
              tabBarStyle: { backgroundColor: theme.colors.tertiary },
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                headerRight: () => <UnitsToggle />,
                title: "Weight Tracker",
              }}
            />
            <Tabs.Screen
              name="search"
              options={{
                title: "Search",
              }}
            />
          </Tabs>
        </ThemeContext.Provider>
      </UserPreferencesProvider>
    </Provider>
  )
}
