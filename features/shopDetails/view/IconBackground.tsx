import {View} from "react-native";
import {ReactNode} from "react";

export default function IconBackground({children}: {children: ReactNode}) {
    return(
        <View style={{backgroundColor: "#264B40", borderRadius: 30, padding: 3}}>
            {children}
        </View>
    )
}