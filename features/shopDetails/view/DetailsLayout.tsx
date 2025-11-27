import {View, Text, Animated} from "react-native";
import useShopDetails from "@/features/shopDetails/viewModel/useShopDetails";
import HeadingText from "@/shared/components/HeadingText";
import {Icons} from "@/shared/components/Icons";
import ShopInfoPanel from "@/features/shopDetails/view/ShopInfoPanel";
import ShopLayout from "@/features/shopDetails/view/ShopLayout";
import {type ShopInfo, type MarketInfo} from "@/features/shopDetails/viewModel/useShopDetails";
import TextHighlight from "@/shared/components/TextHighlight";
import OpeningHoursToggle from "@/features/shopDetails/view/OpeningHoursToggle";
import ScrollView = Animated.ScrollView;
import MarketLayout from "@/features/shopDetails/view/MarketLayout";
import {formatOpeningDates} from "@/features/shopDetails/viewModel/formatOpeningDates";

export default function DetailsLayout() {
    const {shopDetails, loading} = useShopDetails();

    if(loading) {
        return (
            <Text>Loading...</Text>
        )
    }
    if (!shopDetails) {
        return <HeadingText heading={"Fant ikke denne butikken"} type={"h1"}/>
    }
    const MarketTypeCheck = ()=>{
        if (shopDetails.marketType === "shop") {
            return (
                <ShopLayout shopInfo={shopDetails}>
                    <ShopInfoPanel address={shopDetails.address}>
                        <OpeningHoursToggle openingHours={shopDetails.openingHours}/>
                    </ShopInfoPanel>
                </ShopLayout>
            )
        }
        if (shopDetails.marketType === "marked") {
            return(
                <MarketLayout marketInfo={shopDetails}>
                    <ShopInfoPanel address={shopDetails.address}>
                        <Text>{formatOpeningDates(shopDetails.dateFrom, shopDetails.dateTo)}</Text>
                    </ShopInfoPanel>
                </MarketLayout>
            )
        }

    }

    return (
        <ScrollView style={{width:'100%'}}>
            <View style={{margin: 20, gap: 12}}>
                <Text>{shopDetails.category}</Text>
                <HeadingText heading={shopDetails.name} type={"h1"} customStyle={{textAlign: "left"}}/>
                {MarketTypeCheck()}
            </View>
        </ScrollView>

    )
}