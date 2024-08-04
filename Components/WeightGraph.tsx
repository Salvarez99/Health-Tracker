import React from "react";
import { View, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { DataPoint } from "@/types/ints";

type props = {
  data: DataPoint[];
};

const WeightGraph: React.FC<props> = ({ data }) => {
 
  return (
    <View style={styles.chartView}>
      <LineChart
        width={360}
        height={240}
        initialSpacing={0}
        data={data.reverse()}
        spacing={100}
        hideDataPoints
        thickness={5}
        hideRules
        yAxisColor="#0BA5A4"
        showVerticalLines
        verticalLinesColor="rgba(14,164,164,0.5)"
        xAxisColor="#0BA5A4"
        color="#0BA5A4"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartView: {
    flex: 5,
    backgroundColor: "aquamarine",
    borderBottomWidth: 1,
    elevation: 5,
    paddingTop: 10,
    paddingLeft: 5,
  },
});

export default WeightGraph;
