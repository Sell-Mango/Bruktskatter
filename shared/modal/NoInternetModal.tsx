import {Modal, Platform, View} from "react-native";
import {useNetInfo} from "@react-native-community/netinfo";
import CustomPress from "@/shared/components/CustomPress";
import HeadingText from "@/shared/components/HeadingText";
import {openSettings} from "expo-linking"
import {containerStyles} from "@/shared/stylesheets";
import {ActivityAction, startActivityAsync} from "expo-intent-launcher";

export default function NoInternetModal() {
    const netInfo = useNetInfo();
    const isOffline = netInfo.isConnected === false

    const sendUserToSettings = async () => {
        if (Platform.OS === "android") {
            await startActivityAsync(
                ActivityAction.WIFI_SETTINGS
            )
        }else {
            await openSettings()
        }
    }

    return (
        <Modal
            visible={isOffline}
            transparent={true}
            animationType="fade"
            onRequestClose={()=>{}}
        >
            <View style={containerStyles.modalBackgroundOverlay}>
                <View style={containerStyles.modalContainer}>
                    <HeadingText heading={"Ingen internettforbindelse"} type={"h1"}/>
                    <HeadingText heading={"Vennligst koble til internett for å fortsette"} type={"h2"}/>
                    <CustomPress pressAction={sendUserToSettings}><HeadingText heading={"Åpne instillinger"} type={"h2"} color={"#fff"}/></CustomPress>
                </View>
            </View>
        </Modal>
    )
}

