import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { Likes } from '../types';
import useGetLikesByPostId from '../hooks/useGetLikesByPostId';
  
interface LikeStore {

    likesByPost: Likes[];
    setLikesByPost: ( postId: string ) => void;

}

export const useLikeStore = create<LikeStore>()( 
    devtools(
        persist(
            (set) => ({
                
               likesByPost: [],

               setLikesByPost: async ( postId: string ) => {

                const results = await useGetLikesByPostId(postId)
                set({ likesByPost: results })

               }
            }),
            { 
                name: 'store', 
                storage: createJSONStorage(() => localStorage) 
            }
        )
    )
)