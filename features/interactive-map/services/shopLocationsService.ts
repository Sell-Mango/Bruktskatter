import {Models} from "react-native-appwrite"
import {
    fetchAllShops,
    fetchShopsWithinBoundary,
    fetchShopsWithinRadius
} from "@/features/interactive-map/repository/shopLocationsRepository";
import {GeoPoint, ViewportBoundary} from "@/features/interactive-map/model/geoTypes";

export const getShopsWithinRadius = async (
    center: GeoPoint,
    radius: number,
    responseLimit: number = 100
) => {

    const response = await fetchShopsWithinRadius(center, radius, responseLimit);
    return response;
}

export const getShopsWithinBoundary = async(
    boundary: ViewportBoundary,
    responseLimit: number = 100
) => {
    const response = await fetchShopsWithinBoundary(boundary, responseLimit);
    return response;
}