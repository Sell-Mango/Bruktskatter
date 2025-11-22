import { shopLocationRow } from "@/features/interactive-map/repository/shopLocationsRepository";
import { ShopMarker } from "@/features/interactive-map/model/shopMarker";

export const formatLocations = (
    rows: shopLocationRow[]
): ShopMarker[] => {

    return rows.map((marker) => ({
        id: marker.$id,
        latitude: marker.location[1],
        longitude: marker.location[0],
        name: marker.name,
        category: marker.primaryCategory
    }));
}