import {Pressable, Text, TextInput} from "react-native";
import ProfilePress from "@/features/profile-drawer/view/ProfilePress";
import {tabsOptions} from "@/features/headers/model/tabsOptions";

//TODO refactor with own pressable components, wrapper component and own styling sheet
const headerTabsRight = () =>
    (<>
            <Pressable onPress={() =>
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
            </Pressable>
            <ProfilePress/>
        </>
    )

//TODO make this it's own component
const headerTabsLeft = () => (
    <TextInput style={{
        height: 40,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        width: 200,
        borderRadius: 19.5
    }}/>
)

//TODO make this more dynamic
export const tabsHeaderOptions = (title:string):tabsOptions =>{
    return {
        headerRight: headerTabsRight, headerTitle: "", headerLeft: headerTabsLeft, title: title,
    }
}