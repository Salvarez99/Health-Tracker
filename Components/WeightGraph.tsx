import { ThemeContext } from "@/contexts/ThemeContext"
import { DataPoint } from "@/types/types"
import React from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { LineChart } from "react-native-gifted-charts"

type props = {
  data: DataPoint[]
}

const WeightGraph: React.FC<props> = ({ data }) => {
  const theme = React.useContext(ThemeContext)
  const screenWidth = Dimensions.get("window").width * 0.9
  const screenHeight = Dimensions.get("window").height

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
        spacing={screenWidth * 0.2} // Adjust spacing dynamically
        width={screenWidth * 0.9} // 90% of screen width
        height={screenHeight * 0.3} // 30% of screen height
        data={data}
        hideRules={false}
        thickness={2}
        yAxisColor={theme.chartPallete.axisColor}
        xAxisColor={theme.chartPallete.axisColor}
        color={theme.chartPallete.chartLineColor}
        curved
        dataPointsRadius={4}
        dataPointsColor={theme.chartPallete.chartLineColor}
        startOpacity={0.5}
        endOpacity={0.2}
        rulesColor={theme.chartPallete.axisColor}
        rulesType="solid"
        yAxisTextStyle={{ color: theme.colors.textColor }}
        xAxisLabelTextStyle={{ color: theme.colors.textColor }}
        scrollToEnd
        // animateOnDataChange
        focusEnabled
        unFocusOnPressOut
        delayBeforeUnFocus={1300}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  chartView: {
    flex: 1,
    height: 200, // Ensure the parent container has a fixed height
    paddingTop: 10,
    paddingHorizontal: 2,
    alignSelf: "stretch", // Ensures it expands within its parent
  },
})

export default WeightGraph
