import { Stack } from "expo-router";
import { useState } from "react";
import UnitsToggle from "@/components/UnitsToggle";
import { darkTheme } from "@/themes/DarkTheme";
import { lightTheme } from "@/themes/LightTheme";
import { UnitsProvider } from "@/components/UnitsContext";
import { ThemeContext } from "@/contexts/ThemeContext";
import { ChartFilterProvider } from "@/contexts/ChartFilterContext";

export default function RootLayout() {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  const headerStyle = {
    backgroundColor: theme.colors.tertiary,
    elevation: 10,
  };

  const headerTitleStyle = {
    color: theme.colors.textColor,
  };

  return (
    <ThemeContext.Provider value={theme}>
      <UnitsProvider>
        <ChartFilterProvider>
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
        </ChartFilterProvider>
      </UnitsProvider>
    </ThemeContext.Provider>
  );
}
