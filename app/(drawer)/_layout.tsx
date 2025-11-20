import {Drawer} from "expo-router/drawer";
import ProfileDrawer from "@/features/profile-drawer/view/ProfileDrawer";
import {SafeAreaProvider, useSafeAreaInsets} from "react-native-safe-area-context";

export default function Layout() {
    const safeArea = useSafeAreaInsets()
    return (
        <SafeAreaProvider>
            <Drawer screenOptions={{headerShown: false, drawerPosition: "right", drawerStyle: {marginTop: safeArea.top}}} drawerContent={(props) => (<ProfileDrawer {...props} />) } />
        </SafeAreaProvider>
    )
}