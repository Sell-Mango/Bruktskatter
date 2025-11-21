import {Text, View} from "react-native";
import {Link} from "expo-router";
import HeadingText from "@/shared/components/HeadingText";
import { Image } from "expo-image"
import Appicon from "@assets/Appicon_alternative_bruktskatter.png"
import LinkText from "@/shared/components/LinkText";
import {containerStyles, buttonStyles, imageStyles} from "@/shared/stylesheets";

export default function Welcome() {
    return (
        <View style={containerStyles.flexContainer}>
            <Image style={imageStyles.authenticationImage} source={Appicon} contentFit={"scale-down"}/>
            <HeadingText heading="Bruktskatter" type="h1" />
            <Text>Oppdag bruktmarkeder i nærheten</Text>
            <Link style={[buttonStyles.defaultButton, {backgroundColor: "#1F1D1E"}]} href="register">
                <HeadingText heading={"Bli medlem"} type={"h3"} color={"#fff"}/>
            </Link>
            <Link style={[buttonStyles.defaultButton, buttonStyles.buttonBoarder]} href="login">
                <HeadingText heading={"Logg inn"} type={"h3"} color={"#1F1D1E"}/>
            </Link>
            <Link style={buttonStyles.defaultButton} href="frontpage">
                <LinkText text={"Hopp over innlogging"}/>
            </Link>
        </View>
    )
}