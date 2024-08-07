import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ListRenderItem,
} from "react-native";
import { useCallback, useEffect, useState, useContext } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import * as Local from "../localDB/InitializeLocal";
import { useUnits } from "@/components/UnitsContext";
import WeightGraph from "@/components/WeightGraph";
import { DataPoint, recordItem } from "@/types/types";
import { ThemeContext } from "@/contexts/ThemeContext";
import { convertDateString, formatDate } from "@/Helpers/helpers";

export default function Index() {
  const router = useRouter();
  const { units } = useUnits();
  const [date, setDate] = useState("");
  const [graphData, setGraphData] = useState<DataPoint[]>([]);
  const [listData, setlistData] = useState<recordItem[]>([]);
  const theme = useContext(ThemeContext);

  const loadWeights = async () => {
    const fetchedWeights = await Local.fetchWeights();
    const reversedWeights = fetchedWeights.reverse();

    const dataPoints: DataPoint[] = fetchedWeights.map((item) => ({
      label: convertDateString(item.date),
      value: item.weight_lbs,
    }));

    setlistData(reversedWeights);
    setGraphData(dataPoints);
    // console.log(fetchedWeights);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    setDate(formattedDate);
  };

  //Run once when mounted
  useEffect(() => {
    Local.createTable();
    loadWeights();
    getCurrentDate();
  }, []);

  //Run when in focus
  useFocusEffect(
    useCallback(() => {
      loadWeights();
      getCurrentDate();
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
        style={[
          styles.itemContainer,
          { backgroundColor: theme.colors.primary },
        ]}
        onPress={() => onItemPress(item)}
      >
        <Text style={{ color: theme.colors.textColor }}>
          {units === "lbs"
            ? `${item.weight_lbs} lbs`
            : `${item.weight_kgs} kgs`}
        </Text>
        <Text style={{ color: theme.colors.textColor }}>{item.date}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <WeightGraph data={graphData} />
      <View
        style={[
          styles.recordsView,
          { backgroundColor: theme.colors.backgroundColor },
        ]}
      >
        <FlatList
          data={listData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={true}
        />
      </View>
      <View
        style={[styles.footer, { backgroundColor: theme.colors.tertiary }]}
      >
        <TouchableOpacity
          style={[
            styles.recordButton,
            { backgroundColor: theme.colors.buttonColor },
          ]}
          onPress={() =>
            router.push({
              pathname: "/record/[date]",
              params: { date: date },
            })
          }
        >
          <Text style={[styles.buttonText, { color: theme.colors.textColor }]}>
            {" "}
            Record Weight{" "}
          </Text>
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
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
  },
  itemContainer: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 5,
    borderRadius: 5,
    margin: 4,
  },
});
