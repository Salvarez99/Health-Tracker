import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { useSearchQuery } from "../services/api"
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
  const { data, isLoading, isError } = useSearchQuery(searchPhrase, {
    skip: !searchPhrase,
  })

  if (!searchPhrase) return null
  if (isLoading) return <ActivityIndicator size="large" color="#000" />
  if (isError) return <Text>Failed to load results</Text>

  const renderItem = ({ item }: { item: FoodItem }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.photo.thumb }} style={styles.thumb} />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.name}>{item.food_name}</Text>
        <Text style={styles.meta}>
          {item.serving_qty} {item.serving_unit}
        </Text>
        {"brand_name" in item && (
          <Text style={styles.meta}>{item.brand_name}</Text>
        )}
      </View>
    </View>
  )

  return (
    <View>
      <Text style={styles.sectionHeader}>Common Foods</Text>
      <FlatList
        data={data.common}
        keyExtractor={(item, idx) => `common-${item.tag_id}-${idx}`}
        renderItem={renderItem}
      />
      <Text style={styles.sectionHeader}>Branded Foods</Text>
      <FlatList
        data={data.branded}
        keyExtractor={(item, idx) => `branded-${item.nix_item_id}-${idx}`}
        renderItem={renderItem}
      />
    </View>
  )
}

export default ResultView

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginLeft: 8,
    marginBottom: 4,
  },
  item: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
    alignItems: "center",
  },
  thumb: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  meta: {
    color: "#555",
    fontSize: 12,
  },
})
