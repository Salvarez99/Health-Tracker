import { createContext, useState, useEffect, ReactNode } from "react";
import * as Local from "../localDB/InitializeLocal";
import { UserPreferences } from "../types/types";
import { ActivityIndicator, View, StyleSheet } from "react-native";

export const UserPreferencesContext = createContext<
  UserPreferences | undefined
>(undefined);

export const UserPreferencesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [units, setUnits] = useState<"lbs" | "kgs">("lbs");
  const [filter, setFilter] = useState<"7 days" | "1 month" | "12 months">(
    "7 days"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserPreferences = async () => {
      try {
        await Local.createUserPrefs();
        const userPreferences = await Local.fetchUserPrefs();
        console.log("UserPreferences:", userPreferences);
        if (userPreferences) {
          setTheme(userPreferences.theme_mode);
          setUnits(userPreferences.units);
          setFilter(userPreferences.filterRange);
        }
      } catch (error) {
        console.error("Failed to load preferences:", error);
      } finally {
        setLoading(false);
      }
    };
    console.log("Loading user preferences...");
    loadUserPreferences();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: "#FFF" }]}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <UserPreferencesContext.Provider
      value={{ theme, setTheme, units, setUnits, filter, setFilter }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
