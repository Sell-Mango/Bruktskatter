import { useEffect, useState} from "react";
import {GeoPoint} from "@/features/interactive-map/model/geoTypes";
import {getShopsWithinRadius} from "@/features/interactive-map/services/shopLocationsService";
import {shopLocationRow} from "@/features/interactive-map/repository/shopLocationsRepository";
import {ShopDetails, shopDetailsData} from "@/features/shopDetails/model/shopDetailsData";
import {DetailedInfo} from "@/features/shopDetails/viewModel/useShopDetails";
import {formatMarketRow} from "@/shared/utils/formatMarketRow";
import {shopLocationData} from "@/features/interactive-map/model/shopLocationData";

const FALLBACK_GEO: GeoPoint = {lng: 10.9339, lat: 59.2203}

export const useGetShops = () => {
    const [shops, setShops] = useState<DetailedInfo[]>([])

    const fetchShopsWithinRadius = async () => {
        const shopRow = await getShopsWithinRadius(FALLBACK_GEO, 1250)
        const parsedShopRow = shopRow.map((row)=>shopLocationData.parse(row))
        const formatedRows = parsedShopRow.map((row)=>formatMarketRow(row)).filter((row)=> row !== null)
        setShops(formatedRows)
    }


    useEffect(() => {
        fetchShopsWithinRadius()
    },[])

    return {shops}
}