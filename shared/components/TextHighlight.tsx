import {ReactNode} from "react";
import {StyleProp, Text, TextStyle} from "react-native";
import {headingStyles} from "@/shared/stylesheets";

export default function TextHighlight({children, customStyle}: {children: ReactNode, customStyle?: StyleProp<TextStyle>}) {
    return <Text style={[headingStyles.HighlightText, customStyle]}>{children}</Text>
}