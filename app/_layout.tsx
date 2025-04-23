import { Stack, useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import { ThemeContext } from "../contexts/ThemeContext"
import { UserPreferencesProvider } from "../contexts/UserPreferencesContext"
import * as Local from "../localDB/InitializeLocal"
import { darkTheme } from "../themes/DarkTheme"
import { lightTheme } from "../themes/LightTheme"

// import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
// import { initializeApp } from "firebase/app";
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebaseConfig"

export default function RootLayout() {
  const router = useRouter()
  const [theme, setTheme] = useState(lightTheme)

  const headerStyle = {
    backgroundColor: theme.colors.tertiary,
    elevation: 10,
  }

  const headerTitleStyle = {
    color: theme.colors.textColor,
  }

  useEffect(() => {
    ;(async () => {
      try {
        const prefs = await Local.fetchUserPrefs()
        setTheme(prefs.theme_mode === "dark" ? darkTheme : lightTheme)
      } catch (e) {
        console.warn("Could not load user prefs:", e)
      }
    })()
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      false

      if (user) {
        router.replace("/tabs/graphScreen")
      } else {
        router.replace("../index")
      }
    })

    return unsubscribe // clean up listener on unmount
  }, [router])

  return (
    <UserPreferencesProvider>
      {/* <Provider store={store}> */}
      <ThemeContext.Provider value={theme}>
        <Stack
          initialRouteName="index"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" options={{}} />
          <Stack.Screen name="tabs" options={{}} />
          <Stack.Screen name="search" options={{}} />
        </Stack>
      </ThemeContext.Provider>
      {/* //</Provider> */}
    </UserPreferencesProvider>
  )
}
