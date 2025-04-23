import { useRouter } from "expo-router"
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
import { decimalToFraction } from "../helpers/helpers"
import { useInstantSearchQuery } from "../services/api"

type Props = {
  searchPhrase: string
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

const ResultView: React.FC<Props> = ({ searchPhrase }) => {
  const router = useRouter()
  const theme = useContext(ThemeContext)
  const { data, isLoading, isError } = useInstantSearchQuery(searchPhrase, {
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

  const handleItemPress = (item: string) => {
    router.push({
      pathname: "/food-details/[item]",
      params: { item: item ?? "" },
    })
  }

  // Render item for FlatList (Card style)
  const renderItem = ({ item }: { item: FoodItem }) => (
    <TouchableOpacity
      style={styles(theme).card}
      onPress={() => handleItemPress(item.food_name)}
    >
      <Image source={{ uri: item.photo.thumb }} style={styles(theme).thumb} />
      <View style={styles(theme).itemTextContainer}>
        <Text style={styles(theme).name}>{item.food_name.titleize()}</Text>
        <Text style={styles(theme).meta}>
          {decimalToFraction(item.serving_qty)} {item.serving_unit}
        </Text>
        {item.brand_name && (
          <Text style={styles(theme).meta}>{item.brand_name}</Text>
        )}
      </View>
    </TouchableOpacity>
  )

  return (
    <FlatList
      data={data.common}
      keyExtractor={(item, idx) => `common-${item.tag_id}-${idx}`}
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
