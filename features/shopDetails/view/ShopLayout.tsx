import {View, Text} from "react-native";
import useShopDetails from "@/features/shopDetails/viewModel/useShopDetails";
import HeadingText from "@/shared/components/HeadingText";
import {Icons} from "@/shared/components/Icons";
import ShopInfoPanel from "@/features/shopDetails/view/ShopInfoPanel";

export default function ShopLayout() {
    const {shopDetails} = useShopDetails();

    if (!shopDetails) {
        return <HeadingText heading={"Fant ikke denne butikken"} type={"h1"}/>
    }

    return (
        <View>
            <Text>{shopDetails.primaryCategory}</Text>
            <HeadingText heading={shopDetails.name} type={"h1"}/>
            <View style={{flex: 1, flexDirection: "column", justifyContent: "space-between"}}>
                <View>
                    <Icons.hollowHeart width={30} height={30}/>
                </View>
                <View style={{flex: 1}}>
                    <Text>4.5/5</Text>
                    <Icons.star/>
                </View>
            </View>
            <Text>{shopDetails.description}</Text>
            <ShopInfoPanel address={"Mosseveien 102, Fredrikstad"} openingTime={"18:00"}/>
            <Text>{shopDetails.location}</Text>
        </View>
    )
}