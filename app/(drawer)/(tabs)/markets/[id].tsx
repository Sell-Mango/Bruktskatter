import { Text } from 'react-native'
import {useLocalSearchParams} from "expo-router";
import ShopLayout from "@/features/shopDetails/view/ShopLayout";

export default function Market(){
    const {id} = useLocalSearchParams()
    return <ShopLayout/>
}