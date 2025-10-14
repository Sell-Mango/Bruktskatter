import { Region } from "react-native-maps";

export interface ShopMarker extends Region {
    id: string,
    name: string,
}