import {ZoomControl} from "@/features/interactive-map/model/zoomControl";
import {useState} from "react";

const ZOOM_LEVELS = {
    INITIAL_ZOOM: 12,
    AREA: 11,
    SMALL_MARKERS: 13,
    MEDIUM_MARKERS: 15,
    LARGE_MARKERS: 17,
}

export const useZoomControl = () => {
    const [currentZoom, setCurrentZoom] = useState<ZoomControl>
    ({
        currentZoom: ZOOM_LEVELS.INITIAL_ZOOM,
        shouldFetchMarkers: false,
        display: 'small',
    })

    const updateZoom = (zoom: number) => {
        setCurrentZoom({
            currentZoom: zoom,
            shouldFetchMarkers: zoom > ZOOM_LEVELS.AREA,
            display: getDisplay(zoom)

        })
    }

    const getDisplay = (zoom: number) => {
        if (zoom <= ZOOM_LEVELS.AREA) {
            return "hidden";
        }

        if (zoom <= ZOOM_LEVELS.SMALL_MARKERS) {
            return "small"
        }

        if (zoom <= ZOOM_LEVELS.MEDIUM_MARKERS) {
            return "medium"
        }
        return "large"

    }

    return {
        ZOOM_LEVELS,
        currentZoom,
        updateZoom,
        getDisplay
    }
}

