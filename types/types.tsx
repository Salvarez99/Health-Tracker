export type UserPreferences = {
  theme: "light" | "dark";
  units: "lbs" | "kgs";
  filter: "7 days" | "1 month" | "12 months";
  setTheme: (theme: "light" | "dark") => void;
  setUnits: (units: "lbs" | "kgs") => void;
  setFilter: (filter: "7 days" | "1 month" | "12 months") => void;
};

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
