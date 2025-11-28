import {fetchShopMarkersArea} from "@/features/interactive-map/repository/shopAreasRepository";
import {GeoPoint} from "@/features/interactive-map/model/geoTypes";
import {AreaMarker} from "@/features/interactive-map/model/AreaMarker";


export const getClustersOfShops = async (
    center: GeoPoint,
    radius: number,
    responseLimit: number = 100
) => {


    const response = await fetchShopMarkersArea(center, radius, responseLimit);

    const mappedAreas: Record<string, { areaId: string, name: string, markerCount: number; coordinates: number[] }> = {};

    for (const row of response) {
        const area = row.areas;

        if (!area) {
            continue;
        }

        const areaId = area.$id;

        if (!mappedAreas[areaId]) {

            mappedAreas[areaId] = {
                areaId: area.$id,
                name: area.name,
                markerCount: 1,
                coordinates: area.area?.[0]?.[0],
            }
        }
        else {
            mappedAreas[areaId].markerCount++;
        }
    }
    const results: AreaMarker[] = Object.values(mappedAreas).map(area => ({
        id: area.areaId,
        name: area.name,
        markerCount: area.markerCount,
        location: {lng: area.coordinates[0], lat: area.coordinates[1]}
    }))

    return results;
}




