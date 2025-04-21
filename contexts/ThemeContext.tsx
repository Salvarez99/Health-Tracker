import { darkTheme } from "@/themes/DarkTheme"
import { typeTheme } from "@/types/types"
import { createContext } from "react"

export const ThemeContext = createContext<typeTheme>(darkTheme)

export type Colors = {
  backgroundColor: string
  buttonColor: string
  textColor: string
  secondary: string
  tertiary: string
  primary: string
  subtitle: string
}
