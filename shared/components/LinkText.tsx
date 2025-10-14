import {StyleSheet, Text} from "react-native";

export default function LinkText({text}:{text:string}) {
    return (
        <Text style={styles.text}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        textDecorationLine: 'underline',
    }
})