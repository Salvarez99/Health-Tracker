import { createContext } from "react";
import { typeTheme } from "@/types/types";
import { darkTheme } from "@/themes/DarkTheme";

export const ThemeContext = createContext<typeTheme>(darkTheme);