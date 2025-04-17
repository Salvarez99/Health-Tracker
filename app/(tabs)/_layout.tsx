import { MaterialIcons } from "@expo/vector-icons"
import { Tabs, useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import SearchIcon from "../../components/SearchIcon"
import UnitsToggle from "../../components/UnitsToggle"
import * as Local from "../../localDB/InitializeLocal"
import { darkTheme } from "../../themes/DarkTheme"
import { lightTheme } from "../../themes/LightTheme"

// Layout
const index = () => {
  const router = useRouter()
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

  useEffect(() => {
    getUserPrefs()
  }, [])
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerStyle,
        headerTitleStyle,
        tabBarActiveTintColor: theme.colors.textColor,
        tabBarStyle: { backgroundColor: theme.colors.tertiary },
      }}
      sceneContainerStyle={headerStyle}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Graph",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="timeline" size={size} color={color} />
          ),
          headerRight: () => <UnitsToggle />,
        }}
      />
      <Tabs.Screen
        name="mealplan"
        options={{
          title: "Meal Plan",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="library-books" color={color} size={size} />
          ),
          headerRight: () => <SearchIcon />,
        }}
      />
      {/* <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      /> */}
    </Tabs>
  )
}

export default index
