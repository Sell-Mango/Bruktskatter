import Welcome from "../features/welcomepage/view/Welcome";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {useAuth} from "@/shared/context/AuthProvider";
import {router} from "expo-router";
import {useEffect} from "react";

export default function App() {
    const {isLoggedIn} = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
            console.log("Logged in");
            router.replace('frontpage')
        }
    }, [isLoggedIn]);


  return (
      <SafeAreaProvider>
          <Welcome/>
      </SafeAreaProvider>
  );
}


