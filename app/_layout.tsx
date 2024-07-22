import UnitsToggle from "@/Components/UnitsToggle";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerRight: () => <UnitsToggle/> }}
      />
      <Stack.Screen
        name="recordWeight"
        options={{
          title: "Record Weight",
          headerStyle: {},
        }}
      />
    </Stack>
  );
}
