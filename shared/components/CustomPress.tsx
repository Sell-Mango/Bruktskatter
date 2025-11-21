import {Pressable} from "react-native";
import {buttonStyles} from "@/shared/stylesheets";

export default function CustomPress({children, pressAction}: {children: React.ReactNode, pressAction?: () => void}) {
    return (
        <Pressable style={buttonStyles.defaultButton} onPress={pressAction}>
            {children}
        </Pressable>
    )
}