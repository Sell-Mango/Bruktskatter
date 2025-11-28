import {Text} from "react-native";
import TextHighlight from "@/shared/components/TextHighlight";
import {OpenTime} from "@/shared/types/OpenTime";

export default function OpeningTimeText(openTime:OpenTime) {
    return (
        <Text><TextHighlight customStyle={openTime.open ? {color: "#264B40"}: {color: "#4B2626"}}>{openTime.status}</TextHighlight> {openTime.time}</Text>
    )
}