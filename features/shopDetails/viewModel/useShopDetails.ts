import {useEffect, useState} from "react";
import {getShopDetails} from "@/services/appwrite/database";
import {useLocalSearchParams} from "expo-router";
import {Models} from "react-native-appwrite";
import {shopLocation} from "@/features/interactive-map/model/shopLocationData";
import {useUserLocation} from "@/shared/context/UserLocationProvider";
import {ShopDetails, shopDetailsData} from "@/features/shopDetails/model/shopDetailsData";

type openCloseTime = {
    open: string;
    close: string;
}

export type openingHours = {
    monday: openCloseTime|null;
    tuesday: openCloseTime|null;
    wednesday: openCloseTime|null;
    thursday: openCloseTime|null;
    friday: openCloseTime|null;
    saturday: openCloseTime|null;
    sunday: openCloseTime|null;
}

export type MarketInfo = {
    marketType: "marked";
    category: string|null;
    name: string;
    description: string|null;
    address: string;
    dateFrom: Date|null;
    dateTo: Date|null;
}

export type ShopInfo = {
    marketType: "shop";
    category: string|null;
    name: string;
    description: string|null;
    address: string;
    openingHours: openingHours|null;
    rating: string|null
}

type DetailedInfo = ShopInfo | MarketInfo;

export default function useShopDetails() {
    const [shopDetails, setShopDetails] = useState<DetailedInfo|null>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string|null>(null)
    const {id} = useLocalSearchParams()
    const {getAddressFromGeocode} = useUserLocation()

    const fetchShopDetails = async (rowID:string) => {
        setLoading(true);
        const response = await getShopDetails(rowID)
        try{
            const parsedShopDetails = shopDetailsData.parse(response)
            console.log(parsedShopDetails)
            toShopDetails(parsedShopDetails)
        }catch(e){
            console.error(e)
        }

        setLoading(false);
    }

    const toShopDetails = async (fetchedDetails:ShopDetails) => {
        const {shopMeta, marketMeta, marketTypes: {marketType}, location} = fetchedDetails;
        let formatedAddress = ""
        if (!fetchedDetails) {
            return;
        }
        if (!fetchedDetails.adress){
            try {
                const addressResponse = await getAddressFromGeocode({lat: location[1], lng: location[0]});
                if (addressResponse) {
                    formatedAddress = `${addressResponse[0].street} ${addressResponse[0].streetNumber}, ${addressResponse[0].subregion}`
                }
            }catch(error){
                console.error(error)
            }
        }
        else {
            formatedAddress = fetchedDetails.adress
        }

        switch (marketType) {
            case "shop":
                setShopDetails({
                    marketType: marketType,
                    category: fetchedDetails.primaryCategory,
                    name: fetchedDetails.name,
                    description: fetchedDetails.description,
                    address: formatedAddress,
                    openingHours: shopMeta ? shopMeta.openingHours : null,
                    rating: shopMeta ? shopMeta.rating : null,
                });
                break;
            case "marked":
                setShopDetails({
                    marketType: marketType,
                    category: fetchedDetails.primaryCategory,
                    name: fetchedDetails.name,
                    description: fetchedDetails.description,
                    address: formatedAddress,
                    dateFrom: marketMeta ? marketMeta.dateFrom : null,
                    dateTo: marketMeta ? marketMeta.dateTo : null,
                })
                break;
            default:
                setError("Unknown marketType");
        }
    }

    useEffect(() => {
        fetchShopDetails(id.toString())
    },[id])

    return {shopDetails, loading}
}