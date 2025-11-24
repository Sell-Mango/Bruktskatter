import {Pressable,type ViewStyle} from "react-native";
import {buttonStyles} from "@/shared/stylesheets";

export default function CustomPress({children, pressAction, style}: {children: React.ReactNode, pressAction?: () => void, style?: ViewStyle|ViewStyle[]}) {
    return (
        <Pressable style={style ? style :buttonStyles.defaultButton} onPress={pressAction}>
            {children}
        </Pressable>
    )
}