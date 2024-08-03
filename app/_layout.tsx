import { UnitsProvider } from "@/components/UnitsContext";
import UnitsToggle from "@/components/UnitsToggle";
import { Stack } from "expo-router";

export default function RootLayout() {

  return (
    <UnitsProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerRight: () => <UnitsToggle /> }}
        />
        <Stack.Screen
          name="record/[date]"
          options={{
            title: "Record Weight",
            headerStyle: {},
          }}
        />
      </Stack>
    </UnitsProvider>
  );
}
