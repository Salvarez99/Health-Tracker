import { ThemeContext } from "@/contexts/ThemeContext"
import { UserPreferencesProvider } from "@/contexts/UserPreferencesContext"
import { store } from "@/services/store"
import { darkTheme } from "@/themes/DarkTheme"
import { lightTheme } from "@/themes/LightTheme"
import { MaterialIcons } from "@expo/vector-icons"
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { Link, Stack, useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Provider as APIProvider } from "react-redux"
import * as Local from "../localDB/InitializeLocal"

export default function RootLayout() {
  const [theme, setTheme] = useState(lightTheme)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  const router = useRouter()

  const headerStyle = {
    backgroundColor: theme.colors.tertiary,
    elevation: 10,
  }

  const headerTitleStyle = {
    color: theme.colors.textColor,
  }

  const getUserPrefs = async () => {
    const user = await Local.fetchUserPrefs()
    console.log("User theme mode:", user.theme_mode)
    if (user.theme_mode === "dark") {
      setTheme(darkTheme)
    } else {
      setTheme(lightTheme)
    }
  }

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log("User state changed:", user)
    setUser(user)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    getUserPrefs()

    return subscriber // unsubscribe on unmount
  }, [])

  return (
    <APIProvider store={store}>
      <UserPreferencesProvider>
        <ThemeContext.Provider value={theme}>
          <Stack
            initialRouteName="index"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" options={{}} />
            <Stack.Screen name="tabs" options={{}} />
            <Stack.Screen
              name="record/[date]"
              options={{ headerShown: true, title: "Record Weight" }}
            />
            <Stack.Screen
              name="search"
              options={{
                headerShown: true,
                headerLeft: props => (
                  <View style={styles.container}>
                    <Link href="/tabs/mealplan">
                      <MaterialIcons style={styles.icon} name="chevron-left" />
                    </Link>
                  </View>
                ),
              }}
            />
          </Stack>
        </ThemeContext.Provider>
      </UserPreferencesProvider>
    </APIProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  icon: {
    fontSize: 24,
    marginRight: 8,
  },
  text: {
    fontSize: 18,
  },
})
