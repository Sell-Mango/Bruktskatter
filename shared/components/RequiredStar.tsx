import {StyleSheet, Text} from "react-native";

export default function () {
    return (
        <Text style={styles.redStar}>*</Text>
    )
}

const styles = StyleSheet.create({
    redStar: {
        color: "#D10000",
        fontSize: 14,
    }
})