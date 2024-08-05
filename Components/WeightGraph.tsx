import React from "react";
import { View, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { DataPoint } from "@/types/ints";
import { ThemeContext } from "@/contexts/ThemeContext";

type props = {
  data: DataPoint[];
};

const WeightGraph: React.FC<props> = ({ data }) => {
  const theme = React.useContext(ThemeContext);

  return (
    <View
      style={[
        styles.chartView,
        { backgroundColor: theme.colors.chartBackgroundColor,

         },
      ]}
    >
      <LineChart
        width={360}
        height={240}
        initialSpacing={0}
        data={data.reverse()}
        spacing={100}
        hideDataPoints
        thickness={5}
        hideRules
        yAxisColor={theme.colors.axisColor}
        showVerticalLines
        verticalLinesColor={theme.colors.chartLineColor}
        xAxisColor={theme.colors.axisColor}
        color={theme.colors.chartLineColor}
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
