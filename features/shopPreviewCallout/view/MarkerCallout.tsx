import {View, Text, StyleSheet, useWindowDimensions, Pressable} from "react-native";
import {MarkerView} from "@maplibre/maplibre-react-native";
import {ShopLocation} from "@/features/interactive-map/model/shopLocation";
import {capitalizeFirstLetter} from "@/shared/utils/textProcessor";
import {Image} from "expo-image";
import {Icons} from "@/shared/components/Icons";
import {Link} from "expo-router";
import CalloutRow from "@/features/shopPreviewCallout/view/CalloutRow";

interface MarkerCalloutProps {
    marker: ShopLocation;
    onCloseButtonPress: () => void;
}

const BASE_STORAGE_URL = "https://fra.cloud.appwrite.io/v1/storage/buckets/68ed265f000794fcf097";
const PROJECT_ID = "68ed1413003407f999f9";

export default function MarkerCallout({marker, onCloseButtonPress}: MarkerCalloutProps) {
    const { id, name, longitude, latitude, category, featuredImage, adress, postal } = marker;
    const { width } = useWindowDimensions();

    console.log(featuredImage)

    return (
        <MarkerView
            coordinate={[longitude, latitude]}
            allowOverlap={true}
            anchor={{ x: 0.49, y: 1.15 }}
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
                            <Icons.setting size={20} style={{color: "white"}} />
                        </Pressable>
                    </CalloutRow>

                    <View>
                        { featuredImage &&
                            <Image
                                style={calloutStyles.featureImage}
                                contentFit={"cover"}
                                source={`${BASE_STORAGE_URL}/files/${featuredImage}/view?project=${PROJECT_ID}`}
                        />
                        }
                    </View>
                    <View>
                        {
                            (adress && postal) && <Text style={[calloutStyles.category, calloutStyles.textCol]}>{adress}, {postal}</Text>
                        }
                        <Text style={calloutStyles.textCol}>Åpent - stenger kl 18:00 </Text>
                        <View  style={calloutStyles.rating}>
                            <Text>4,5/5<Icons.star /></Text>
                        </View>

                    </View>
                        <View>
                            <Link
                            style={[calloutStyles.ctaButton, calloutStyles.solidBtn]}
                                href={{
                                    pathname: "/markets/[id]",
                                    params: { id: id}}}
                            >
                                Vis butikk
                            </Link>
                        </View>
                    <View>

                    </View>

                </View>
                <View style={[calloutStyles.arrow, calloutStyles.arrowBorder]} >
                    <View style={[calloutStyles.arrow, calloutStyles.arrowInner]} />
                </View>

            </View>

        </MarkerView>
    )
}


const calloutStyles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    closeBtn: {
        position: "absolute",
        backgroundColor: "#B42424",
        padding: 8,
        right: 0,
        borderRadius: 100,
    },
    content: {
        backgroundColor: '#FBFBF0',
        borderWidth: 3,
        borderColor: "#264B40",
        borderRadius: 8,
        padding: 16,
    },
    rating: {
        position: "absolute",
        right: 0,
        flexDirection: "row",
        flexWrap: "nowrap",
    },
    arrow: {
        width: 0,
        height: 0,
        borderLeftWidth: 12,
        borderRightWidth: 12,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },
    arrowBorder: {
        borderTopWidth: 25,
        alignItems: "center",
        borderTopColor: '#345b3c',
    },
    arrowInner: {
        marginTop: -36,
        borderTopWidth: 30,
        borderTopColor: '#FBFBF0',
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
    },
    category: {
        fontSize: 16,
    },
    featureImage: {
        width: "100%",
        height: 120,
        borderRadius: 4,
    },
    textCol: {
        width: "70%",
    },
    ctaButton: {
        textAlign: "center",
        width: "100%",
        alignSelf: "center",
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: "600",
        borderRadius: 34,
    },
    solidBtn: {
        backgroundColor: "#F2A731",
        color: "#264B40",
    }
});