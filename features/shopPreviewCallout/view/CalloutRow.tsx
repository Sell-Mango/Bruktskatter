import {View, type ViewStyle} from "react-native";


export default function CalloutRow({children, style, ...props}: {children: React.ReactNode, style?: ViewStyle|ViewStyle[], props?: any}) {

    return (
        <View style={style} {...props}>
            {children}
        </View>
    )
}