import {ReactNode} from "react";
import {View, Text} from "react-native";
import {ShopInfo} from "@/features/shopDetails/viewModel/useShopDetails";
import ShopInfoPanel from "@/features/shopDetails/view/ShopInfoPanel";
import { Icons } from "@/shared/components/Icons";

export default function ShopLayout({children, shopInfo}:{children:ReactNode, shopInfo:ShopInfo}) {
    const {rating, description} = shopInfo;

    return (
        <>
            <View style={{flex: 1, flexDirection: "row", alignItems: "center", minHeight: 30}}>
                <View style={{flex: 1, flexDirection: "row", alignItems: "center", columnGap: 5}}>
                    <Icons.hollowHeart width={30} height={30}/>
                    <Text>180</Text>
                </View>
                <View style={{flex: 1, flexDirection: "row", alignItems: "center", columnGap: 5}}>
                    <Text>{rating}/5</Text>
                    <Icons.star/>
                </View>
            </View>
            <Text>{description}</Text>
            {children}
        </>
    )
}