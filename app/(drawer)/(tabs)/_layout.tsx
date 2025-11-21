import {Tabs} from "expo-router";
import { tabsHeaderOptions } from "@/features/headers/view/TabsHeader";

export default function TabsLayout() {
    return(
        //TODO make a seperate file for screenOptions
        <Tabs screenOptions={{
            headerStyle: {
                backgroundColor: "#2F5D50",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerShown: true,
            tabBarStyle: {
                backgroundColor: "#2F5D50",
                borderTopWidth: 0,
                elevation: 10, // Android shadow
                height: 70,
                paddingBottom: 10,
                paddingTop: 5,
            },
            tabBarActiveTintColor: "#FAAF3A",
            tabBarInactiveTintColor: "#FFFEE4",
            tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: "800",
            },
        }}>
            <Tabs.Screen name="frontpage" options={tabsHeaderOptions("Utforsk")}/>
            <Tabs.Screen name="favorites" options={tabsHeaderOptions("Skatter")} />
            <Tabs.Screen name="feed" options={tabsHeaderOptions("Feed")}/>
            <Tabs.Screen name="my-market" options={tabsHeaderOptions("Mitt marked")}/>
            <Tabs.Screen name="profile" options={{...tabsHeaderOptions("Profile"), href: null}}/>
        </Tabs>
    )
}