import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from "expo-router";
import { getShops, getUsers } from "../services/appwrite/database"
import { Pressable } from "react-native"
import { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import type { Region } from 'react-native-maps';
import { ShopMarker } from './interactive-map/types/shopMarker';
import InteractiveMap from './interactive-map/InteractiveMap';

export default function App() {
    type User = {
        id: string,
        username: string,
        role: string,
    }

    const [users, setUsers] = useState<User[]>([]);
    const getDataPressed = async () => {
        const users = await getUsers()
        setUsers((prev) => users.documents.map((user)=>({id: user.$id, username: user.username, role: user.role})))
    }

  return (
    <View style={styles.container}>
      <InteractiveMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    button: {
        backgroundColor: 'blue',
        padding: 10,
    },
});
