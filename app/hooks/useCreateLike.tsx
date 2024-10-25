import { database, ID } from "@/libs/AppwriteClient";


export default async function useCreateLike( userId: string, postId: string ) {

    try {

        await database.createDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_LIKE),
            ID.unique(), 
            {
                user_id: userId,
                post_id: postId,
                
            }
        )
        
    } catch (error) {
        throw error;
    }
   
}
