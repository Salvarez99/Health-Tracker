import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";

const ranges: string[] = ["7 days", "1 month", "12 months"];

export default function ChartFilterButtons() {
  const theme = useContext(ThemeContext);

  const renderItem = (item: string) => {
    <TouchableOpacity
      key={item}
      style={[styles.button, { backgroundColor: theme.colors.primary }]}
    >
      <Text style={{ color: theme.colors.text }}>{item}</Text>
    </TouchableOpacity>;
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
    >
      {ranges.map(renderItem)}
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
    width: 90,
    height: 38,
  },
});
