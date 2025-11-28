//TODO: move to right folder
import {useNavigation} from "expo-router";
import {Pressable, StyleSheet, Text} from "react-native";
import { DrawerNavigationProp} from "@react-navigation/drawer";
import {useAuth} from "@/shared/context/AuthProvider";
import {Image} from "expo-image";
import {globalStyles} from "@/shared/stylesheets";
import {constructImageURL} from "@/shared/utils/constructImageURL";
import {useMemo} from "react";

export default function ProfilePress() {
    type DrawerNav = DrawerNavigationProp<any>
    const navigation = useNavigation<DrawerNav>();

    const { user, isLoggedIn, profile } = useAuth();

    const handleShowIcon = useMemo(() => {
        const notLoggedInImg = require("@/assets/appikon_round.png");

        if (!isLoggedIn || !profile || !profile.profilePicture) {
            console.log("Not logged in");
            return notLoggedInImg;
        }

        return constructImageURL(profile.profilePicture);

    }, [isLoggedIn, profile]);


    return (
        <Pressable onPress={() =>
            navigation.openDrawer()
        } style={styles.iconWrapper}>
            <Image
                source={handleShowIcon}
                style={styles.icon}
                contentFit={"cover"}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    iconWrapper: {
        width: 45,
        height: 45,
        marginRight: globalStyles.container.horizontalGutter,
        borderStyle: "solid",
        borderColor: globalStyles.themeColors.background,
        borderWidth: 2,
        borderRadius: 100,
        overflow: "hidden",
    },
    icon: {
        width: "100%",
        height: "100%",
        borderRadius: 100,
    }
})