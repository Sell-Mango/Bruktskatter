import {Tabs} from "expo-router";

export default function TabsLayout() {
    return(
        <Tabs screenOptions={{
            headerStyle: {
                backgroundColor: "#2F5D50",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerShown: true
        }}>
            <Tabs.Screen name="frontpage" options={{title: "Utforsk"}}/>
            <Tabs.Screen name="favorites" options={{title: "Skatter"}} />
        </Tabs>
    )
}