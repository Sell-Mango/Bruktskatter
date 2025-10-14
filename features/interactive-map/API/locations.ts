    import { ShopMarker } from "../types/shopMarker"
    import { Region } from "react-native-maps"

    export const INITREGION: Region = {
        latitude: 59.22071885211767,
      longitude: 10.93723126724585, 
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }
    
    export const LOCATIONS: ShopMarker[] = [
      {
        id: "1",
        latitude: 59.213670429956835,
        longitude: 10.936546014021003, 
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
        name: "Fretex bruktbutikk"
      },
      {
        id: "2",
        latitude: 59.21306182937022,
        longitude: 10.935999868089652, 
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
        name: "Tante Blå Gjenbruk"
      },
      {
        id: "3",
        latitude: 59.23191639509626,
        longitude: 10.911479816248903, 
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
        name: "Antikk og brukt Centralen"
      },
      {
        id: "4",
        latitude: 59.23285739065815,
        longitude: 0.907433882345156, 
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
        name: "Fasvo bruktmarked"
      },
      {
        id: "5",
        latitude: 59.21272376018721,
        longitude: 10.940170469509514, 
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
        name: "Østfold bruktformidling"
      },
      {
        id: "6",
        latitude: 59.20697094066875,
        longitude: 10.945541658445077, 
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
        name: "Lokalet Fredrikstad"
      },
    ]