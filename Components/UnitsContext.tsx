import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UnitsContextProps {
  units: "lbs" | "kgs";
  setUnits: (units: "lbs" | "kgs") => void;
}

const UnitsContext = createContext<UnitsContextProps | undefined>(undefined);

export const UnitsProvider = ({ children }: { children: ReactNode }) => {
  const [units, setUnits] = useState<"lbs" | "kgs">("lbs");

  return (
    <UnitsContext.Provider value={{ units, setUnits }}>
      {children}
    </UnitsContext.Provider>
  );
};

export const useUnits = () => {
  const context = useContext(UnitsContext);
  if (!context) {
    throw new Error("useUnits must be used within a UnitsProvider");
  }
  return context;
};
