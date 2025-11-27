import {View} from "react-native";
import {Icons} from "@/shared/components/Icons";
import {iconStyles} from "@/shared/stylesheets";

export interface TabIconProps {
    icon: string,
    size?: number,
    activeSize?: number,
    focused?: boolean;
    inactiveColor?: string;
    backgroundColor?: string;
    activeColor?: string;
}

const iconOptions: Record<string, { icon: React.ComponentType<any> }> = {
    map: { icon: Icons.map, },
    treasures: { icon: Icons.hollowHeart, },
    feed: { icon: Icons.feed, },
    myMarked: { icon: Icons.market, }
}

export default function TabsIcon ({
    icon,
    size = 24,
    activeSize = 20,
    focused = false,
    inactiveColor,
    backgroundColor,
    activeColor,
}: TabIconProps) {

    const config = iconOptions[icon];
    const TabIcon = config.icon;

    return (
        <View style={[
            iconStyles.tabsIconContainer,
            focused && { backgroundColor: backgroundColor },
        ]}>
            <TabIcon
                color={focused ? activeColor : inactiveColor}
                size={focused ? activeSize : size}
            />
        </View>
    )
}

