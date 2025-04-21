import React, { useContext } from "react"
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { Colors, ThemeContext } from "../contexts/ThemeContext"
import { useSearchQuery } from "../services/api"

type Props = {
  searchPhrase: string
  isCommon: boolean
}

type FoodItem = {
  photo: { thumb: string }
  food_name: string
  serving_qty: number
  serving_unit: string
  brand_name?: string
  tag_id?: string
  nix_item_id?: string
}

const decimalToFraction = (decimal: number): string => {
  if (isNaN(decimal)) {
    return "Invalid input"
  }

  // Handle whole numbers directly
  if (decimal === Math.floor(decimal)) {
    return `${decimal}`
  }

  // Handle common fractions
  const fractions = [
    { fraction: "1/8", value: 0.125 },
    { fraction: "1/4", value: 0.25 },
    { fraction: "3/8", value: 0.375 },
    { fraction: "1/2", value: 0.5 },
    { fraction: "5/8", value: 0.625 },
    { fraction: "3/4", value: 0.75 },
    { fraction: "7/8", value: 0.875 },
    { fraction: "1/3", value: 0.333333 }, // Added 1/3
    { fraction: "2/3", value: 0.666667 }, // Added 2/3
  ]

  // If the decimal is close to any of the common fractions, return the fraction
  for (let i = 0; i < fractions.length; i++) {
    if (Math.abs(decimal - fractions[i].value) < 0.01) {
      return fractions[i].fraction
    }
  }

  // For improper fractions (like 3/2), convert to mixed fraction (1 1/2)
  if (decimal > 1) {
    const wholeNumber = Math.floor(decimal)
    const fractionalPart = decimal - wholeNumber
    const fraction = decimalToFraction(fractionalPart)

    return `${wholeNumber} ${fraction}`
  }

  // For decimals that are not close to common fractions, scale to the nearest integer fraction
  const precision = 1000000 // Precision multiplier
  const numerator = Math.round(decimal * precision)
  const denominator = precision

  // Function to compute greatest common divisor (GCD)
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b)
  }

  const commonDivisor = gcd(numerator, denominator)

  const simplifiedNumerator = numerator / commonDivisor
  const simplifiedDenominator = denominator / commonDivisor

  return `${simplifiedNumerator}/${simplifiedDenominator}`
}

const ResultView: React.FC<Props> = ({ searchPhrase, isCommon }) => {
  const theme = useContext(ThemeContext)
  const { data, isLoading, isError } = useSearchQuery(searchPhrase, {
    skip: !searchPhrase,
  })

  // Early return if no search phrase is provided
  if (!searchPhrase) return null

  // Loading and Error states
  if (isLoading) {
    return (
      <View style={styles(theme).centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles(theme).centered}>
        <Text style={styles(theme).errorText}>Failed to load results</Text>
        <TouchableOpacity style={styles(theme).retryButton}>
          <Text style={styles(theme).retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // Render item for FlatList (Card style)
  const renderItem = ({ item }: { item: FoodItem }) => (
    <View style={styles(theme).card}>
      <Image source={{ uri: item.photo.thumb }} style={styles(theme).thumb} />
      <View style={styles(theme).itemTextContainer}>
        <Text style={styles(theme).name}>{item.food_name}</Text>
        <Text style={styles(theme).meta}>
          {decimalToFraction(item.serving_qty)} {item.serving_unit}
        </Text>
        {item.brand_name && (
          <Text style={styles(theme).meta}>{item.brand_name}</Text>
        )}
      </View>
    </View>
  )

  return (
    <FlatList
      data={isCommon ? data.common : data.branded}
      keyExtractor={(item, idx) =>
        isCommon
          ? `common-${item.tag_id}-${idx}`
          : `branded-${item.nix_item_id}-${idx}`
      }
      renderItem={renderItem}
      ListEmptyComponent={
        <Text style={styles(theme).emptyMessage}>No results found</Text>
      }
      style={{ padding: 5, borderWidth: 0 }}
    />
  )
}

export default ResultView

const styles = ({ colors }: { colors: Colors }) =>
  StyleSheet.create({
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    errorText: {
      fontSize: 18,
      color: "red",
      marginBottom: 10,
    },
    retryButton: {
      padding: 10,
      backgroundColor: colors.buttonColor,
      borderRadius: 5,
    },
    retryText: {
      color: "#fff",
      fontWeight: "bold",
    },
    card: {
      margin: 5,
      flexDirection: "row",
      padding: 2,
      marginBottom: 10,
      backgroundColor: colors.tertiary,
      borderRadius: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
    thumb: {
      width: 70,
      height: 70,
      borderRadius: 8,
    },
    itemTextContainer: {
      marginLeft: 15,
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.textColor,
    },
    meta: {
      color: colors.subtitle,
      fontSize: 14,
      marginTop: 5,
    },
    emptyMessage: {
      textAlign: "center",
      fontSize: 18,
      color: "#555",
      marginTop: 20,
    },
  })
