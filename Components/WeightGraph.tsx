import React from 'react';
import { View, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts";

interface DataPoint {
  label : string;
  value : number;
}

interface props {
  data : DataPoint[];
  units : string;
}

const WeightGraph : React.FC<props> = ({data , units}) =>{
  
  React.useEffect(() => {
    const weightData = data.map(item => ({
      value: item.value,
      label: item.label,
    })); 
    // console.log(weightData);
  }, [data]);

  return (
    <View style={styles.chartView}>
      <LineChart
        width={320}
        height={240}
        initialSpacing={0}
        data={data.reverse()}
        spacing={110}
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
}

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