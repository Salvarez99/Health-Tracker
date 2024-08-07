import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { Picker } from "@react-native-picker/picker";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Local from "../../localDB/InitializeLocal";
import { ThemeContext } from "@/contexts/ThemeContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from "@/Helpers/helpers";

export default function recordWeight() {
  const router = useRouter();
  const { date: item_date } = useLocalSearchParams();
  const [units, setUnits] = useState("lbs");
  const [weight, onChangeWeight] = useState("");
  const [date, setDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const theme = useContext(ThemeContext);
  const dateObj = new Date();

  useEffect(() => {
    if (item_date) {
      setDate(item_date as string);
    }
  }, []);

  const onRecord = async () => {
    if (weight === "") {
      alert("Enter weight");
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
      <View style={styles.form}>
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
                  {date}
                </Text>
              </TouchableOpacity>
              <DateTimePicker
                mode="date"
                display="calendar"
                value={dateObj}
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || dateObj;
                  const formattedDate = formatDate(currentDate);
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
                {date}
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
              { backgroundColor: theme.colors.secondary },
            ]}
          >
            <TextInput
              keyboardType="numeric"
              maxLength={5}
              onChangeText={onChangeWeight}
              value={weight}
              style={[
                {
                  flex: 1,
                  textAlign: "center",
                  textAlignVertical: "center",
                  fontSize: 16,
                },
                { color: theme.colors.textColor },
              ]}
            />
          </View>

          <Picker
            selectedValue={units}
            onValueChange={(itemValue) => setUnits(itemValue)}
            style={[styles.picker, { color: theme.colors.textColor }]}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="lbs" value="lbs" />
            <Picker.Item label="kgs" value="kgs" />
          </Picker>

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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  form: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 370,
    height: 350,
    borderRadius: 7,
    borderWidth: 1,
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
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  headerText: {
    padding: 5,
    paddingLeft: 10,
    fontSize: 18,
  },
  recordButton: {
    position: "absolute",
    bottom: 12,
    right: 12,
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
    position: "absolute",
    margin: 10,
    marginTop: 20,
    backgroundColor: "white",
    width: 100,
    height: 28,
    borderWidth: 1,
    borderRadius: 2,
  },
  picker: {
    position: "absolute",
    left: 100,
    top: 5,
    width: 110,
    height: 28,
    padding: 0,
    margin: 0,
  },
  pickerItem: {
    height: 28,
    width: 110,
    fontSize: 14,
    justifyContent: "center",
  },
});
