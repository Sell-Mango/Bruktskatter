import {useEffect, useState} from "react";
import {getShop} from "@/services/appwrite/database";
import {useLocalSearchParams} from "expo-router";
import {Models} from "react-native-appwrite";
import {shopLocation} from "@/features/interactive-map/model/shopLocationData";

export default function useShopDetails() {
    const [shopDetails, setShopDetails] = useState<Models.Row & shopLocation|null>()
    const {id} = useLocalSearchParams()

    const fetchShopDetails = async (rowID:string) => {
        const response = await getShop(rowID)
        setShopDetails(response)
    }

    useEffect(() => {
        fetchShopDetails(id.toString())
    },[id])

    return {shopDetails}
}