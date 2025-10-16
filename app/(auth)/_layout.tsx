import {Stack} from "expo-router";

export default function AuthLayout() {
    return(
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: "#fff",
            },
            headerTintColor: "#1F1D1E",
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerShown: true,
            headerTitle: "Tilbake",
        }}/>
    )
}