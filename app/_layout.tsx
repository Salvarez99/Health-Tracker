import { ThemeContext } from "@/contexts/ThemeContext"
import { UserPreferencesProvider } from "@/contexts/UserPreferencesContext"
import { darkTheme } from "@/themes/DarkTheme"
import { lightTheme } from "@/themes/LightTheme"
import { Stack } from "expo-router"
import React, { useState } from "react"
import UnitsToggle from "../components/UnitsToggle"
import * as Local from "../localDB/InitializeLocal"

export default function RootLayout() {
  const [theme, setTheme] = useState(lightTheme)

  const headerStyle = {
    backgroundColor: theme.colors.tertiary,
    elevation: 10,
  }

  const headerTitleStyle = {
    color: theme.colors.textColor,
  }

  const getUserPrefs = async () => {
    const user = await Local.fetchUserPrefs()
    console.log("User theme mode:", user.theme_mode)
    if (user.theme_mode === "dark") {
      setTheme(darkTheme)
    } else {
      setTheme(lightTheme)
    }
  }

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
  )
}
