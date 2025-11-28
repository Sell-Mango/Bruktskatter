import {View, Text, FlatList, Pressable} from 'react-native'
import {useGetShops} from "@/features/shopListView/viewModel/useGetShops";
import {shopLocationRow} from "@/features/interactive-map/repository/shopLocationsRepository";
import ShopListItem from "@/features/shopListView/view/ShopListItem";
import {type ShopListItemProps} from "@/features/shopListView/view/ShopListItem";
import {GeoPoint} from "@/features/interactive-map/model/geoTypes";
import {Link} from "expo-router";
import {Suspense} from "react";
import HeadingText from "@/shared/components/HeadingText";

export default function ShopList() {
    const {shops} = useGetShops()

    return(
        <View>
            <Text style={{margin: 15, fontSize: 16}}>
                Ditt søk viser <Text style={{fontWeight: "800"}}>{shops.length}</Text> butikker i nærheten
            </Text>
            <Suspense fallback={<HeadingText heading={"Laster..."} type={"h1"}/>}>
                <FlatList
                    data={shops}
                    renderItem={
                        ({item})=>
                            <Link href={`/markets/${item.id}`}>
                                <ShopListItem
                                    {...item}
                                />
                            </Link>
                    }
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{paddingBottom: 120, gap: 10}}
                />
            </Suspense>
        </View>
    )
}