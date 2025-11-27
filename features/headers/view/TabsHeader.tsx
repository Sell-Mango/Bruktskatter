import {Pressable, StyleSheet, Text, TextInput} from "react-native";
import ProfilePress from "@/features/profile-drawer/view/ProfilePress";
import {tabsOptions} from "@/features/headers/model/tabsOptions";
import {Icons} from "@/shared/components/Icons";
import {globalStyles} from "@/shared/stylesheets";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomTextInput from "@/shared/components/CustomTextInput";
import {searchData, SearchDataSchema, searchError} from "@/features/headers/model/searchData";
import useHandleForms from "@/shared/hooks/useHandleForms";
import {useEffect} from "react";
import HeaderTabsLeft from "@/features/headers/view/HeaderTabsLeft";

//TODO refactor with own pressable components, wrapper component and own styling sheet
const headerTabsRight = () =>
    (<>
            {/*<Pressable onPress={() =>
                console.log("i was pressed")
            } style={{
                margin: 5,
                padding: 10,
                borderStyle: "solid",
                borderColor: "black",
                borderWidth: 2,
                borderRadius: 100,
            }}>
                <Text>Notification</Text>
            </Pressable>*/}
            <ProfilePress/>
        </>
    )


//TODO make this more dynamic
export const tabsHeaderOptions = (title:string):tabsOptions =>{
    return {
        headerRight: headerTabsRight,
        headerTitle: "",
        headerLeft: HeaderTabsLeft,
        title: title,
    }
}