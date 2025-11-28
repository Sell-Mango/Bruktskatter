import {StyleSheet} from "react-native";



const calloutStyles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    closeBtn: {
        position: "absolute",
        backgroundColor: "#B42424",
        padding: 8,
        right: 0,
        borderRadius: 100,
    },
    content: {
        backgroundColor: '#FBFBF0',
        borderWidth: 3,
        borderColor: "#264B40",
        borderRadius: 8,
        padding: 16,
        rowGap: 10,
    },
    rating: {
        position: "absolute",
        right: 0,
        flexDirection: "row",
        flexWrap: "nowrap",
    },
    arrow: {
        width: 0,
        height: 0,
        borderLeftWidth: 12,
        borderRightWidth: 12,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },
    arrowBorder: {
        borderTopWidth: 25,
        alignItems: "center",
        borderTopColor: '#345b3c',
    },
    arrowInner: {
        marginTop: -36,
        borderTopWidth: 30,
        borderTopColor: '#FBFBF0',
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
    },
    category: {
        fontSize: 16,
    },
    featureImage: {
        width: "100%",
        height: 120,
        borderRadius: 4,
    },
    textCol: {
        width: "70%",
    },
    ctaButton: {
        textAlign: "center",
        width: "100%",
        alignSelf: "center",
        borderRadius: 34,
        paddingVertical: 10,
    },
    ctaButtonText: {
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: "600",
    },
    solidBtn: {
        backgroundColor: "#F2A731",
        color: "#264B40",
    }
});

export {calloutStyles}