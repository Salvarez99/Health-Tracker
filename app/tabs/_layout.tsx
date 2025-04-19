import UnitsToggle from "@/components/UnitsToggle"
import { ThemeContext } from "@/contexts/ThemeContext"
import { MaterialIcons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import React, { useContext } from "react"
import SearchIcon from "../../components/SearchIcon"

export default function TabsLayout() {
  const theme = useContext(ThemeContext)

  const headerStyle = {
    backgroundColor: theme.colors.tertiary,
    elevation: 10,
  }

  const headerTitleStyle = {
    color: theme.colors.textColor,
  }

  return (
    <Tabs
      initialRouteName="graphScreen"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.textColor,
        tabBarStyle: { backgroundColor: theme.colors.tertiary },
      }}
    >
      <Tabs.Screen
        name="graphScreen"
        options={{
          title: "Graph",
          headerRight: () => <UnitsToggle />,
          headerStyle,
          headerTitleStyle,
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="show-chart" size={size} color={color} />
          ),
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
    </Tabs>
  )
}
