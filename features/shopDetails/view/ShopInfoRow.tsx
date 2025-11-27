import {ReactNode} from "react";
import {StyleProp, View, ViewStyle} from "react-native";

export default function ShopInfoRow({children, customStyle}: {children: ReactNode, customStyle?: StyleProp<ViewStyle>}) {
    return(
        <View style={[{flex: 1,flexDirection: "row", alignItems:"flex-start", columnGap: 12}, customStyle]}>
            {children}
        </View>
    )
}