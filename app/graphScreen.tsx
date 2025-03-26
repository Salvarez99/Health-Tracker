import { filterRanges } from "@/constants/filterRanges";
import { ThemeContext } from "@/contexts/ThemeContext";
import { UserPreferencesContext } from "@/contexts/UserPreferencesContext";
import {
  convertMMMDDYYYY,
  convertToDbDateFormat,
  convertToMMDD,
  getRange,
} from "@/helpers/helpers";
import { DataPoint, recordItem } from "@/types/types";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ChartFilterButtons from "../components/ChartFilterButtons";
import WeightGraph from "../components/WeightGraph";
import * as Local from "../localDB/InitializeLocal";

export default function Index() {
  const router = useRouter();
  const theme = useContext(ThemeContext);
  const screenHeight = Dimensions.get("window").height;

  const userPreferences = useContext(UserPreferencesContext);
  if (!userPreferences)
    throw new Error(
      "UserPreferencesContext must be used within UserPreferencesProvider"
    );

  const [date, setDate] = useState<string | null>(null);

  const [listData, setlistData] = useState<recordItem[]>([]);
  const [graphData, setGraphData] = useState<DataPoint[]>([]);

  const getCurrentDate = async () => {
    const currentDate = new Date();
    const formattedDate = convertToDbDateFormat(currentDate);
    await setDate(formattedDate);
    return formattedDate;
  };

  const getFilterDate = async () => {
    const formattedDate = await getCurrentDate();

    const filter = await userPreferences.filter;
    const range = filterRanges[filter];
    const dateRange = getRange(formattedDate, range);
    return dateRange;
  };

  const loadWeights = async () => {
    const currentDate = await getCurrentDate();
    const dateRange = await getFilterDate();

    const fetchedWeights = await Local.fetchWeightsAfterDate(
      dateRange,
      currentDate
    );
    const reversedWeights = [...fetchedWeights].reverse();

    const dataPoints: DataPoint[] = fetchedWeights.map((item: recordItem) => ({
      label: convertToMMDD(item.date),
      value:
        userPreferences.units === "lbs" ? item.weight_lbs : item.weight_kgs,
      secondaryLabel: "asd",
    }));

    setlistData([...reversedWeights]);
    setGraphData([...dataPoints]);
  };

  //On startup, get user prefs and weights
  useEffect(() => {
    const handleStart = async () => {
      await loadWeights();
    };
    Local.createTable();
    handleStart();
  }, []);

  //On focus, get weights
  useFocusEffect(
    useCallback(() => {
      const handleFocus = async () => {
        await loadWeights();
      };

      handleFocus();
    }, [])
  );

  useEffect(() => {
    const handleFilterChange = async () => {
      const user = await Local.fetchUserPrefs();
      await userPreferences.setUnits(user.units);
      await loadWeights();
    };
    handleFilterChange();
  }, [userPreferences.filter, userPreferences.units]);

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
          {userPreferences.units === "lbs"
            ? `${item.weight_lbs} lbs`
            : `${item.weight_kgs} kgs`}
        </Text>
        <Text style={{ color: theme.colors.textColor }}>
          {convertMMMDDYYYY(item.date)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ height: screenHeight * 0.38 }}>
        <WeightGraph data={graphData} />
      </View>
      <View style={{ flex: 1 }}>
        <ChartFilterButtons />
      </View>
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
      <View style={[styles.footer, { backgroundColor: theme.colors.tertiary }]}>
        <TouchableOpacity
          style={[
            styles.recordButton,
            { backgroundColor: theme.colors.buttonColor },
          ]}
          onPress={() =>
            router.push({
              pathname: "/record/[date]",
              params: { date: date ?? "" },
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
    justifyContent: "space-between",
    backgroundColor: "#D9D9D9",
  },
  recordsView: {
    flex: 6,
    backgroundColor: "#D9D9D9",
  },
  footer: {
    flex: 1.2,
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
    borderRadius: 5,
    margin: 4,
    elevation: 5,
  },
});
