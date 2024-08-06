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
        { backgroundColor: theme.colors.chartBackgroundColor },
      ]}
    >
      <LineChart
        areaChart
        initialSpacing={0}
        width={305}
        data={data.reverse()}
        hideRules={false}
        // isAnimated={true}
        thickness={2}
        yAxisColor={theme.colors.axisColor}
        xAxisColor={theme.colors.axisColor}
        color={theme.colors.chartLineColor}
        curved={true}
        dataPointsRadius={4}
        dataPointsColor={theme.colors.chartLineColor}
        startOpacity={0.5}
        endOpacity={0.2}
        rulesColor={theme.colors.axisColor}
        rulesType={"solid"}
        yAxisTextStyle={{color : theme.colors.textColor}}
        // xAxisIndicesColor={theme.colors.textColor}
        xAxisLabelTextStyle={{color : theme.colors.textColor, f : 22}}
        
      />
    </View>
  );
};
/*
Find equation for spacing so that it shows all information in space of view
*/

const styles = StyleSheet.create({
  chartView: {
    flex: 4,
    elevation: 5,
    paddingTop: 10,
    paddingLeft: 5,
  },
});

export default WeightGraph;
