import {View, Text} from "react-native";
import HeadingText from "@/shared/components/HeadingText";
import { Icons } from "@/shared/components/Icons";
import ShopInfoRow from "@/features/shopDetails/view/ShopInfoRow";
import IconBackground from "@/features/shopDetails/view/IconBackground";
import {containerStyles} from "@/shared/stylesheets";
import TextHighlight from "@/shared/components/TextHighlight";
import {openingHours} from "@/features/shopDetails/viewModel/useShopDetails";
import {ReactNode, useState} from "react";
import OpeningHoursToggle from "@/features/shopDetails/view/OpeningHoursToggle";

type infoPanelProps = {
    address: string;
    children: ReactNode;
}

export default function ShopInfoPanel(props: infoPanelProps) {
    const {address, children} = props;

    return (
        <View style={containerStyles.roundedInfoContainer}>
            <HeadingText heading={"Bruktbutikk"} type={"h3"} customStyle={{textAlign: "left"}}/>
            <View style={{flex: 1,flexDirection: "column", justifyContent: "space-evenly", gap: 10}}>
                <ShopInfoRow>
                    <IconBackground>
                        <Icons.mapMarker fill={"#FAAF3A"}/>
                    </IconBackground>
                    <Text style={{margin: 3}}>{address}</Text>
                </ShopInfoRow>
                <ShopInfoRow>
                    <IconBackground>
                        <Icons.clock fill={"#FAAF3A"}/>
                    </IconBackground>
                    {children}
                </ShopInfoRow>
                <ShopInfoRow>
                    <IconBackground>
                        <Icons.globe color={"#FAAF3A"} fill={"none"}/>
                    </IconBackground>
                    <Text style={{textDecorationLine: "underline", margin: 3}}>Gå til nettsted (forlat appen)</Text>
                </ShopInfoRow>
            </View>
        </View>
    )
}