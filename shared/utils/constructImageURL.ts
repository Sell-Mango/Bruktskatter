import {APPWRITE_BUCKET, APPWRITE_CONSTANT} from "@/shared/config/appwriteConstants";



export const constructImageURL = (imageID:string):string => {
    let url = `${APPWRITE_BUCKET.STORAGE_URL}${APPWRITE_BUCKET.ID}/files/${imageID}/view?project=${APPWRITE_CONSTANT.PROJECT_ID}`
    return url
}