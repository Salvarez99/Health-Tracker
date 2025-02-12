import { useState, useContext, useEffect } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useUnits } from "./UnitsContext";
import { ThemeContext } from "@/contexts/ThemeContext";
import * as Local from "../localDB/InitializeLocal";

export default function UnitsToggle() {
  const { units, setUnits } = useUnits();
  // const [units, setUnits ] = useState("lbs");
  const [isEnabled, setIsEnabled] = useState(false);
  const theme = useContext(ThemeContext);

  const toggleSwitch = async () => {
    const newUnits = isEnabled ? "lbs" : "kgs";
    setIsEnabled(!isEnabled);
    await Local.updateUnits(newUnits);
    setUnits(newUnits);
  };

  const textColor = { color: theme.colors.textColor };

  const getUserPrefs = async () => {
    const user = await Local.fetchUserPrefs();
    const initialUnits = user.units || "lbs"; 
    setUnits(initialUnits);
    setIsEnabled(initialUnits === 'kgs')
  }

  useEffect(() => {
    getUserPrefs();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, textColor]}>lbs</Text>
      <Switch
        trackColor={{
          false: theme.colors.backgroundColor,
          true: theme.colors.backgroundColor,
        }}
        thumbColor={theme.colors.secondary}
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
