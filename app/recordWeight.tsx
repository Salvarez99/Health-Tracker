import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import * as Local from "../LocalDB/InitializeLocal";

export default function recordWeight() {
  const router = useRouter();
  const [units, setUnits] = useState("lbs");
  const [weight, onChangeWeight] = useState("");
  const [date, setDate] = useState("");

  //Formats and set's current day as string
  useEffect(() => {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    const formattedDate = currentDate.toLocaleDateString("en-US", options);
    setDate(formattedDate);
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
    <View style={styles.mainContainer}>
      <View style={styles.form}>
        <View style={styles.formHeader}>
          <Text style={styles.headerText}>{date}</Text>
        </View>
        <View style={styles.formBody}>
          <View style={styles.textInContainer}>
            <TextInput
              keyboardType="numeric"
              maxLength={5}
              onChangeText={onChangeWeight}
              value={weight}
              style={{
                flex: 1,
                textAlign: "center",
                textAlignVertical: "center",
                fontSize: 16,
              }}
            />
          </View>

          <Picker
            selectedValue={units}
            onValueChange={(itemValue) => setUnits(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="lbs" value="lbs" />
            <Picker.Item label="kgs" value="kgs" />
          </Picker>

          <TouchableOpacity style={styles.recordButton} onPress={onRecord}>
            <Text style={styles.recordText}>Record</Text>
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
