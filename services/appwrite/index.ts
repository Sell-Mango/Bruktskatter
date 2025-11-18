import { Client, Account, Databases, Storage } from "react-native-appwrite"
import {APPWRITE_CONSTANT} from "@/shared/config/appwriteConstants";

const client = new Client()

client
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_API as string)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECTID as string)
    .setPlatform(APPWRITE_CONSTANT.PACKAGE_NAME)
    .setDevKey(APPWRITE_CONSTANT.DEV_KEY);

const account = new Account(client);
const storage = new Storage(client);
const databases = new Databases(client);

export {client, account, storage, databases}