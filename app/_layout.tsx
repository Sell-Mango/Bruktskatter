import { Stack } from "expo-router"

export default function RootLayout() {
    return (
        <Stack screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="index" options={{title: ""}}/>
            <Stack.Screen name="frontpage" options={{title: "bruktskatter"}} />
            <Stack.Screen name="(auth)/login" options={{title: ""}} />
        </Stack>
    )
}