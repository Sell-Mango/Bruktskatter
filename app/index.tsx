import Welcome from "../features/welcomepage/view/Welcome";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {useAuth} from "@/shared/context/AuthProvider";
import {router} from "expo-router";
import {useEffect} from "react";
import {Platform} from "react-native";
import * as NavigationBar from 'expo-navigation-bar';
import NoInternetModal from "@/shared/modal/NoInternetModal";

export default function App() {
    const {isLoggedIn} = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
            router.replace('frontpage')
        }

    }, [isLoggedIn]);


  return (
      <SafeAreaProvider style={{ backgroundColor: "#fff" }}>
          <NoInternetModal/>
          <Welcome/>
      </SafeAreaProvider>
  );
}


