import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ThemeContext } from "@/contexts/ThemeContext";
import { ChartFilterContext } from "@/contexts/ChartFilterContext";
import { filterRanges } from "@/constants/filterRanges";
import * as Local from "../localDB/InitializeLocal";

export default function ChartFilterButtons() {
  const theme = useContext(ThemeContext);
  const filterContext = useContext(ChartFilterContext);

  // Ensure filterContext is defined before destructuring
  if (!filterContext) {
    throw new Error("ChartFilterButtons must be used within a ChartFilterProvider");
  }

  const { filter, setFilter } = filterContext;
  const [selectedRange, setSelectedRange] = useState<string | null>(filter);

   const getUserPrefs = async () => {
      const user = await Local.fetchUserPrefs();
      const range = user.filterRange || "7 days"; 
      setFilter(range);
      setSelectedRange(range);
    }
  
    useEffect(() => {
      getUserPrefs();
    }, []);


  const handlePress = async (item: string) => {
    setSelectedRange(item);
    setFilter(item);
    await Local.updateFilterRange(item);
    // console.log(item);
  };

  const renderItem = (item: [string, number]) => {
    const [label, value] = item;
    const isSelected = label === selectedRange;
  
    return (
      <TouchableOpacity
        key={label}
        style={[
          styles.button,
          {
            backgroundColor: isSelected
              ? theme.colors.textColor 
              : theme.colors.primary,
          },
        ]}
        onPress={() => handlePress(label)}
      >
        <Text
          style={{
            color: isSelected ? theme.colors.primary : theme.colors.textColor,
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };
  

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
    >
      {Object.entries(filterRanges).map(renderItem)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 20,
    width: '32%',
    height: 38,
    elevation : 5
  },
});
