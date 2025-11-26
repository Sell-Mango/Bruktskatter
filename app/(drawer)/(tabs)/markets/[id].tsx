import { Text } from 'react-native'
import {useLocalSearchParams} from "expo-router";
import DetailsLayout from "@/features/shopDetails/view/DetailsLayout";
import UserLocationProvider from "@/shared/context/UserLocationProvider";

export default function Market(){
    const {id} = useLocalSearchParams()
    return (
        <UserLocationProvider>
            <DetailsLayout/>
        </UserLocationProvider>
    )
}