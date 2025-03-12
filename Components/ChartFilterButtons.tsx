import { filterRanges } from "@/constants/filterRanges"
import { ThemeContext } from "@/contexts/ThemeContext"
import { UserPreferencesContext } from "@/contexts/UserPreferencesContext"
import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import * as Local from "../localDB/InitializeLocal"

export default function ChartFilterButtons() {
  const theme = useContext(ThemeContext)

  const userPreferences = useContext(UserPreferencesContext)
  if (!userPreferences)
    throw new Error(
      "UserPreferencesContext must be used within UserPreferencesProvider",
    )

  const [selectedRange, setSelectedRange] = useState<string | null>("7 days")

  useEffect(() => {
    setSelectedRange(userPreferences.filter)
  }, [])

  const handlePress = async (item: "7 days" | "1 month" | "12 months") => {
    setSelectedRange(item)
    await userPreferences.setFilter(item)
    await Local.updateFilterRange(item)
  }

  const renderItem = (item: [string, number]) => {
    const [label, value] = item
    const isSelected = label === selectedRange

    return (
      <TouchableOpacity
        key={label}
        style={[
          styles.button,
          {
            backgroundColor: isSelected
              ? theme.colors.textColor
              : theme.colors.primary,
          },
        ]}
        onPress={() => handlePress(label as "7 days" | "1 month" | "12 months")}
      >
        <Text
          style={{
            padding: 0,
            margin: 0,
            textAlign: "center",
            color: isSelected ? theme.colors.primary : theme.colors.textColor,
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
    >
      {Object.entries(filterRanges).map(renderItem)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    borderRadius: 20,
    width: "32%",
    height: 34,
    elevation: 5,
  },
})
