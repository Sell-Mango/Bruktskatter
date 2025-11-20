import {Drawer} from "expo-router/drawer";

export default function Layout() {
    return(
        <Drawer screenOptions={{drawerPosition: "right"}}>
            <Drawer.Screen name="(tabs)/frontpage" options={{title: "Hjem", drawerLabel: "Profil"}}/>
            <Drawer.Screen name="feed" options={{title: "Hjem", drawerLabel: "Profil"}}/>
            <Drawer.Screen name="my-market" options={{title: "Hjem", drawerLabel: "Profil"}}/>
            <Drawer.Screen name="profile" options={{title: "Hjem", drawerLabel: "Profil"}}/>
        </Drawer>
    )
}