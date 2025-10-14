import {Pressable, StyleSheet} from "react-native";
import {JSX, ReactNode} from "react";

export default function CustomPress({children}: {children: React.ReactNode}) {
    return (
        <Pressable style={styles.button}>
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