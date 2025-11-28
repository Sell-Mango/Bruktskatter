import {View, Text, StyleSheet, useWindowDimensions, Pressable} from "react-native";
import {MarkerView} from "@maplibre/maplibre-react-native";
import {ShopLocation} from "@/features/interactive-map/model/shopLocation";
import {capitalizeFirstLetter} from "@/shared/utils/textProcessor";
import {Image} from "expo-image";
import {Icons} from "@/shared/components/Icons";
import {Link} from "expo-router";
import CalloutRow from "@/features/shopPreviewCallout/view/CalloutRow";
import {constructImageURL} from "@/shared/utils/constructImageURL";
import {calloutStyles} from "@/shared/stylesheets/mapCalloutStyles";

interface MarkerCalloutProps {
    marker: ShopLocation;
    onCloseButtonPress: () => void;
}

export default function MarkerCallout({marker, onCloseButtonPress}: MarkerCalloutProps) {
    const { $id, id, name, longitude, latitude, category, featuredImage, adress, postal } = marker;
    const { width } = useWindowDimensions();

    return (
        <MarkerView
            coordinate={[longitude, latitude]}
            allowOverlap={true}
            anchor={{ x: 0.49, y: 1.10 }}
        >
            <View style={calloutStyles.container}
                  collapsable={false}>
                <View style={[calloutStyles.content, { width: width * 0.85}]}>
                    <CalloutRow>
                        <Text style={[calloutStyles.heading, calloutStyles.textCol]}>{name}</Text>
                        <Text style={calloutStyles.category}>{capitalizeFirstLetter(category)}</Text>
                        <Pressable
                            style={calloutStyles.closeBtn}
                            onPressOut={onCloseButtonPress}
                        >
                            <Icons.close size={20} style={{color: "white"}} />
                        </Pressable>
                    </CalloutRow>

                    <CalloutRow>
                        { featuredImage &&
                            <Image
                                style={calloutStyles.featureImage}
                                contentFit={"cover"}
                                source={constructImageURL(featuredImage)}
                        />
                        }
                    </CalloutRow>
                    <CalloutRow>
                        {
                            (adress && postal) && <Text style={[calloutStyles.category, calloutStyles.textCol]}>{adress}, {postal}</Text>
                        }
                        <Text style={calloutStyles.textCol}>Åpent - stenger kl 18:00 </Text>

                    </CalloutRow>
                        <View>
                            <Link
                                style={[calloutStyles.ctaButton, calloutStyles.solidBtn]}
                                href={`/markets/${$id}/`}
                            >
                                <Text style={[calloutStyles.ctaButtonText]}>Vis butikk</Text>
                            </Link>
                        </View>

                </View>
                <View style={[calloutStyles.arrow, calloutStyles.arrowBorder]} >
                    <View style={[calloutStyles.arrow, calloutStyles.arrowInner]} />
                </View>

            </View>

        </MarkerView>
    )
}