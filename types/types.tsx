export type DataPoint = {
  label: string;
  value: number;
  secondaryLabel: string;
};

export type recordItem = {
  id: number;
  weight_lbs: number;
  weight_kgs: number;
  date: string;
};

export type typeTheme = {
  isDark: boolean;
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    textColor: string;
    backgroundColor: string;
    buttonColor: string;
  };
  chartPallete: {
    backgroundColor: string;
    axisColor: string;
    chartLineColor: string;
  };
};
