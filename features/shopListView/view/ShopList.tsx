import {View, Text, FlatList} from 'react-native'
import {useGetShops} from "@/features/shopListView/viewModel/useGetShops";
import ShopListItem from "@/features/shopListView/view/ShopListItem";
import {Link} from "expo-router";
import { useEffect} from "react";
import HeadingText from "@/shared/components/HeadingText";
import {useUserLocation} from "@/shared/context/UserLocationProvider";

const FALLBACK_LOCATION = {lng: 10.9339, lat: 59.2203};

export default function ShopList() {
    const {shops, updateCurrentLocation, loading, setLoading} = useGetShops()
    const {getCurrentLocation} = useUserLocation()

    const handleLocation = async ()=>{
        setLoading(true);
        const currentLocation = await getCurrentLocation();

        updateCurrentLocation(currentLocation)
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