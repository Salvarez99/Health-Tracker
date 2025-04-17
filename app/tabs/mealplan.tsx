import { ThemeContext } from "@/contexts/ThemeContext"
import DateTimePicker from "@react-native-community/datetimepicker"
import React, { useContext, useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native"

const MealPlan = () => {
  const [meals, setMeals] = useState({})
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const theme = useContext(ThemeContext)
  return (
    <ScrollView
      style={styles(theme).container}
      contentContainerStyle={{ justifyContent: "center", flexGrow: 1 }}
    >
      {showPicker ? (
        <DateTimePicker
          style={styles(theme).button}
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false)
            if (selectedDate) setDate(selectedDate)
          }}
        />
      ) : (
        <TouchableOpacity
          style={styles(theme).button}
          onPress={() => {
            setShowPicker(true)
          }}
        >
          <Text
            style={{ color: theme.colors.textColor }}
          >{`Change Date ${date.toLocaleDateString("en-US")}`}</Text>
        </TouchableOpacity>
      )}
      <Text>Meal Plan</Text>
      <Text>This is the Meal Plan section.</Text>
    </ScrollView>
  )
}

export default MealPlan

const styles = (theme: React.ContextType<typeof ThemeContext>) =>
  StyleSheet.create({
    container: {
      margin: 10, // Add some margin to the container for better aesthetics
    },
    button: {
      backgroundColor: "#575757",
      height: 34,
      width: 140,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      elevation: 3,
    },
  })
