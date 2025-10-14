import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from "expo-router";
import { getUsers } from "../services/appwrite/database"
import { Pressable } from "react-native"
import { useState } from "react";

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
      <Text>Open up index.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
        <Link style={styles.button} href="login">
            <Text>login</Text>
        </Link>
        <Link style={styles.button} href="frontpage">
            <Text>tabs</Text>
        </Link>
        <Pressable onPress={getDataPressed} style={styles.button}><Text>getData</Text></Pressable>
        {users.map((user) => (<Text key={user.id}>{user.username} : {user.role}</Text>))}
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
    }
});
