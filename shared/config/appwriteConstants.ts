const APPWRITE_CONSTANT = {
    API: process.env.EXPO_PUBLIC_APPWRITE_API,
    PROJECT_ID: process.env.EXPO_PUBLIC_APPWRITE_PROJECTID,
    PACKAGE_NAME: process.env.EXPO_PUBLIC_PACKAGENAME,
    PROJECT_NAME: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME,
    DEV_KEY: process.env.EXPO_PUBLIC_APPWRITE_DEVKEY,
}

const APPWRITE_REDIRECT_LINKS = {
    RESET_PASSWORD: "https://bruktskatter.appwrite.network",
}

const APPWRITE_BUCKET = {
    ID: process.env.BUCKET_ID,
    STORAGE_URL: process.env.BASE_STORAGE_URL,
}

const BASE_STORAGE_URL = "https://fra.cloud.appwrite.io/v1/storage/buckets/"
const BUCKET_ID = "68ed265f000794fcf097"

export { BASE_STORAGE_URL, BUCKET_ID }
export { APPWRITE_CONSTANT ,APPWRITE_REDIRECT_LINKS, APPWRITE_BUCKET }


