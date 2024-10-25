import { database, Query } from "@/libs/AppwriteClient";
import UseGetProfileByUserId from "./UseGetProfileByUserId";


export default async function useGetAllPost() {

    try {

        const res = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST),
            [
                Query.orderDesc('$id')
            ]
        )

        const documents = res.documents;

        const objPromises = documents.map( async doc => {
            let profile = await UseGetProfileByUserId(doc.user_id)

            return {
                id: doc.$id,
                user_id: doc.user_id,
                video_url: doc.video_url,
                text: doc.text,
                created_at: doc.created_at,
                profile: {
                    user_id: profile.user_id,
                    name: profile.name,
                    image: profile.image
                  }
            }
        })

        const result = await Promise.all(objPromises)
        return result;
        
        
    } catch (error) {
        throw error;
    }
   
}
