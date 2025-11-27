import {StyleSheet} from "react-native";

const headingStyles = StyleSheet.create({
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
    },
    ShopText:{
        fontSize: 14,
        fontWeight: "600",
        flexWrap: "wrap",
    },
    HighlightText: {
        fontWeight: "800",
        color: "#264B40"
    }
})

export {headingStyles}