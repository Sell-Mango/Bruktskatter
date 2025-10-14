import { Client, Account, Databases, Storage } from "react-native-appwrite"

export const client = new Client()

client
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_API as string)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECTID as string)
    .setPlatform("no.skattekammeratene.bruktskatter");

export const account = new Account(client);
export const storage = new Storage(client);
export const databases = new Databases(client);