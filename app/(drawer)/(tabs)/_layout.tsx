import {Tabs} from "expo-router";
import { tabsHeaderOptions } from "@/features/headers/view/TabsHeader";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Icons} from "@/shared/components/Icons";

export default function TabsLayout() {
    const safeArea = useSafeAreaInsets()
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
                elevation: 10,
                height: 70 + safeArea.bottom,
                paddingBottom: 10 + safeArea.bottom,
                paddingTop: 5,
            },
            tabBarActiveTintColor: "#FAAF3A",
            tabBarInactiveTintColor: "#FFFEE4",
            tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: "800",
            },
        }}>
            <Tabs.Screen name="frontpage" options={
                {...tabsHeaderOptions("Utforsk"),
                    tabBarIcon: ({ color }) => <Icons.map />
                }}/>
            <Tabs.Screen name="favorites" options={
                {...tabsHeaderOptions("Skatter"),
                tabBarIcon: ({ color }) => <Icons.hollowHeart />

            }} />
            <Tabs.Screen name="feed" options={
                {...tabsHeaderOptions("Feed"),
                    tabBarIcon: ({ color }) => <Icons.feed />

                }} />
            <Tabs.Screen name="my-market" options={
                {...tabsHeaderOptions("Mitt marked"),
                    tabBarIcon: ({ color }) => <Icons.market />

                }} />
            <Tabs.Screen name="profile" options={{...tabsHeaderOptions("Profile"), href: null}}/>
        </Tabs>
    )
}