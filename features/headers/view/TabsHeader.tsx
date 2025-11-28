import {tabsOptions} from "@/features/headers/model/tabsOptions";
import HeaderTabsLeft from "@/features/headers/view/HeaderTabsLeft";
import HeaderTabsRight from "@/features/headers/view/TabsHeaderRight";


//TODO make this more dynamic
export const tabsHeaderOptions = (title:string):tabsOptions =>{
    return {
        headerRight: HeaderTabsRight,
        headerTitle: "",
        headerLeft: HeaderTabsLeft,
        title: title,
    }
}