import {Drawer} from "expo-router/drawer";

export default function ProtectedDrawerLayout(){
    return(
        <Drawer screenOptions={{drawerPosition: "right"}}>
            <Drawer.Screen name="(tabs)" options={{title: "Hjem", drawerLabel: "Profil"}}/>
        </Drawer>
    )
}