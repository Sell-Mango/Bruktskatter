import {View, Text, FlatList, Pressable} from 'react-native'
import {useGetShops} from "@/features/shopListView/viewModel/useGetShops";
import {shopLocationRow} from "@/features/interactive-map/repository/shopLocationsRepository";
import ShopListItem from "@/features/shopListView/view/ShopListItem";
import {type ShopListItemProps} from "@/features/shopListView/view/ShopListItem";
import {GeoPoint} from "@/features/interactive-map/model/geoTypes";
import {Link} from "expo-router";
import {Suspense, useEffect} from "react";
import HeadingText from "@/shared/components/HeadingText";
import {useUserLocation} from "@/shared/context/UserLocationProvider";

export default function ShopList() {
    const {shops, updateCurrentLocation, loading, setLoading} = useGetShops()
    const {getCurrentLocation} = useUserLocation()

    const handleLocation = async ()=>{
        setLoading(true);
        //const currentLocation = await getCurrentLocation();
        updateCurrentLocation({lng: 10.9339, lat: 59.2203})
    }

    useEffect(() => {
        handleLocation()
    }, [])

    return(
        <View>
            <Text style={{margin: 15, fontSize: 16}}>
                Ditt søk viser <Text style={{fontWeight: "800"}}>{shops.length}</Text> butikker i nærheten
            </Text>
            {loading ? (
                <HeadingText heading={"Laster..."} type={"h1"}/>
            ):(
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
            )}
        </View>
    )
}