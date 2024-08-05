import { UnitsProvider } from "@/components/UnitsContext";
import UnitsToggle from "@/components/UnitsToggle";
import { Stack } from "expo-router";
import { ThemeContext } from "@/contexts/ThemeContext";
import { darkTheme } from "@/themes/DarkTheme";
import { lightTheme } from "@/themes/LightTheme";

export default function RootLayout() {
  return (
    <UnitsProvider>
      <ThemeContext.Provider value={darkTheme}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerRight: () => <UnitsToggle /> }}
          />
          <Stack.Screen
            name="record/[date]"
            options={{
              title: "Record Weight",
              headerStyle: {},
            }}
          />
        </Stack>
      </ThemeContext.Provider>
    </UnitsProvider>
  );
}
