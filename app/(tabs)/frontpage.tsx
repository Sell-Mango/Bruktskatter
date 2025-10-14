import {Pressable, Text} from "react-native";
import {Link} from "expo-router";

export default function frontpage() {
    return (
        <>
            <Text>Frontpage</Text>
            <Link href="/">
                <Text>to Start</Text>
            </Link>
        </>
    )
}