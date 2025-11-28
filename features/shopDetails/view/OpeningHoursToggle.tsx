import {openingHours} from "../viewModel/useShopDetails"
import {Pressable, Text, View} from "react-native";
import TextHighlight from "@/shared/components/TextHighlight";
import {useState} from "react";
import {Icons} from "@/shared/components/Icons";
import {containerStyles} from "@/shared/stylesheets";
import {OpenTime} from "@/shared/types/OpenTime";
import OpeningTimeText from "@/shared/components/OpeningTimeText";

export default function OpeningHoursToggle({openingHours, openTime}: {openingHours:openingHours|null,openTime:OpenTime}) {
    const [expanded, setExpanded] = useState<boolean>(false);

    function toggleExpanded() {
        setExpanded(!expanded);
    }

    return (
        <View style={{margin: 3}}>
            <Pressable
                onPress={toggleExpanded}
                style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}
            >
                <Text>
                    {expanded ? <Text>Åpningstider:</Text> : <OpeningTimeText {...openTime}/>}
                </Text>
                {expanded ? <Icons.accordionUp/> : <Icons.accordionDown/>}
            </Pressable>
            {expanded && (
                <View style={{ marginVertical: 10, flex: 1, flexDirection: "column", flexBasis: "auto"}}>
                    {Object.entries(openingHours || {}).map(([day, hours]) => (
                        <Text key={day}>
                            {day.charAt(0).toUpperCase() + day.slice(1)}: {hours?.open || "Stengt"} - {hours?.close || "Stengt"}
                        </Text>
                    ))}
                </View>
            )}
        </View>
    )
}