import {ComponentRef, useEffect, useRef, useState} from "react";
import {MapView} from "@maplibre/maplibre-react-native"
import {GeoPoint} from "@/features/interactive-map/model/geoTypes";
import {getShopsWithinRadius} from "@/features/interactive-map/services/shopLocationsService";
import {shopLocationRow} from "@/features/interactive-map/repository/shopLocationsRepository";
import {ShopListItemProps} from "@/features/shopListView/view/ShopListItem";

const FALLBACK_GEO: GeoPoint = {lng: 10.9339, lat: 59.2203}

export const useGetShops = () => {


    const [shops, setShops] = useState<shopLocationRow[]>([])

    const fetchShopsWithinRadius = async () => {
        const shopRow = await getShopsWithinRadius(FALLBACK_GEO, 1250)
        setShops(shopRow)
    }

    useEffect(() => {
        fetchShopsWithinRadius()
    },[])

    return {shops}
}