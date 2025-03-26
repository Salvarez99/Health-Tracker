import ResultView from "@/components/ResultView"
import SearchBar from "@/components/SearchBar"
import React, { useState } from "react"
import { View } from "react-native"

const Search: React.FC = () => {
  const [searchPhrase, setSearchPhrase] = useState("")
  const [clicked, setClicked] = useState(false)
  return (
    <View>
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
