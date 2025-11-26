import {openingHours} from "../viewModel/useShopDetails"
import {Pressable, Text, View} from "react-native";
import TextHighlight from "@/shared/components/TextHighlight";
import {useState} from "react";
import {Icons} from "@/shared/components/Icons";

export default function OpeningHoursToggle({openingHours}: {openingHours:openingHours|null}) {
    const [expanded, setExpanded] = useState<boolean>(false);

    function toggleExpanded() {
        setExpanded(!expanded);
    }

    return (
        <View style={{ marginVertical: 10 }}>
            <Pressable
                onPress={toggleExpanded}
                style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}
            >
                <Text>
                    {expanded ? <Text>Åpningstider:</Text> : <Text><TextHighlight>Åpent</TextHighlight>, stenger kl {openingHours?.monday?.close}</Text>}
                </Text>
                {expanded ? <Icons.accordionUp/> : <Icons.accordionDown/>}
            </Pressable>
            {expanded && (
                <View style={{ marginTop: 10, paddingLeft: 10 }}>
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