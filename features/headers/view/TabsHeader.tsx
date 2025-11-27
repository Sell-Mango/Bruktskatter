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

//TODO make this it's own component
const headerTabsLeft = () => {

    const handleSearch = ({keyword}: searchData) => {
        //console.log(keyword);
    }

    const {handleChange, handleSubmit, errors, formData } = useHandleForms<searchData, searchError>(SearchDataSchema, handleSearch)

    useEffect(() => {
        const timeout = setTimeout(handleSubmit, 500);

        return () => clearTimeout(timeout);
    }, [formData]);

    return (

        <CustomTextInput
            containerStyles={styles.headerSearchContainer}
            inputStyles={styles.headerSearchInput}
            placeholder="Finn butikk..."
            placeholderTextColor="#434343FF"
            hideIconOnWriting={true}
            leftIcon={<Icons.magnifyingGlass color={globalStyles.themeColors.dark} size={20} />}
            changeAction={handleChange}
            actionKey={"keyword"}
            formData={formData}
        />
    )
}


//TODO make this more dynamic
export const tabsHeaderOptions = (title:string):tabsOptions =>{
    return {
        headerRight: headerTabsRight,
        headerTitle: "",
        headerLeft: headerTabsLeft,
        title: title,
    }
}


const styles = StyleSheet.create({
    headerSearchContainer: {
        marginLeft: globalStyles.container.horizontalGutter,
        width: 220,
        borderRadius: 50,
        backgroundColor: "#FFFEE4",

    },
    headerSearchInput: {
        fontSize: 18,
        fontWeight: "400",
        color: globalStyles.themeColors.dark,
        paddingVertical: 10,
        paddingLeft: 40,
    }
})