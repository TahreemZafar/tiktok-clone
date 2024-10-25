import { database, ID } from "@/libs/AppwriteClient";


export default async function useCreateComment( userId: string, postId: string, text: string ) {

    try {

        await database.createDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_COMMENT),
            ID.unique(), 
            {
                user_id: userId,
                post_id: postId,
                text: text,
                created_at: new Date().toISOString(),
            }
        )
        
    } catch (error) {
        throw error;
    }
   
}
