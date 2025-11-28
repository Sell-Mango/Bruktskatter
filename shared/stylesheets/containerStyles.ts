import {StyleSheet} from "react-native";

const containerStyles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        alignItems: 'center',
        gap: 2,
        padding: 30,
    },
    flexAuthentication: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },
    floatingContainer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        zIndex: 999,
    },
    roundedInfoContainer: {
        borderWidth: 1,
        borderColor: "#8C8C8C",
        borderRadius: 12,
        padding: 15,
        rowGap: 20,
        minHeight: 177,
        justifyContent: "space-around",
        height: "auto"
    },
    modalBackgroundOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    modalContainer: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "90%",
        alignItems: "center",
    }
})

export {containerStyles}