import { Entypo, Feather } from "@expo/vector-icons"
import React from "react"
import { Button, Keyboard, StyleSheet, TextInput, View } from "react-native"

type Props = {
  clicked: boolean
  setClicked: (value: boolean) => void
  searchPhrase: string
  setSearchPhrase: (value: string) => void
}

const SearchBar: React.FC<Props> = ({
  clicked,
  setClicked,
  searchPhrase,
  setSearchPhrase,
}) => {
  return (
    <View style={styles.container}>
      <View style={clicked ? styles.searchBarClicked : styles.searchBarDefault}>
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => setClicked(true)}
        />
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1 }}
            onPress={() => setSearchPhrase("")}
          />
        )}
      </View>
      {clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss()
              setClicked(false)
            }}
          />
        </View>
      )}
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  searchBarDefault: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchBarClicked: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
})
