import { createContext, ReactNode, useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import * as Local from "../localDB/InitializeLocal"
import { UserPreferences } from "../types/types"

export const UserPreferencesContext = createContext<
  UserPreferences | undefined
>(undefined)

export const UserPreferencesProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [units, setUnits] = useState<"lbs" | "kgs">("lbs")
  const [filter, setFilter] = useState<"7 days" | "1 month" | "12 months">(
    "7 days",
  )
  const [loading, setLoading] = useState(true)

  // Refactor to load preferences asynchronously and set state
  const loadUserPreferences = async () => {
    try {
      await Local.createUserPrefs() // Ensure prefs table is created
      const userPreferences = await Local.fetchUserPrefs() // Fetch saved preferences

      if (userPreferences) {
        setTheme(userPreferences.theme_mode)
        setUnits(userPreferences.units)
        setFilter(userPreferences.filterRange)
      }
    } catch (error) {
      console.error("Failed to load preferences:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUserPreferences() // Load preferences on component mount
  }, [])

  // If still loading, show the loading spinner
  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: "#FFF" }]}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    )
  }

  return (
    <UserPreferencesContext.Provider
      value={{ theme, setTheme, units, setUnits, filter, setFilter }}
    >
      {children}
    </UserPreferencesContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
})
