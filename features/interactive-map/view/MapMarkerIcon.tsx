import {Icons} from "@/shared/components/Icons";


type IconOption = {
    icon: React.ComponentType<any>;
    primaryColor?: string;
    secondaryColor?: string;
};

const PRIMARY_COLOR = "#ffffff";

const iconOptions: Record<string, IconOption> = {
    antikk: {
        icon: Icons.marker.antique,
        primaryColor: "#FFF2E0",
        secondaryColor: PRIMARY_COLOR
    },
    klær: {
        icon: Icons.marker.clothes,
        primaryColor: "#f18d00",
        secondaryColor: PRIMARY_COLOR
    },
    møbler: {
        icon: Icons.marker.furniture,
        primaryColor: "#444444",
        secondaryColor: PRIMARY_COLOR
    },
    spill: {
        icon: Icons.marker.game,
        primaryColor: "#673ab7",
        secondaryColor: PRIMARY_COLOR
    },
    musikk: {
        icon: Icons.marker.music,
        primaryColor: "#c90076",
        secondaryColor: PRIMARY_COLOR
    },
    garasjesalg: {
        icon: Icons.marker.garage,
        primaryColor: "#34a853",
        secondaryColor: PRIMARY_COLOR
    },
    julemarked: {
        icon: Icons.marker.christmas,
        primaryColor: "#ea4335",
        secondaryColor: PRIMARY_COLOR
    },
    loppemarked: {
        icon: Icons.marker.booth,
        primaryColor: "#34a853",
        secondaryColor: PRIMARY_COLOR
    },
    bruktmarked: {
        icon: Icons.marker.booth,
        primaryColor: "#34a853",
        secondaryColor: PRIMARY_COLOR
    },
    bruktbutikk: {
        icon: Icons.marker.default,
        primaryColor: "#1a73e8",
        secondaryColor: PRIMARY_COLOR
    },
    default: {
        icon: Icons.marker.default,
        primaryColor: "#1a73e8",
        secondaryColor: PRIMARY_COLOR
    }
};

export default function MapMarkerIcon({
    category,
    size = 40
}: {
    category?: string | null;
    size?: number;

}) {

    const config = iconOptions[category ?? "default"] ?? iconOptions["default"];
    const MapMarkerIcon = config.icon;

    return (
        <MapMarkerIcon
            primaryColor={config.primaryColor}
            secondaryColor={config.secondaryColor}
            size={size}
        />
    )
}

