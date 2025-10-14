import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from "expo-router";
import { getUsers } from "../services/appwrite/database"
import { Pressable } from "react-native"
import { useState } from "react";

export default function App() {
  return (
    <View style={styles.container}>
        <Text>Bruktskatter</Text>
        <Text>Oppdag bruktmarkeder i nærheten</Text>
        <Link style={styles.button} href="register">
            <Text>Bli medlem</Text>
        </Link>
        <Link style={styles.button} href="login">
            <Text>Logg inn</Text>
        </Link>
        <Link style={styles.button} href="frontpage">
            <Text>Hopp over inlogging</Text>
        </Link>
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
        backgroundColor: '#1F1D1E',
        color: '#fff',
        borderRadius: 34,
        padding: 20,
        margin: 10,
    }
});
