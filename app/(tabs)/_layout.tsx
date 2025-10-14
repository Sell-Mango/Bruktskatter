import {router, Tabs} from "expo-router";
import {Pressable, Text} from "react-native";

export default function TabsLayout() {
    const profileRight = () =>
        (<Pressable onPress={() =>
                router.push("/(tabs)/profile")
            } style={{
                margin: 5,
                padding: 10,
                borderStyle: "solid",
                borderColor: "black",
                borderWidth: 2,
                borderRadius: 100,
            }}><Text>profile</Text></Pressable>
        )
    return(
        <Tabs screenOptions={{
            headerStyle: {
                backgroundColor: "#2F5D50",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerShown: true,
        }}>
            <Tabs.Screen name="frontpage" options={{title: "Utforsk", headerRight: profileRight}}/>
            <Tabs.Screen name="favorites" options={{title: "Skatter", headerRight: profileRight}} />
            <Tabs.Screen name="feed" options={{title: "Feed", headerRight: profileRight}}/>
            <Tabs.Screen name="my-market" options={{title: "Mitt marked", headerRight: profileRight}}/>
            <Tabs.Screen name="profile" options={{title: "Profile", href: null}}/>
        </Tabs>
    )
}