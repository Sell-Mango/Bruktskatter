import {View, Text} from "react-native";
import HeadingText from "@/shared/components/HeadingText";
import {GeoPoint} from "@/features/interactive-map/model/geoTypes";
import {Icons} from "@/shared/components/Icons";
import {Image} from "expo-image";
import {constructImageURL} from "@/shared/utils/constructImageURL";
import {imageStyles} from "@/shared/stylesheets";

export type ShopListItemProps = {
    name: string,
    primaryCategory: string|null,
    location: GeoPoint,
    imageId?: string|null,
}

export default function ShopListItem(props:ShopListItemProps) {
    const {name, primaryCategory, location, imageId} = props;

    return(
        <View style={{ backgroundColor: "#E5E5E5", flex: 1, flexDirection: 'row', justifyContent: "space-between"}}>
            {imageId ? <Image style={imageStyles.shopListImage} source={constructImageURL(imageId)}/> : <Icons.noImage width={100} height={100}/>}

            <View style={{width: "55%"}}>
                <HeadingText heading={name} type={'ShopText'}/>
                <Text>{primaryCategory}</Text>
                <Text>Fredrikstad</Text>
                <Text>Åpent - Stenger kl 18:00</Text>
            </View>
            <View style={{flex: 1, flexDirection: "column", justifyContent: "space-between", height: 100, margin: 5}}>
                <View style={{height: "70%", alignSelf: "flex-end"}}>
                    <Icons.hollowHeart width={30} height={30}/>
                </View>
                <View style={{flex: 1, flexDirection: "row", height: "30%", alignItems: "center", justifyContent: "space-between"}}>
                    <Text style={{marginRight: 5}}>4.5/5</Text>
                    <Icons.star/>
                </View>
            </View>
        </View>
    )
}