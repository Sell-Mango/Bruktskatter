import { Text } from 'react-native'
import {useLocalSearchParams} from "expo-router";
import ShopLayout from "@/features/shopDetails/view/ShopLayout";
import UserLocationProvider from "@/shared/context/UserLocationProvider";

export default function Market(){
    const {id} = useLocalSearchParams()
    return (
        <UserLocationProvider>
            <ShopLayout/>
        </UserLocationProvider>
    )
}