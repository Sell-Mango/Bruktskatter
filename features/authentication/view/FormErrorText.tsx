import {StyleSheet, Text} from "react-native";

export default function FormErrorText({errorText}:{errorText:string|null}){
    if(errorText == null){
        return
    }

    return(
        <Text style={styles.errorText}>{errorText}</Text>
    )
}

const styles = StyleSheet.create({
    errorText: {
        color: "red",
        fontWeight: "bold",
    }
})