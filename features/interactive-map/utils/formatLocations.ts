import { shopLocationRow } from "@/features/interactive-map/repository/shopLocationsRepository";
import { ShopLocation } from "@/features/interactive-map/model/shopLocation";

export const formatLocations = (
    rows: shopLocationRow[]
): ShopLocation[] => {

    return rows.map((marker) => ({
        id: marker.$id,
        latitude: marker.location[1],
        longitude: marker.location[0],
        name: marker.name,
        category: marker.primaryCategory
    }));
}