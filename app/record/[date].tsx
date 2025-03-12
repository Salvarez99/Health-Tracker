import { convertMMMDDYYYY, convertToDbDateFormat } from "@/helpers/helpers";
import { ThemeContext } from "@/contexts/ThemeContext";
import { UserPreferencesContext } from "@/contexts/UserPreferencesContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Local from "../../localDB/InitializeLocal";

export default function recordWeight() {
  const userPreferences = useContext(UserPreferencesContext);
  if (!userPreferences)
    throw new Error(
      "UserPreferencesContext must be used within UserPreferencesProvider"
    );

  const router = useRouter();
  const { date: item_date } = useLocalSearchParams();
  const [units, setUnits] = useState("lbs");
  const [weight, onChangeWeight] = useState("");
  const [date, setDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const theme = useContext(ThemeContext);
  const dateObj = new Date();
  const [isMatch, setIsMatch] = useState(false);

  const pattern: RegExp = /^[0-9]{3}\.?[0-9]{0,2}$/;

  useEffect(() => {
    if (item_date) {
      setDate(item_date as string);
    }
  }, []);

  const onRecord = async () => {
    const m = pattern.test(weight);
    setIsMatch(m);

    if (!m) {
      alert("Incorrect format inputted for weight.");
    } else {
      console.log("weight: " + weight + " " + units);
      let weights: Number[] = convertWeight(units);
      if (await Local.dateExist(date)) {
        await Local.updateWeight(date, weights[0], weights[1]);
      } else {
        await Local.insertWeight(weights[0], weights[1], date);
      }
      router.back();
    }
  };

  const convertWeight = (units: string): number[] => {
    let weights: number[] = []; //[lbs, kgs]
    if (units === "lbs") {
      //convert to kgs
      weights = [Number(weight), Number((Number(weight) / 2.205).toFixed(2))];
    } else {
      //convert to lbs
      weights = [Number((Number(weight) / 2.205).toFixed(2)), Number(weight)];
    }
    return weights;
  };

  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
    >
      <View
        style={[styles.form, { backgroundColor: theme.colors.backgroundColor }]}
      >
        <View
          style={[
            styles.formHeader,
            { backgroundColor: theme.colors.tertiary },
          ]}
        >
          {isOpen ? (
            <>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Text
                  style={[styles.headerText, { color: theme.colors.textColor }]}
                >
                  {convertMMMDDYYYY(date)}
                </Text>
              </TouchableOpacity>
              <DateTimePicker
                mode="date"
                display="calendar"
                value={dateObj}
                maximumDate={dateObj}
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || dateObj;
                  const formattedDate = convertToDbDateFormat(currentDate);
                  setIsOpen(false);
                  setDate(formattedDate);
                }}
              />
            </>
          ) : (
            <TouchableOpacity onPress={() => setIsOpen(true)}>
              <Text
                style={[styles.headerText, { color: theme.colors.textColor }]}
              >
                {convertMMMDDYYYY(date)}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={[styles.formBody, { backgroundColor: theme.colors.primary }]}
        >
          <View
            style={[
              styles.textInContainer,
              { flex: 1, backgroundColor: theme.colors.secondary },
            ]}
          >
            <TextInput
              keyboardType="numeric"
              maxLength={6}
              onChangeText={onChangeWeight}
              value={weight}
              style={[
                {
                  flex: 1,
                  textAlign: "center",
                  textAlignVertical: "center",
                  fontSize: 16,
                  zIndex: 2,
                },
                { color: theme.colors.textColor },
              ]}
            />
          </View>
          <View
            style={{ flex: 2.5, marginTop: 5, paddingLeft: 0, marginLeft: 0 }}
          >
            <Picker
              selectedValue={userPreferences.units}
              onValueChange={(itemValue) =>
                userPreferences.setUnits(itemValue as "lbs" | "kgs")
              }
              style={[styles.picker, { color: theme.colors.textColor }]}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="lbs" value="lbs" />
              <Picker.Item label="kgs" value="kgs" />
            </Picker>
          </View>
        </View>
        <View
          style={[
            styles.formFooter,
            { backgroundColor: theme.colors.secondary },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.recordButton,
              { backgroundColor: theme.colors.buttonColor },
            ]}
            onPress={onRecord}
          >
            <Text
              style={[styles.recordText, { color: theme.colors.textColor }]}
            >
              Record
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, backgroundColor: theme.colors.backgroundColor }}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  form: {
    flex: 5,
    position: "absolute",
    padding: 10,
    paddingTop: 10,
    width: 370,
    height: 350,
    borderRadius: 7,
    // borderWidth: 1,
  },
  formHeader: {
    backgroundColor: "#F0F0F0",
    flex: 1,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    justifyContent: "center",
    borderBottomWidth: 1,
  },
  formBody: {
    backgroundColor: "#D9D9D9",
    flex: 6,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  formFooter: {
    flex: 1,
    alignItems: "flex-end",
    paddingTop: 10,
    paddingRight: 10,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  headerText: {
    padding: 5,
    paddingLeft: 10,
    fontSize: 18,
  },
  recordButton: {
    backgroundColor: "#F0F0F0",
    height: 30,
    width: 80,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  recordText: {
    fontWeight: "bold",
  },
  textInContainer: {
    backgroundColor: "white",
    margin: 0,
    marginLeft: 7,
    marginTop: 20,
    width: 100,
    height: 25,
    borderWidth: 1,
    borderRadius: 2,
  },
  picker: {
    width: 110,
    height: 28,
  },
  pickerItem: {
    // height: 28,
    // width: 50,
    // fontSize: 14,
    // justifyContent: "center",
  },
});
