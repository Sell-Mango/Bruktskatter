import {APPWRITE_BUCKET, APPWRITE_CONSTANT, BASE_STORAGE_URL, BUCKET_ID} from "@/shared/config/appwriteConstants";



export const constructImageURL = (imageID:string):string => {
    let url = `${BASE_STORAGE_URL}${BUCKET_ID}/files/${imageID}/view?project=${APPWRITE_CONSTANT.PROJECT_ID}`
    return url
}