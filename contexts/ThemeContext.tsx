import { darkTheme } from "@/themes/DarkTheme";
import { typeTheme } from "@/types/types";
import { createContext } from "react";

export const ThemeContext = createContext<typeTheme>(darkTheme);
