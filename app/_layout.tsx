import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import UnitsToggle from "@/components/UnitsToggle";
import { darkTheme } from "@/themes/DarkTheme";
import { lightTheme } from "@/themes/LightTheme";
import { UnitsProvider } from "@/components/UnitsContext";
import { ThemeContext } from "@/contexts/ThemeContext";
import { ChartFilterProvider } from "@/contexts/ChartFilterContext";
import * as Local from "../localDB/InitializeLocal";
import { useTheme } from "@react-navigation/native";

export default function RootLayout() {
  const [userThemePref, setUserThemePref] = useState("light");
  const [theme, setTheme] = useState(lightTheme);
  const [isLoading, setIsLoading] = useState(true);

  const headerStyle = {
    backgroundColor: theme.colors.tertiary,
    elevation: 10,
  };

  const headerTitleStyle = {
    color: theme.colors.textColor,
  };

  const getUserPrefs = async () => {
    const user = await Local.fetchUserPrefs();
    setUserThemePref(user.theme_mode);
    // Set theme based on user preference
    if (user.theme_mode === "dark") {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  };

  useEffect(() => {
    try{
      Local.createUserPrefs();
      getUserPrefs(); // Fetch and apply user preferences
      console.log("Theme Preference: " + userThemePref)
      
    }catch(error){
      console.error("Failed to load preferences", error)
    }finally{
      setIsLoading(false);
    }
  }, []);

  // Update the local storage when theme changes
  useEffect(() => {
    const themeMode = theme === darkTheme ? "dark" : "light";
    Local.updateThemeMode(themeMode);
  }, [theme]);

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: '#FFF' }]}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }
});
