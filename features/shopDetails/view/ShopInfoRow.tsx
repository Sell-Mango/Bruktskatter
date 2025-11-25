import {ReactNode} from "react";
import {View} from "react-native";

export default function ShopInfoRow({children}: {children: ReactNode}) {
    return(
        <View style={{flex: 1,flexDirection: "row", alignItems: "center", columnGap: 12}}>
            {children}
        </View>
    )
}