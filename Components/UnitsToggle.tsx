import { useState, useContext } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useUnits } from "./UnitsContext";
import { ThemeContext } from "@/contexts/ThemeContext";

export default function UnitsToggle() {
  const { units, setUnits } = useUnits();
  const isEnabled = units === "kgs";
  const theme = useContext(ThemeContext);

  const toggleSwitch = () => {
    const newUnits = isEnabled ? "lbs" : "kgs";
    setUnits(newUnits);
  };

  const textColor = { color: theme.colors.textColor };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, textColor]}>lbs</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor="#f4f3f4"
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={styles.switch}
      />
      <Text style={[styles.text, textColor]}>kgs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  text: {
    fontSize: 16,
  },
  switch: {
    marginHorizontal: 2,
  },
});
