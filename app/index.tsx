import Welcome from "../features/welcomepage/view/Welcome";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {useAuth} from "@/shared/context/AuthProvider";
import {router} from "expo-router";
import {useEffect} from "react";

export default function App() {
    const {isLoggedIn} = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
            router.replace('frontpage')
        }
    }, []);


  return (
      <SafeAreaProvider>
          <Welcome/>
      </SafeAreaProvider>
  );
}


