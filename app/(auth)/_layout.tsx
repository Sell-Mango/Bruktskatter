import {Stack} from "expo-router";

export default function AuthLayout() {
    return(
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: "#2F5D50",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerShown: true,
        }}/>
    )
}