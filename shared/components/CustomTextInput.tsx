import {StyleSheet, TextInput, Text, View} from "react-native";

export default function CustomTextInput({label, secure = false}:{label?: string, secure?:boolean}) {
    return (
        <View>
            <Text>{label}</Text>
            <TextInput style={styles.input} secureTextEntry={secure}/>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: '#1F1D1E',
        borderStyle: "solid",
        borderRadius: 7,
        width: 309,
    }
})