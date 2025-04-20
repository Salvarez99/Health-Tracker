import { ThemeContext } from "@/contexts/ThemeContext"
import { router } from "expo-router"
import React, { useContext } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

type Meal = "Breakfast" | "Lunch" | "Dinner" | "Snacks"

// Map meal names to image paths
const mealImages: { [key in Meal]: any } = {
  Breakfast: require("../../assets/images/breakfast.jpg"),
  Lunch: require("../../assets/images/lunch.jpg"),
  Dinner: require("../../assets/images/dinner.jpg"),
  Snacks: require("../../assets/images/snacks.jpg"),
}

const MealGrid = () => {
  const theme = useContext(ThemeContext)
  const meals: Meal[] = ["Breakfast", "Lunch", "Dinner", "Snacks"]

  const groupedMeals = [meals.slice(0, 2), meals.slice(2, 4)] // Group meals into two rows

  /**
   * Handles the press event for a meal item. Redirects to meal screen with the selected meal.
   * @param {string} meal - The meal type to navigate to.
   */
  const handlePress = (meal: string) => {
    router.push(`/tabs/mealplan?meal=${meal}`)
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
    >
      {/* Meal Grid */}
      <View style={styles.gridContainer}>
        {groupedMeals.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((meal, index) => (
              <TouchableOpacity
                onPress={() => handlePress(meal)}
                key={index}
                style={[
                  styles.mealItems,
                  { backgroundColor: theme.colors.buttonColor },
                ]}
              >
                <Image source={mealImages[meal as Meal]} style={styles.image} />
                <Text style={[styles.text, { color: theme.colors.textColor }]}>
                  {meal}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {/* Macronutrient Grid */}
      <View style={styles.gridContainer}>
        <Text style={styles.title}> Total Macros</Text>
        {macros.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((macro, index) => (
              <View
                key={index}
                style={[
                  styles.macroItems,
                  { backgroundColor: theme.colors.buttonColor },
                ]}
              >
                <Text style={[styles.text, { color: theme.colors.textColor }]}>
                  {macro.name}: {macro.value}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}

export default MealGrid

// Macronutrient data
const macros = [
  [
    { name: "Carbs", value: "200g" },
    { name: "Protein", value: "150g" },
  ],
  [
    { name: "Fats", value: "70g" },
    { name: "Cals", value: "2000 kcal" },
  ],
]

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    paddingBottom: 30, // Added padding to avoid overlap with other components
  },
  gridContainer: {
    width: "100%", // Full width for the grid
    padding: 0, // Increased space between meal grid and macronutrient grid
  },
  row: {
    flexDirection: "row", // Arrange items horizontally
    justifyContent: "space-between", // Spread the items apart
    width: "100%", // Full width for each row
    marginBottom: 15, // More space between rows for better visual balance
  },
  macroItems: {
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    width: "48%",
    padding: 10,
    borderRadius: 8, // Rounded corners
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginVertical: 5, // Small margin between macro items
  },
  mealItems: {
    justifyContent: "center",
    alignItems: "center",
    height: 180, // Increased height to accommodate image and text better
    width: "48%", // Slightly less than 50% to account for spacing
    borderWidth: 1,
    borderRadius: 12, // Rounded corners for meal items
    borderColor: "#ddd", // Light border to separate meal items
    padding: 8, // Added padding for better spacing within each meal item
    shadowColor: "#0A0A0A", // Dark shadow for depth
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginVertical: 5, // Small margin between meal items
  },
  image: {
    width: "100%", // Make the image fill the container width
    height: 100, // Fixed image height
    borderRadius: 8, // Rounded corners for the image
    marginBottom: 12, // Space between image and text
    backgroundColor: "#f0f0f0", // Light background for the image area
    shadowColor: "#0A0A0A",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    fontSize: 18, // Slightly larger text for readability
    fontWeight: "bold",
    textAlign: "center",
    color: "#333", // Dark text color for contrast and readability
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10, // Space below the title for better separation
  },
})
