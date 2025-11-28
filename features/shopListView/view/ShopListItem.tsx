import {View, Text} from "react-native";
import HeadingText from "@/shared/components/HeadingText";
import {GeoPoint} from "@/features/interactive-map/model/geoTypes";
import {Icons} from "@/shared/components/Icons";
import {Image} from "expo-image";
import {constructImageURL} from "@/shared/utils/constructImageURL";
import {imageStyles} from "@/shared/stylesheets";
import TextHighlight from "@/shared/components/TextHighlight";
import {DetailedInfo, openCloseTime} from "@/features/shopDetails/viewModel/useShopDetails";
import {useEffect, useState} from "react";
import {checkOpeningTime} from "@/shared/utils/checkOpeningTime";

export type ShopListItemProps = {
    name: string,
    primaryCategory: string|null,
    location: GeoPoint,
    imageId?: string|null,
    rating?: string|null,
}

type OpenTime = {
    open: boolean,
    status: string,
    time: string
}

export default function ShopListItem(props:DetailedInfo) {
    const {name, category, address, imageUrl, marketType} = props;
    const [openingTime, setOpeningTime] = useState<OpenTime>({status: "laster", time: ""} as OpenTime);

    useEffect(() => {
        setOpeningTime(checkOpeningTime(props))
    }, []);

    const getRating = () =>{
        if(marketType === "shop"){
            return (
                <>
                    <Text style={{marginRight: 5}}>{props.rating}/5</Text>
                    <Icons.star/>
                </>
            )
        }
        return null
    }

    return(
        <View style={{ backgroundColor: "#E5E5E5", flex: 1, flexDirection: 'row', justifyContent: "space-between"}}>
            {imageUrl ? <Image style={imageStyles.shopListImage} source={constructImageURL(imageUrl)}/> : <Icons.noImage width={100} height={100}/>}

            <View style={{width: "55%"}}>
                <HeadingText heading={name} type={'ShopText'}/>
                <Text>{category}</Text>
                <Text>{address}</Text>
                <Text><TextHighlight customStyle={openingTime.open ? {color: "#264B40"}: {color: "#4B2626"}}>{openingTime.status}</TextHighlight> {openingTime.time}</Text>
            </View>
            <View style={{flex: 1, flexDirection: "column", justifyContent: "space-between", height: 100, margin: 5}}>
                <View style={{height: "70%", alignSelf: "flex-end"}}>
                    <Icons.hollowHeart width={30} height={30}/>
                </View>
                <View style={{flex: 1, flexDirection: "row", height: "30%", alignItems: "center", justifyContent: "space-between"}}>
                    {getRating()}
                </View>
            </View>
        </View>
    )
}