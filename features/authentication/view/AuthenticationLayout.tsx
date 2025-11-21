import {View} from "react-native";
import HeadingText from "@/shared/components/HeadingText";
import Appicon from "@assets/Appicon_alternative_bruktskatter.png";
import { Image } from "expo-image"
import {ReactNode} from "react";
import {containerStyles, imageStyles} from "@/shared/stylesheets";

export default function AuthenticationLayout({children, heading}: {children: ReactNode, heading: string}) {
    return (
        <View style={containerStyles.flexAuthentication}>
            <Image style={imageStyles.authenticationImage} source={Appicon} contentFit={"scale-down"}/>
            <HeadingText heading={heading} type={"h1"}/>
            {children}
        </View>
    )
}