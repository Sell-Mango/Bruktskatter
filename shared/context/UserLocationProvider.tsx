import {createContext, ReactNode, useContext, useEffect, useRef, useState} from "react";
import * as Location from 'expo-location';
import {UserLocation} from "@/shared/types/UserLocation";
import {LocationGeocodedAddress, LocationSubscription} from "expo-location";
import {GeoPoint} from "@/features/interactive-map/model/geoTypes";

interface UserLocationContextType {
    location: UserLocation | null;
    error: string | null;
    isLoading: boolean;
    getCurrentLocation: () => Promise<UserLocation | null>;
    getAddressFromGeocode: (lngLat: GeoPoint) => Promise<LocationGeocodedAddress[] | null>;
}

const UserLocationContext = createContext<UserLocationContextType>({
    location: null,
    error: null,
    isLoading: false,
    getCurrentLocation: async () => null,
    getAddressFromGeocode: async () => null,
});

export default function UserLocationProvider({ children }: { children: ReactNode }) {
    const [location, setLocation] = useState<UserLocation | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const currentLocation = useRef<UserLocation | null>(null);

    const updateLocation = (location: Location.LocationObject) => {
        const updatedLocation: UserLocation = {
            lng: location.coords.longitude,
            lat: location.coords.latitude,
        }
        setLocation(updatedLocation);
        currentLocation.current = updatedLocation;
    }

    const requestUserLocation = async () => {

        const hasPermission = await Location.requestForegroundPermissionsAsync();
        if (!hasPermission.granted) {
            setIsLoading(false);
            throw new Error("Access to location was denied");
        }
    }

    const requestWatchPosition = async () => {
        let locationSubscription: Location.LocationSubscription | null = null;
        setIsLoading(true);

        try {
            await requestUserLocation();

            const initialLocation = await Location.getCurrentPositionAsync();
            updateLocation(initialLocation);

            await Location.watchPositionAsync({}, updateLocation);

            return locationSubscription;
        }
        catch(error: any) {
            setError(error.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    const getCurrentLocation = async () => {
        setIsLoading(true);
        const location = await Location.getCurrentPositionAsync();
        if(!location) {
            setError("Access to location was denied");
            setIsLoading(false);
            return null;
        }
        updateLocation(location);
        setIsLoading(false);

        return {lng: location.coords.longitude, lat: location.coords.latitude};
    }

    const getAddressFromGeocode = async (geoGode: GeoPoint) => {
        setIsLoading(true);
        try {
            const address = await Location.reverseGeocodeAsync({ latitude: geoGode.lat, longitude: geoGode.lng });
            if(!address) {
                setError("GeoLocation was denied");
                setIsLoading(false);
                return null;
            }
            setIsLoading(false);
            return address;
        }
        catch(error: any) {
            setError(error.message);
            setIsLoading(false);
            return null;
        }

    }

    useEffect(() => {
        let subscription: Location.LocationSubscription | null = null;

        const initLocation = async () => {
            subscription = await requestWatchPosition();
        }

        initLocation();

        return () => {
            if(subscription){
                subscription.remove();
            }
        }
    }, [])

    return (
        <UserLocationContext.Provider value={{
            location,
            error,
            isLoading,
            getCurrentLocation,
            getAddressFromGeocode
        }}>
            {children}
        </UserLocationContext.Provider>

        )
}

export const useUserLocation = () => {
    const context = useContext(UserLocationContext);
    if(!context){
        throw new Error("useUserLocation must be used within the context!");
    }
    return context;
}