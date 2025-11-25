import {View, Text} from "react-native";
import {Link} from "expo-router";
import HeadingText from "@/shared/components/HeadingText";
import { Icons } from "@/shared/components/Icons";

type infoPanelProps = {
    address: string;
    openingTime: string;
}

export default function ShopInfoPanel(props: infoPanelProps) {
    const {address, openingTime} = props;

    return (
        <View style={{borderWidth: 1, borderColor: "#8C8C8C", borderRadius: 12, padding: 15, margin: 20, flex: 1, rowGap: 20, minHeight: 177}}>
            <HeadingText heading={"Bruktbutikk"} type={"h3"} customStyle={{textAlign: "left"}}/>
            <View style={{flex: 1, flexDirection: "row", alignItems: "center", columnGap: 12}}>
                <View style={{backgroundColor: "#264B40", borderRadius: 30, padding: 3}}>
                    <Icons.mapMarker fill={"#FAAF3A"}/>
                </View>
                <Text>{address}</Text>
            </View>
            <View style={{flex: 1, flexDirection: "row", alignItems: "center", columnGap: 12}}>
                <View style={{backgroundColor: "#264B40", borderRadius: 30, padding: 3}}>
                    <Icons.clock fill={"#FAAF3A"}/>
                </View>
                <Text><Text style={{fontWeight: "800", color: "#264B40"}}>Åpent</Text>, stenger kl {openingTime}</Text>
            </View>
            <View style={{flex: 1, flexDirection: "row", alignItems: "center", columnGap: 12}}>
                <View style={{backgroundColor: "#264B40", borderRadius: 30, padding: 3}}>
                    <Icons.clock fill={"#FAAF3A"}/>
                </View>
                <Link href={"https://www.google.com/search?q=" + address}>
                    <Text>Gå til nettsted (forlat appen)</Text>
                </Link>
            </View>
        </View>
    )
}