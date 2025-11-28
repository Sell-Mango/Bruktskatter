import {Text, View} from "react-native";
import {Icons} from "@/shared/components/Icons";
import {ReactNode} from "react";
import {MarketInfo} from "@/features/shopDetails/viewModel/useShopDetails";

export default function MarketLayout({children, marketInfo}:{children:ReactNode, marketInfo:MarketInfo}){
    const {description} = marketInfo;

    return (
        <>
            <View style={{flex: 1, flexDirection: "row", alignItems: "center", minHeight: 30}}>
                <View style={{flex: 1, flexDirection: "row", alignItems: "center", columnGap: 5}}>
                    <Icons.hollowHeart width={30} height={30}/>
                    <Text>180</Text>
                </View>
            </View>
            <Text>{description ? description: "Informasjon kommer..."}</Text>
            {children}
        </>
    )
}