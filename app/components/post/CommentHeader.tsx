"use client";

import { CommentHeaderTypes } from "@/app/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { BsChatDots, BsTrash3 } from "react-icons/bs";
import { ImMusic } from "react-icons/im";
import ClientOnly from "../ClientOnly";
import { AiFillHeart } from "react-icons/ai";
import { useLikeStore } from "@/app/stores/like";
import { useCommentStore } from "@/app/stores/comment";
import { useGeneralStore } from "@/app/stores/general";
import { useUser } from "@/app/context/user";
import useIsLiked from "@/app/hooks/useIsLiked";
import useCreateLike from "@/app/hooks/useCreateLike";
import useDeleteLike from "@/app/hooks/useDeleteLike";
import useDeletePostById from "@/app/hooks/useDeletePostById";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import moment from "moment";


export default function CommentHeader({ post, params }: CommentHeaderTypes) {

  let { likesByPost, setLikesByPost } = useLikeStore();
  let { commentsByPost, setCommentsByPost } = useCommentStore();
  let { setIsLoginOpen } = useGeneralStore();


  const contextUser = useUser();
  const router = useRouter();


  const [hasClickedLike, setHasClickedLike] = useState<boolean>(false)
  const [isDeleteing, setIsDeleteing] = useState<boolean>(false)
  const [userLiked, setUserLiked] = useState<boolean>(false)



    useEffect(() => {
      setCommentsByPost(params.postId);
      setLikesByPost(params.postId);
    }, [post])


    useEffect(() => {
      hasUserLikedByPost()
    },[ likesByPost ])


    const hasUserLikedByPost =  () => {

        if ( likesByPost.length < 1 || !contextUser?.user?.id ) {
            setUserLiked(false);
            return;
        }

        let res =  useIsLiked( contextUser.user.id, params.postId, likesByPost );

        setUserLiked( res ? true : false )

    }


    const like = async () => {
       try {

        setHasClickedLike(true);

        await useCreateLike( contextUser?.user?.id || '', params.postId )

        setLikesByPost(params.postId)
        setHasClickedLike(false);
        
       } catch (error) {

        console.log(error);
        alert(error);
        setHasClickedLike(false);
        
       }
    }


    const unLike = async ( id: string ) => {
      try {

       setHasClickedLike(true);

       await useDeleteLike(id);

       setLikesByPost(params.postId)
       setHasClickedLike(false);
       
      } catch (error) {

       console.log(error);
       alert(error);
       setHasClickedLike(false);
       
      }
   }


   const likeOrUnlike = () => {

     if ( !contextUser?.user ) return setIsLoginOpen(true);

     let res =  useIsLiked( contextUser.user.id, params.postId, likesByPost );

      if ( !res ) {
        like();
      } else {

        likesByPost.forEach( like => {
           
          if ( contextUser.user?.id && contextUser.user.id == like.user_id && like.post_id == params.postId ) {
            unLike(like.id)
          }

        } )

      }

     
   }


  const deletePost = async () => {

    let res = confirm('Are you sure you want to delete this post?');
     if ( !res ) return;

     setIsDeleteing(true);

     try {

       await useDeletePostById(params.postId, post.video_url)
       router.push(`/profile/${params.postId}`)
      
     } catch (error) {

      console.log(error);
      setIsDeleteing(false);
      alert(error)
      
     }

  }



  return (
    <>

     <div className="flex items-center justify-between px-8 ">
        <div className="flex items-center ">
           <Link href={`/profile/${post.user_id}`} >
             { post.profile.image ? ( 
               <img src={useCreateBucketUrl(post.profile.image)} width={45} className="rounded-full mx-auto lg:mx-0 " />
             ) : (
                <div className="rounded-full w-[40px] h-[40px] bg-gray-200 "></div>
             ) }
           </Link>

           <div className="ml-3 p-0.5 ">
             <Link href={`/profile/${post.user_id}`} className=" relative z-10 text-[17px] font-semibold hover:underline " >
               { post.profile.name }
             </Link>

             <div className="relative z-0 text-[13px] font-normal -mt-5 ">{ post.profile.name }
                <span className="relative -top-[2px] text-[30px] pl-1 pr-0.5 ">.</span>
                <span className="font-medium"> { moment( post.created_at ).calendar() } </span>
             </div>

           </div>

        </div>

        {
          contextUser?.user?.id == post.user_id ? (
            <div>

              { isDeleteing ? (
                 <BiLoaderCircle className=" animate-spin " size={25} />
              ) : (
                 <button disabled={isDeleteing} onClick={() => deletePost()} >
                   <BsTrash3 size={23} className=" cursor-pointer " />
                 </button>
              ) }

            </div>

          ) : null }

     </div>

     <p className="px-8 mt-4 text-sm "> { post.text } </p>

     <p className="flex items-center gap-2 px-8 mt-4 text-sm font-bold ">
        <ImMusic size={17} />
        Original Sound - { post.profile.name }
     </p>

     <div className="flex items-center px-8 mt-8 ">
        <ClientOnly> 
            <div className="pb-4 flex items-center text-center ">
               <button
                disabled={hasClickedLike}
                onClick={() => likeOrUnlike()}
                className="rounded-full bg-gray-200 p-2 cursor-pointer "
                >
                  {
                     !hasClickedLike ? (
                       <AiFillHeart color={ likesByPost.length > 0 && userLiked ? '#ff2626' : '' } size={25} />
                     ) : (
                       <BiLoaderCircle size={25} className=" animate-spin " />
                     )
                  }
                </button>

                <span className="text-xs pl-2 pr-4 text-gray-800 font-semibold ">
                   { likesByPost.length }
                </span>
            </div>
        </ClientOnly>

         <div className="pb-4 flex items-center text-center ">
           <div className="rounded-full bg-gray-200 p-2 cursor-pointer ">
              <BsChatDots size={25} />
           </div>
           <span className="text-xs pl-2 text-gray-800 font-semibold ">{ commentsByPost.length }</span>

         </div>

     </div>
      
    </>
  )
}
