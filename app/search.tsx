import ResultView from "@/components/ResultView"
import SearchBar from "@/components/SearchBar"
import { Colors, ThemeContext } from "@/contexts/ThemeContext"
import React, { useContext, useState } from "react"
import { StyleSheet, View } from "react-native"

const Search: React.FC = () => {
  const theme = useContext(ThemeContext)

  const [searchPhrase, setSearchPhrase] = useState("")
  const [clicked, setClicked] = useState(false)

  return (
    <View style={styles(theme).container}>
      <SearchBar
        clicked={clicked}
        setClicked={setClicked}
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
      />
      <ResultView searchPhrase={searchPhrase} />
    </View>
  )
}

export default Search

const styles = ({ colors }: { colors: Colors }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
      borderRadius: 0,
      padding: 3,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 10,
      paddingBottom: 10,
      paddingHorizontal: 15,
      borderBottomWidth: 1,
    },
    button: {
      padding: 10,
      borderRadius: 5,
      marginRight: 10,
      backgroundColor: colors.buttonColor,
      width: "48%",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: colors.tertiary,
      fontWeight: "bold",
    },
    activeButton: {
      backgroundColor: colors.primary,
      borderRadius: 5,
      marginRight: 10,
      width: "48%",
      justifyContent: "center",
      alignItems: "center",
    },
    activeButtonText: {
      color: colors.textColor,
      fontWeight: "bold",
    },
    activeButtonBar: {
      marginTop: 5,
      width: "95%",
      height: 4,
      backgroundColor: colors.backgroundColor,
      borderRadius: 5,
    },
    scrollView: {
      flex: 1,
    },
  })
