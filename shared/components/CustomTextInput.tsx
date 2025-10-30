import {StyleSheet, TextInput, Text, View} from "react-native";
import {CustomTextInputProps} from "@/shared/types/CustomProps";
import RequieredStar from "@/shared/components/RequieredStar";

export default function CustomTextInput(props:CustomTextInputProps) {
    const {label, secure = false, required = false, changeAction, actionKey} = props;
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{label} {required ? <RequieredStar/>: ""}</Text>
            <TextInput style={styles.input} secureTextEntry={secure} onChangeText={(value) => changeAction(actionKey, value)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: '#2F5D50',
        borderStyle: "solid",
        borderRadius: 7,
        width: 309,
    },
    text:{
        fontSize: 16,
        color: "#2F5D50",
    },
    container: {
        gap: 10
    }
})