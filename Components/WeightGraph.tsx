import React from "react";
import { View, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { DataPoint } from "@/types/types";
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
        { backgroundColor: theme.chartPallete.backgroundColor },
      ]}
    >
      <LineChart
        areaChart
        initialSpacing={0}
        spacing={80}
        width={390}
        data={data.reverse()}
        hideRules={false}
        // isAnimated={true}
        thickness={2}
        yAxisColor={theme.chartPallete.axisColor}
        xAxisColor={theme.chartPallete.axisColor}
        color={theme.chartPallete.chartLineColor}
        curved={true}
        dataPointsRadius={4}
        dataPointsColor={theme.chartPallete.chartLineColor}
        startOpacity={0.5}
        endOpacity={0.2}
        rulesColor={theme.chartPallete.axisColor}
        rulesType={"solid"}
        yAxisTextStyle={{color : theme.colors.textColor}}
        // xAxisIndicesColor={theme.colors.textColor}
        xAxisLabelTextStyle={{color : theme.colors.textColor}}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartView: {
    flex: 4,
    elevation: 5,
    paddingTop: 10,
    paddingLeft: 5,
  },
});

export default WeightGraph;
