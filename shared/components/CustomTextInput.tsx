import {TextInput, Text, View} from "react-native";
import {CustomTextInputProps} from "@/shared/types/CustomProps";
import RequiredStar from "@/shared/components/RequiredStar";
import {formStyles} from "@/shared/stylesheets";

export default function CustomTextInput<T>(props:CustomTextInputProps<T>) {
    const {label, secure = false, required = false, changeAction, actionKey} = props;
    return (
        <View style={{gap:10}}>
            <Text style={formStyles.labelText}>{label} {required ? <RequiredStar/>: ""}</Text>
            <TextInput style={formStyles.textInput} secureTextEntry={secure} onChangeText={(value) => changeAction(actionKey, value)}/>
        </View>
    )
}