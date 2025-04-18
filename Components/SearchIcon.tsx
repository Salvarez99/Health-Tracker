import { MaterialIcons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React, { useContext } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { ThemeContext } from "../contexts/ThemeContext"

const SearchIcon: React.FC = () => {
  const router = useRouter()
  const theme = useContext(ThemeContext)
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.push({ pathname: "/tabs/search" })
        }}
      >
        <MaterialIcons name="search" size={16} color={theme.colors.textColor} />
      </TouchableOpacity>
    </View>
  )
}

export default SearchIcon

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 5,
  },
  text: {
    fontSize: 16,
  },
  switch: {
    marginHorizontal: 2,
  },
})
