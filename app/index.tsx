import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ListRenderItem,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import * as Local from "../LocalDB/InitializeLocal";
import { useUnits } from "@/components/UnitsContext";
import WeightGraph from "@/components/WeightGraph";
interface recordItem {
  id: number;
  weight_lbs: number;
  weight_kgs: number;
  date: string;
}
interface DataPoint {
  label: string;
  value: number;
}

export default function Index() {
  const { units } = useUnits();
  const router = useRouter();
  const [graphData, setGraphData] = useState<DataPoint[]>([]);
  const [ListData, setlistData] = useState<recordItem[]>([]);
  const [updated, isUpdated] = useState(false);
  const [date, setDate] = useState("");

  const loadWeights = async () => {
    const fetchedWeights = await Local.fetchWeights();
    setlistData(fetchedWeights.reverse());
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    const formattedDate = currentDate.toLocaleDateString("en-US", options);
    setDate(formattedDate);
  };

  useEffect(() => {
    Local.createTable();
    loadWeights();
    getCurrentDate();
  }, [updated]);

  useFocusEffect(
    useCallback(() => {
      loadWeights();
    }, [])
  );

  const onItemPress = (item: recordItem) => {
    console.log(`id: ${item.id} | date: ${item.date}`);
    router.push({
      pathname: "/record/[date]",
      params: {
        date: item.date,
      },
    });
  };

  const renderItem: ListRenderItem<recordItem> = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => onItemPress(item)}
      >
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
      {/* <WeightGraph data={null} /> */}
      <View style={styles.recordsView}>
        <FlatList
          data={ListData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.recordButton}
          onPress={() =>
            router.push({
              pathname: "/record/[date]",
              params: { date: date },
            })
          }
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
