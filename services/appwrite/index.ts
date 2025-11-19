import {Client, Account, Databases, Storage, TablesDB} from "react-native-appwrite"

const client = new Client()

client
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_API as string)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECTID as string)
    .setPlatform("no.skattekammeratene.bruktskatter");

const account = new Account(client);
const storage = new Storage(client);
const databases = new Databases(client);
const tablesDB = new TablesDB(client);

export {client, account, storage, databases, tablesDB}