import {Tabs} from "expo-router";
import { tabsHeaderOptions } from "@/features/headers/view/TabsHeader";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import TabsIcon from "@/shared/components/TabsIcon";
import {globalStyles} from "@/shared/stylesheets";

const colors = globalStyles.themeColors;

export default function TabsLayout() {
    const safeArea = useSafeAreaInsets()
    return(
        //TODO make a seperate file for screenOptions
        <Tabs screenOptions={{
            headerStyle: {
                backgroundColor: colors.primary,
                borderBottomColor: colors.primaryDark22,
                borderBottomWidth: 6,
                height: 105,
            },
            headerTintColor: colors.white,
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerShown: true,
            tabBarStyle: {
                backgroundColor: colors.primary,
                borderTopWidth: 0,
                elevation: 10,
                height: 60 + safeArea.bottom,
                paddingBottom: 10 + safeArea.bottom,
                paddingTop: 6,
            },
            tabBarActiveTintColor: colors.tertiary,
            tabBarInactiveTintColor: colors.background,
            tabBarIconStyle: {
                backgroundColor: colors.primary,
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
                            activeColor={colors.primary}
                            backgroundColor={colors.tertiary}
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
                            activeColor={colors.primary}
                            backgroundColor={colors.tertiary}
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
                            activeColor={colors.primary}
                            backgroundColor={colors.tertiary}
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
                            activeColor={colors.primary}
                            backgroundColor={colors.tertiary}
                        />
                    )
                }} />
            <Tabs.Screen name="profile" options={{...tabsHeaderOptions("Profile"), href: null}}/>
        </Tabs>
    )
}