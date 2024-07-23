import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { LineChart } from "react-native-gifted-charts";
import {
  useRouter,
  useFocusEffect,
  useLocalSearchParams,
  useGlobalSearchParams,
} from "expo-router";
import * as Local from "../LocalDB/InitializeLocal";
import { useUnits } from "@/Components/UnitsContext";
interface recordItem {
  id: number;
  weight_lbs: number;
  weight_kgs: number;
  date: string;
}

export default function Index() {
  const { units } = useUnits();
  const router = useRouter();
  const [weights, setWeights] = useState<recordItem[]>([]);
  const [data, setData] = useState<recordItem[]>([]);

  const loadWeights = async () => {
    const fetchedWeights = await Local.fetchWeights();
    setData(fetchedWeights.reverse());
  };
  useEffect(() => {
    Local.createTable();
    loadWeights();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadWeights();
    }, [])
  );

  const renderItem = ({ item }: { item: recordItem }) => {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Text>
          {units === "lbs"
            ? `${item.weight_lbs} lbs`
            : `${item.weight_kgs} kgs`}
        </Text>
        <Text>{item.date}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartView}>
        <LineChart width={320} height={260} />
      </View>
      <View style={styles.recordsView}>
        <FlatList data={data} renderItem={renderItem} />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.recordButton}
          onPress={() => router.push("recordWeight")}
        >
          <Text style={styles.buttonText}> Record Weight </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  chartView: {
    flex: 5,
    backgroundColor: "#ffff",
    borderBottomWidth: 1,
    elevation: 5,
    paddingTop: 10,
    paddingLeft: 5,
  },
  recordsView: {
    flex: 6,
    backgroundColor: "#D9D9D9",
  },
  footer: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
  },
  recordButton: {
    backgroundColor: "#575757",
    height: 34,
    width: 140,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
  },
  itemContainer: {
    padding: 17,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
