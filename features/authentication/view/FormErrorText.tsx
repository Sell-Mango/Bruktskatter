import {Text} from "react-native";
import {errorStyles} from "@/shared/stylesheets";

export default function FormErrorText({errorText}:{errorText:string|null}){
    if(errorText == null){
        return
    }

    return(
        <Text style={errorStyles.defaultError}>{errorText}</Text>
    )
}