import { UnitsProvider } from "@/components/UnitsContext";
import UnitsToggle from "@/components/UnitsToggle";
import { Stack } from "expo-router";
import { ThemeContext } from "@/contexts/ThemeContext";
import { darkTheme } from "@/themes/DarkTheme";
import { lightTheme } from "@/themes/LightTheme";
import { useState } from "react";

export default function RootLayout() {
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? darkTheme : lightTheme;

  const headerStyle = {
    backgroundColor: theme.colors.headerColor,
  };

  const headerTitleStyle = {
    color: theme.colors.textColor,
  };

  return (
    <ThemeContext.Provider value={theme}>
      <UnitsProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerRight: () => <UnitsToggle />,
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
      </UnitsProvider>
    </ThemeContext.Provider>
  );
}
