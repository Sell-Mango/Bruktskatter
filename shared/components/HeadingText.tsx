import {Text, StyleSheet} from "react-native";

type headingType = "h1" | "h2" | "h3" ;

export default function HeadingText({heading, type, color = "#2F5D50"}:{heading: string, type: headingType, color?:string}) {
    return (
        <Text style={{...styles[type], color: color}}>{heading}</Text>
    )
}

const styles = StyleSheet.create({
    h1: {
        fontSize: 30,
        fontWeight: "800",
        textAlign: "center"
    },
    h2:{
        fontSize: 23,
        fontWeight: "600",
        textAlign: "center"
    },
    h3:{
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    }
})