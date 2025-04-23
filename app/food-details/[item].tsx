import { ThemeContext, type Colors } from "@/contexts/ThemeContext"
import { useNaturalLanguageQuery } from "@/services/api"
import { useLocalSearchParams } from "expo-router"
import React, { useContext, useState } from "react"
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/400x200.png?text=No+Image"

const FoodDetails = () => {
  const { item } = useLocalSearchParams()
  const [currentPage, setCurrentPage] = useState(0)

  const { data, isLoading, isError } = useNaturalLanguageQuery(item as string, {
    refetchOnMountOrArgChange: true,
  })

  const theme = useContext(ThemeContext)

  const nutritionFields = [
    { label: "Calories", key: "nf_calories", unit: "kcal" },
    { label: "Total Fat", key: "nf_total_fat", unit: "g" },
    { label: "Saturated Fat", key: "nf_saturated_fat", unit: "g" },
    { label: "Cholesterol", key: "nf_cholesterol", unit: "mg" },
    { label: "Sodium", key: "nf_sodium", unit: "mg" },
    { label: "Carbohydrates", key: "nf_total_carbohydrate", unit: "g" },
    { label: "Sugars", key: "nf_sugars", unit: "g" },
    { label: "Fiber", key: "nf_dietary_fiber", unit: "g" },
    { label: "Protein", key: "nf_protein", unit: "g" },
    { label: "Potassium", key: "nf_potassium", unit: "mg" },
  ]

  if (!item) {
    return (
      <View style={styles(theme).centeredContainer}>
        <Text>No food item selected</Text>
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles(theme).overlayContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading food details...</Text>
      </View>
    )
  }

  if (isError || !data?.foods?.length) {
    return (
      <View style={styles(theme).overlayContainer}>
        <Text style={styles(theme).errorText}>
          Error loading food details. Please try again later.
        </Text>
      </View>
    )
  }

  const food = data.foods[currentPage]
  const imageUri = food.photo?.highres || food.photo?.thumb || PLACEHOLDER_IMAGE

  return (
    <View
      style={{
        flexGrow: 1,
        padding: 16,
        backgroundColor: theme.colors.backgroundColor,
      }}
    >
      <View style={styles(theme).card}>
        <Text style={styles(theme).cardTitle}>{food.food_name.titleize()}</Text>

        <Image source={{ uri: imageUri }} style={styles(theme).cardImage} />

        <View style={styles(theme).cardContent}>
          <Text style={styles(theme).nutritionHeader}>
            Nutrition (per serving):
          </Text>
          {nutritionFields.map(({ label, key, unit }) => (
            <View key={key} style={styles(theme).nutritionRow}>
              <Text style={styles(theme).nutritionLabel}>{label}:</Text>
              <Text style={styles(theme).nutritionValue}>
                {typeof food[key] === "number" ? food[key].toFixed(1) : "N/A"}{" "}
                {unit}
              </Text>
            </View>
          ))}
        </View>

        {/* Pagination Buttons */}
        <View style={styles(theme).paginationContainer}>
          <TouchableOpacity
            onPress={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            style={[
              styles(theme).pageButton,
              currentPage === 0 && styles(theme).disabledButton,
            ]}
          >
            <Text style={styles(theme).pageButtonText}>Previous</Text>
          </TouchableOpacity>

          <Text style={styles(theme).pageIndicator}>{`Item ${
            currentPage + 1
          } of ${data.foods.length}`}</Text>

          <TouchableOpacity
            onPress={() =>
              setCurrentPage(prev => Math.min(prev + 1, data.foods.length - 1))
            }
            disabled={currentPage === data.foods.length - 1}
            style={[
              styles(theme).pageButton,
              currentPage === data.foods.length - 1 &&
                styles(theme).disabledButton,
            ]}
          >
            <Text style={styles(theme).pageButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles(theme).actionButtonsContainer}>
        <TouchableOpacity style={styles(theme).actionButton} onPress={() => {}}>
          <Text style={styles(theme).actionButtonText}>
            {"I plan to Eat this".titleize()}
          </Text>
        </TouchableOpacity>
        <View style={{ width: 16 }} />
        <TouchableOpacity style={styles(theme).actionButton} onPress={() => {}}>
          <Text style={styles(theme).actionButtonText}>
            {"I ate this".titleize()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default FoodDetails

const styles = ({ colors }: { colors: Colors }) =>
  StyleSheet.create({
    centeredContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    overlayContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      margin: 16,
    },
    errorText: {
      color: "red",
      fontSize: 16,
      textAlign: "center",
    },
    nutritionHeader: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    },
    nutritionRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 4,
      borderBottomWidth: 0.5,
      borderBottomColor: "#ccc",
    },
    nutritionLabel: {
      fontWeight: "bold",
      color: "#444",
    },
    nutritionValue: {
      color: "#222",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: 16,
      padding: 16,
      shadowColor: "#222",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
      width: "100%",
      maxWidth: 400,
      alignSelf: "center",
    },
    cardTitle: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    },
    cardImage: {
      width: "100%",
      height: 250,
      borderRadius: 12,
      resizeMode: "cover",
      marginBottom: 12,
    },
    cardContent: {
      paddingVertical: 8,
    },
    paginationContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 20,
    },
    pageButton: {
      padding: 10,
      backgroundColor: "#007bff",
      borderRadius: 6,
    },
    disabledButton: {
      backgroundColor: "#ccc",
    },
    pageButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    pageIndicator: {
      fontSize: 16,
      color: "#333",
    },
    actionButtonsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 5,
      paddingHorizontal: 16,
    },
    actionButton: {
      backgroundColor: colors.buttonColor,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    actionButtonText: {
      color: colors.textColor,
      fontWeight: "bold",
      fontSize: 14,
    },
  })
