import {StyleProp, Text, TextStyle} from "react-native";
import {headingStyles} from "@/shared/stylesheets";

type headingType = "h1" | "h2" | "h3" | "ShopText";

export default function HeadingText({heading, type, color = "#2F5D50", customStyle}:{heading: string, type: headingType, color?:string, customStyle?:StyleProp<TextStyle>}) {
    return (
        <Text style={[headingStyles[type], {color: color}, customStyle]}>{heading}</Text>
    )
}