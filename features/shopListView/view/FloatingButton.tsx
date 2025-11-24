import {View, Text} from "react-native";
import CustomPress from "@/shared/components/CustomPress";
import {buttonStyles, containerStyles} from "@/shared/stylesheets";
import HeadingText from "@/shared/components/HeadingText";
import {Icons} from "@/shared/components/Icons";

export default function FloatingButton({mapView, setMapView}:{mapView:boolean, setMapView:(setMapView:boolean)=>void}) {
    return(
        <View style={containerStyles.floatingContainer}>
            {mapView ?
                <CustomPress style={buttonStyles.floatingButton} pressAction={()=>setMapView(false)}>
                    <Icons.list width={30} height={30}/>
                    <HeadingText heading={"Vis Liste"} type={"h2"} color={"#000"}/>
                </CustomPress>
                :
                <CustomPress style={[buttonStyles.floatingButton, {backgroundColor: "#1F1D1E"}]} pressAction={()=>setMapView(true)}>
                    <Icons.map width={30} height={30} fill={"#fff"}/>
                    <HeadingText heading={"Vis Kart"} type={"h2"} color={"#fff"}/>
                </CustomPress>
            }

        </View>
    )
}