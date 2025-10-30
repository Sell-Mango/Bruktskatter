import {Pressable, StyleSheet} from "react-native";
import {JSX, ReactNode} from "react";

export default function CustomPress({children, pressAction}: {children: React.ReactNode, pressAction?: () => void}) {
    return (
        <Pressable style={styles.button} onPress={pressAction}>
            {children}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 34,
        padding: 19,
        margin: 10,
        width: 300,
        backgroundColor: '#1F1D1E',
    }
})