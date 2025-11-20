//TODO: move to right folder
import CustomPress from "@/shared/components/CustomPress";
import {router, useNavigation} from "expo-router";
import {Pressable, Text} from "react-native";
import { DrawerNavigationProp} from "@react-navigation/drawer";

export default function ProfilePress() {
    type DrawerNav = DrawerNavigationProp<any>
    const navigation = useNavigation<DrawerNav>();
    return (
        <Pressable onPress={() =>
            navigation.openDrawer()
        } style={{
            margin: 5,
            padding: 10,
            borderStyle: "solid",
            borderColor: "black",
            borderWidth: 2,
            borderRadius: 100,
        }}>
            <Text>profile</Text>
        </Pressable>
    )
}