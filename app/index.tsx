import Welcome from "../features/welcomepage/view/Welcome";
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function App() {

  return (
      <SafeAreaProvider>
          <Welcome/>
      </SafeAreaProvider>
  );
}


