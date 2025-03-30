import React, { useContext } from "react";
import { Tabs } from "expo-router";
import UnitsToggle from "@/components/UnitsToggle";
import { ThemeContext } from "@/contexts/ThemeContext";
import { MaterialIcons, FontAwesome, Feather } from "@expo/vector-icons";

export default function TabsLayout() {
  const theme = useContext(ThemeContext);

  const headerStyle = {
    backgroundColor: theme.colors.tertiary,
    elevation: 10,
  };

  const headerTitleStyle = {
    color: theme.colors.textColor,
  };

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
        name="search"
        options={{
          title: "Search",
          headerStyle,
          headerTitleStyle,
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Feather
              name="search"
              size={20}
              color="black"
              style={{ marginLeft: 1 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="record/[date]"
        options={{
          title: "Record Weight",
          headerStyle,
          headerTitleStyle,
          headerShown: true,
          href: null,
        }}
      />
    </Tabs>
  );
}
