import {Text} from "react-native";
import {headingStyles} from "@/shared/stylesheets";

type headingType = "h1" | "h2" | "h3" | "ShopText";

export default function HeadingText({heading, type, color = "#2F5D50"}:{heading: string, type: headingType, color?:string}) {
    return (
        <Text style={[headingStyles[type], {color: color}]}>{heading}</Text>
    )
}