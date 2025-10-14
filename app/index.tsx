import Welcome from "../features/welcomepage/view/Welcome";
import {SafeAreaProvider} from "react-native-safe-area-context";

import InteractiveMap from '../features/interactive-map/InteractiveMap';

export default function App() {

  return (
      <SafeAreaProvider>
          <Welcome/>
          <InteractiveMap />
      </SafeAreaProvider>
  );
}


