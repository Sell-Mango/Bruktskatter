import {Icons} from "@/shared/components/Icons";
import {formStyles, globalStyles} from "@/shared/stylesheets";
import CustomTextInput from "@/shared/components/CustomTextInput";
import {searchData, SearchDataSchema, searchError} from "@/features/headers/model/searchData";
import useHandleForms from "@/shared/hooks/useHandleForms";
import {useEffect} from "react";


export default function HeaderTabsLeft() {

    const {handleChange, handleSubmit, errors, formData } = useHandleForms<searchData, searchError>(SearchDataSchema, handleSearch)


    function handleSearch ({keyword}: searchData) {
        //console.log(keyword);
    }

    useEffect(() => {
        const timeout = setTimeout(handleSubmit, 500);

        return () => clearTimeout(timeout);
    }, [formData]);

    return (

        <CustomTextInput
            containerStyles={formStyles.headerSearchContainer}
            inputStyles={formStyles.headerSearchInput}
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