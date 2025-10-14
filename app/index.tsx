import Welcome from "../features/welcomepage/view/Welcome";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

import type { Region } from 'react-native-maps';
import { ShopMarker } from './interactive-map/types/shopMarker';
import InteractiveMap from './interactive-map/InteractiveMap';

export default function App() {

  return (
      <SafeAreaProvider>
          <Welcome/>
          <InteractiveMap />
      </SafeAreaProvider>
    <View style={styles.container}>
  );
}


