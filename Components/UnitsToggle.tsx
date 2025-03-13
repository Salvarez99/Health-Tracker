import { ThemeContext } from "@/contexts/ThemeContext"
import { UserPreferencesContext } from "@/contexts/UserPreferencesContext"
import { useContext, useEffect, useState } from "react"
import { StyleSheet, Switch, Text, View } from "react-native"
import * as Local from "../localDB/InitializeLocal"

export default function UnitsToggle() {
  const userPreferences = useContext(UserPreferencesContext)
  if (!userPreferences)
    throw new Error(
      "UserPreferencesContext must be used within UserPreferencesProvider",
    )

  const [isEnabled, setIsEnabled] = useState(false)
  const theme = useContext(ThemeContext)

  const toggleSwitch = async () => {
    const newUnits: "lbs" | "kgs" = isEnabled ? "lbs" : "kgs"
    await setIsEnabled(!isEnabled)
    await Local.updateUnits(newUnits)
    await userPreferences.setUnits(newUnits)
  }

  const textColor = { color: theme.colors.textColor }

  useEffect(() => {
    setIsEnabled(userPreferences.units === "kgs" ? true : false)
  }, [userPreferences.units])

  return (
    <View style={styles.container}>
      <Text style={[styles.text, textColor]}>lbs</Text>
      <Switch
        trackColor={{
          false: theme.colors.backgroundColor,
          true: theme.colors.backgroundColor,
        }}
        thumbColor={theme.colors.secondary}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={styles.switch}
      />
      <Text style={[styles.text, textColor]}>kgs</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  text: {
    fontSize: 16,
  },
  switch: {
    marginHorizontal: 2,
  },
})
