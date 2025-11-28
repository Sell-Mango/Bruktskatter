import { ShopLocationRow } from "@/features/interactive-map/repository/shopLocationsRepository";
import { ShopLocation } from "@/features/interactive-map/model/shopLocation";

export const formatLocations = (
    rows: ShopLocationRow[]
): ShopLocation[] => {

    return rows.map((marker): ShopLocation => ({
        $id: marker.$id,
        id: marker.marketId,
        name: marker.name,
        latitude: marker.location[1],
        longitude: marker.location[0],
        category: marker.primaryCategory,
        featuredImage: marker.featuredImage,
        adress: marker.adress,
        postal: marker.postal,
    }));
}