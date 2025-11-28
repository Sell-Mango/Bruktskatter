import {useNavigation} from "expo-router";
import {useEffect} from "react";

export default function useConfirmBeforeLeaving(onConfirm:(proceed: () => void)=>void) {
    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = navigation.addListener("beforeRemove", (e) => {
            e.preventDefault();
            onConfirm(()=> navigation.dispatch(e.data.action))
        })
        return unsubscribe
    }, [navigation, onConfirm]);
}