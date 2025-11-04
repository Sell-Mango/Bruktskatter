import { Stack } from "expo-router"
import AuthProvider from "@/shared/context/AuthProvider";

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="index" options={{title: ""}}/>
                <Stack.Screen name="(auth)" options={{title: ""}} />
            </Stack>
        </AuthProvider>
    )
}