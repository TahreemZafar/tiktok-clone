import { database, Query } from "@/libs/AppwriteClient";


export default async function useGetPostByUser(userId: string) {

    try {

        const res = await database.listDocuments( 
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST),
          [
            Query.equal('user_id', userId),
            Query.orderDesc('$id')
          ]
        )

        const documents = res.documents
        const result = documents.map(doc => {
            return {
                id: doc.$id,
                user_id: doc.user_id,
                video_url: doc.video_url,
                text: doc.text,
                created_at: doc.created_at,
            }
        })

        return result;
        
    } catch (error) {
        
    }

}