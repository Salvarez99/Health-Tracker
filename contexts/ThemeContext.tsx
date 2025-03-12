import { darkTheme } from "@/Themes/DarkTheme"
import { typeTheme } from "@/types/types"
import { createContext } from "react"

export const ThemeContext = createContext<typeTheme>(darkTheme)
