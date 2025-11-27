import {Tabs} from "expo-router";
import { tabsHeaderOptions } from "@/features/headers/view/TabsHeader";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import TabsIcon from "@/shared/components/TabsIcon";

const PRIMARY_COLOR = "#2f5d50";
const SECONDARY_COLOR = "#fffee4";
const ACTIVE_CONTAINER_COLOR = "#faaf3a";

export default function TabsLayout() {
    const safeArea = useSafeAreaInsets()
    return(
        //TODO make a seperate file for screenOptions
        <Tabs screenOptions={{
            headerStyle: {
                backgroundColor: PRIMARY_COLOR,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerShown: true,
            tabBarStyle: {
                backgroundColor: PRIMARY_COLOR,
                borderTopWidth: 0,
                elevation: 10,
                height: 60 + safeArea.bottom,
                paddingBottom: 10 + safeArea.bottom,
                paddingTop: 6,
            },
            tabBarActiveTintColor: ACTIVE_CONTAINER_COLOR,
            tabBarInactiveTintColor: SECONDARY_COLOR,
            tabBarIconStyle: {
                backgroundColor: PRIMARY_COLOR,
                paddingTop: 5,
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: "600",
            },
        }}>
            <Tabs.Screen name="frontpage" options={
                {...tabsHeaderOptions("Utforsk"),
                    tabBarIcon: ({ color, focused }) => (
                        <TabsIcon
                            icon="map"
                            focused={focused}
                            activeSize={24}
                            inactiveColor={color}
                            activeColor={PRIMARY_COLOR}
                            backgroundColor={ACTIVE_CONTAINER_COLOR}
                        />
                    )
                }}/>
            <Tabs.Screen name="favorites" options={
                {...tabsHeaderOptions("Skatter"),
                    tabBarIcon: ({ color, focused }) => (
                        <TabsIcon
                            icon="treasures"
                            focused={focused}
                            activeSize={22}
                            inactiveColor={color}
                            activeColor={PRIMARY_COLOR}
                            backgroundColor={ACTIVE_CONTAINER_COLOR}
                        />
                    )

            }} />
            <Tabs.Screen name="feed" options={
                {...tabsHeaderOptions("Feed"),
                    tabBarIcon: ({ color, focused }) => (
                        <TabsIcon
                            icon="feed"
                            focused={focused}
                            size={20}
                            activeSize={18}
                            inactiveColor={color}
                            activeColor={PRIMARY_COLOR}
                            backgroundColor={ACTIVE_CONTAINER_COLOR}
                        />
                    )

                }} />
            <Tabs.Screen name="my-market" options={
                {...tabsHeaderOptions("Mitt marked"),
                    tabBarIcon: ({ color, focused }) => (
                        <TabsIcon
                            icon="myMarked"
                            size={20}
                            focused={focused}
                            inactiveColor={color}
                            activeColor={PRIMARY_COLOR}
                            backgroundColor={ACTIVE_CONTAINER_COLOR}
                        />
                    )
                }} />
            <Tabs.Screen name="profile" options={{...tabsHeaderOptions("Profile"), href: null}}/>
        </Tabs>
    )
}