import {View, Text, FlatList} from 'react-native'
import {useGetShops} from "@/features/shopListView/viewModel/useGetShops";
import {shopLocationRow} from "@/features/interactive-map/repository/shopLocationsRepository";
import ShopListItem from "@/features/shopListView/view/ShopListItem";
import {type ShopListItemProps} from "@/features/shopListView/view/ShopListItem";
import {GeoPoint} from "@/features/interactive-map/model/geoTypes";

export default function ShopList() {
    const {shops} = useGetShops()

    return(
        <View>
            <Text style={{margin: 15, fontSize: 16}}>
                Ditt søk viser <Text style={{fontWeight: "800"}}>{shops.length}</Text> butikker i nærheten
            </Text>
            <FlatList
                data={shops}
                renderItem={
                    ({item})=>
                        <ShopListItem
                            name={item.name}
                            primaryCategory={item.primaryCategory}
                            location={{lng:item.location[0], lat:item.location[1]}}
                            imageId={item.featuredImage}
                        />
                }
                keyExtractor={(item) => item.marketId.toString()}
                contentContainerStyle={{paddingBottom: 120}}
            />
        </View>
    )
}