import {useEffect, useState} from "react";
import {getShop} from "@/services/appwrite/database";
import {useLocalSearchParams} from "expo-router";
import {Models} from "react-native-appwrite";
import {shopLocation} from "@/features/interactive-map/model/shopLocationData";
import {useUserLocation} from "@/shared/context/UserLocationProvider";

type ShopInfo = {
    category: string|null;
    name: string;
    description: string|null;
    address: string;
}

export default function useShopDetails() {
    const [shopDetails, setShopDetails] = useState<ShopInfo|null>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const {id} = useLocalSearchParams()
    const {getAddressFromGeocode} = useUserLocation()

    const fetchShopDetails = async (rowID:string) => {
        setLoading(true);
        const response = await getShop(rowID)
        toShopDetails(response)
        setLoading(false);
    }

    const toShopDetails = async (response:Models.Row & shopLocation|null) => {
        if (!response) {
            return;
        }
        try{
            const addressResponse = await getAddressFromGeocode({lat: response.location[1], lng: response.location[0]});
            let formatedAddress = ""
            if (addressResponse) {
                formatedAddress = `${addressResponse[0].street} ${addressResponse[0].streetNumber}, ${addressResponse[0].subregion}`
            }
            const info: ShopInfo = {
                category: response.primaryCategory,
                name: response.name,
                description: response.description,
                address: formatedAddress,

            }
            setShopDetails(info);
        }
        catch(error){
            console.warn(error)
        }
    }

    useEffect(() => {
        fetchShopDetails(id.toString())
    },[id])

    return {shopDetails, loading}
}