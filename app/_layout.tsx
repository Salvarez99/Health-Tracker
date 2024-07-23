import { UnitsProvider } from "@/Components/UnitsContext";
import UnitsToggle from "@/Components/UnitsToggle";
import { Stack } from "expo-router";
import { useState } from "react";

export default function RootLayout() {

  return (
    <UnitsProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerRight: () => <UnitsToggle /> }}
        />
        <Stack.Screen
          name="recordWeight"
          options={{
            title: "Record Weight",
            headerStyle: {},
          }}
        />
      </Stack>
    </UnitsProvider>
  );
}
