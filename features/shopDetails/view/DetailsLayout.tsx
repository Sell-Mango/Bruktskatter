import {View, Text, Animated} from "react-native";
import useShopDetails from "@/features/shopDetails/viewModel/useShopDetails";
import HeadingText from "@/shared/components/HeadingText";
import ShopInfoPanel from "@/features/shopDetails/view/ShopInfoPanel";
import ShopLayout from "@/features/shopDetails/view/ShopLayout";
import OpeningHoursToggle from "@/features/shopDetails/view/OpeningHoursToggle";
import ScrollView = Animated.ScrollView;
import MarketLayout from "@/features/shopDetails/view/MarketLayout";
import {formatOpeningDates} from "@/features/shopDetails/viewModel/formatOpeningDates";
import {Image} from "expo-image";
import {constructImageURL} from "@/shared/utils/constructImageURL";
import {Icons} from "@/shared/components/Icons";
import {checkOpeningTime} from "@/shared/utils/checkOpeningTime";
import TextHighlight from "@/shared/components/TextHighlight";
import OpeningTimeText from "@/shared/components/OpeningTimeText";

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
                        <OpeningHoursToggle openingHours={shopDetails.openingHours} openTime={checkOpeningTime(shopDetails)}/>
                    </ShopInfoPanel>
                </ShopLayout>
            )
        }
        if (shopDetails.marketType === "marked") {
            const openTime = checkOpeningTime(shopDetails)
            return(
                <MarketLayout marketInfo={shopDetails}>
                    <ShopInfoPanel address={shopDetails.address}>
                        <OpeningTimeText {...openTime}/>
                    </ShopInfoPanel>
                </MarketLayout>
            )
        }

    }

    return (
        <ScrollView style={{width:'100%', backgroundColor: '#F6F6E9'}}>
            {shopDetails.imageUrl ?
                <Image style={{width: "100%", height: 300, borderBottomRightRadius: 20, borderBottomLeftRadius: 20}} source={constructImageURL(shopDetails.imageUrl)}/>
                :
                <Icons.noImage height={300} width={"100%"}/>
            }
            <View style={{margin: 20, gap: 12}}>
                <Text>{shopDetails.category}</Text>
                <HeadingText heading={shopDetails.name} type={"h1"} customStyle={{textAlign: "left"}}/>
                {MarketTypeCheck()}
            </View>
        </ScrollView>

    )
}