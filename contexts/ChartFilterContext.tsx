import React, { createContext, useState, ReactNode } from "react";

interface ChartFilterContextType {
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const ChartFilterContext = createContext<ChartFilterContextType | undefined>(undefined);

export const ChartFilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filter, setFilter] = useState<string>("7 days");

  return (
    <ChartFilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </ChartFilterContext.Provider>
  );
};
