import { useState} from "react";
import {GeoPoint} from "@/features/interactive-map/model/geoTypes";
import {getShopsWithinRadius} from "@/features/interactive-map/services/shopLocationsService";
import {DetailedInfo} from "@/features/shopDetails/viewModel/useShopDetails";
import {formatMarketRow} from "@/shared/utils/formatMarketRow";
import {shopLocationData} from "@/features/interactive-map/model/shopLocationData";
import {UserLocation} from "@/shared/types/UserLocation";

const FALLBACK_FREDRIKSTAD: GeoPoint = {lng: 10.9339, lat: 59.2203}
const FALLBACK_HALDEN: GeoPoint = {lng: 11.387457, lat: 59.132996}

export const useGetShops = () => {
    const [shops, setShops] = useState<DetailedInfo[]>([])
    const [currentLocation, setCurrentLocation] = useState<UserLocation|null>(FALLBACK_FREDRIKSTAD)
    const [loading, setLoading] = useState<boolean>(false)

    const fetchShopsWithinRadius = async (location: UserLocation) => {
        setLoading(true)

        const shopRow = await getShopsWithinRadius({lng: location.lng, lat: location.lat}, 1250)
        const parsedShopRow = shopRow.map((row)=>shopLocationData.parse(row))
        const formatedRows = parsedShopRow.map((row)=>formatMarketRow(row)).filter((row)=> row !== null)
        setShops(formatedRows)
        setLoading(false)
    }

    const updateCurrentLocation = async (location: UserLocation|null) => {
        const hasLocation = location || FALLBACK_FREDRIKSTAD;
        setCurrentLocation(hasLocation)
        await fetchShopsWithinRadius(hasLocation)
    }

    return {
        shops,
        currentLocation,
        updateCurrentLocation,
        loading,
        setLoading}
}