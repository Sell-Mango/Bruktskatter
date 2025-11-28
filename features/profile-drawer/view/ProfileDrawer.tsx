import {Pressable, View} from "react-native";
import {type DrawerContentComponentProps} from "@react-navigation/drawer"
import HeadingText from "@/shared/components/HeadingText";
import {Link} from "expo-router";
import Appicon from "@assets/Appicon_alternative_bruktskatter.png"
import {Image} from "expo-image";
import {useAuth} from "@/shared/context/AuthProvider";
import {Icons} from "@/shared/components/Icons";
import {containerStyles, buttonStyles, imageStyles} from "@/shared/stylesheets"

export default function ProfileDrawer(props: DrawerContentComponentProps) {
    const {navigation} = props;
    const {logout, isLoggedIn} = useAuth();
    return (
        <View style={containerStyles.flexContainer}>
            <HeadingText heading={"Profil"} type={"h2"} />
            {/*TODO:Create proper stylsheet for spesific styling */}
            <Link href="profile" style={{width: 175, height: 175}}>
                <Image style={imageStyles.roundImage} source={Appicon} contentFit={"fill"}/>
            </Link>

            {isLoggedIn ? (
                <Pressable onPress={logout} style={[buttonStyles.defaultButton, {backgroundColor: '#1F1D1E'}]}>
                    <HeadingText heading={"Logg ut"} type={"h3"} color={"#fff"}/>
                </Pressable>
            ):(
                <>
                    <Link style={[buttonStyles.defaultButton, {backgroundColor: "#1F1D1E"}]} href="register">
                        <HeadingText heading={"Bli medlem"} type={"h3"} color={"#fff"}/>
                    </Link>
                    <Link style={[buttonStyles.defaultButton, buttonStyles.buttonBoarder]} href="login">
                        <HeadingText heading={"Logg inn"} type={"h3"} color={"#1F1D1E"}/>
                    </Link>
                </>
            )}
            <Link href={"settings"}>
                <Icons.setting width={40} height={40}/>
            </Link>
        </View>
    )
}