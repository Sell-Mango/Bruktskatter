import {Text} from "react-native";

export default function LinkText({text}:{text:string}) {
    return (
        <Text style={{textDecorationLine:'underline'}}>{text}</Text>
    )
}