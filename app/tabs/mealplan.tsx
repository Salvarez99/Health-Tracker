import MealGrid from "@/components/mealplan/MealGrid"
import { ThemeContext } from "@/contexts/ThemeContext"
import DateTimePicker from "@react-native-community/datetimepicker"
import React, { useContext, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

const MealPlan = () => {
  const [meals, setMeals] = useState({})
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const theme = useContext(ThemeContext)

  // Function to toggle the visibility of the DateTimePicker
  const toggleDatePicker = () => {
    setShowPicker(!showPicker)
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
    >
      {/* Button to trigger DateTimePicker */}
      <TouchableOpacity
        onPress={toggleDatePicker}
        style={[styles.button, { backgroundColor: theme.colors.buttonColor }]}
      >
        <Text style={[styles.dateText, { color: theme.colors.textColor }]}>
          {date.toDateString()}
        </Text>
      </TouchableOpacity>

      {/* Conditionally render DateTimePicker */}
      {showPicker && (
        <View style={styles.datePickerContainer}>
          <DateTimePicker
            value={date}
            mode="date"
            display="inline"
            onChange={(event, selectedDate) => {
              setShowPicker(false)
              if (selectedDate) setDate(selectedDate)
            }}
            style={[
              styles.datePicker,
              { backgroundColor: theme.colors.buttonColor },
            ]}
          />
        </View>
      )}

      {/* Meal Grid */}
      <MealGrid />
    </View>
  )
}

export default MealPlan

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    overflow: "hidden",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#e0e0e0", // Light background for the button
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "500", // Slightly lighter font for the date text
  },
  datePickerContainer: {
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 10,
  },
  datePicker: {
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ccc",
  },
})
