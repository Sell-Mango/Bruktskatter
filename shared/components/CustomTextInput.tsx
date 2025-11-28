import {TextInput, Text, View} from "react-native";
import {CustomTextInputProps} from "@/shared/types/CustomProps";
import RequiredStar from "@/shared/components/RequiredStar";
import {formStyles} from "@/shared/stylesheets";

export default function CustomTextInput<T>(props:CustomTextInputProps<T>) {
    const {label, secure = false, required = false, changeAction, actionKey, containerStyles, placeholder, placeholderTextColor, hideIconOnWriting, inputStyles, leftIcon, formData} = props;

    const hasValue = formData && actionKey && formData[actionKey];
    const showTextIcon = hideIconOnWriting ? !hasValue : true

    return (
        <View style={{gap:10}}>
            {label && (
                <Text style={formStyles.labelText}>
                    {label}
                    {required ? <RequiredStar/>: ""}
                </Text>
            )}
            <View style={[
                leftIcon ? formStyles.iconWithinTextContainer : undefined,
                containerStyles
            ]}>
                {
                    leftIcon && showTextIcon && (
                        <View style={[leftIcon ? formStyles.iconWithinTextInput : undefined]}>
                        {leftIcon}
                    </View>)}
                <TextInput
                    style={[
                        inputStyles || formStyles.textInput,
                        leftIcon && !showTextIcon ? formStyles.textIfHiddenIcon : undefined,
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    secureTextEntry={secure}
                    onChangeText={
                        changeAction && actionKey
                            ? (value) => changeAction(actionKey, value as any)
                            : undefined
                        }
                />
            </View>
        </View>
    )
}