import { useUser } from "@/app/context/user";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import useDeleteComment from "@/app/hooks/useDeleteComment";
import { useCommentStore } from "@/app/stores/comment";
import { SingleCommentTypes } from "@/app/types";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";



export default function SingleComment({ comment, params }: SingleCommentTypes) {

   const contextUser = useUser();

   let { setCommentsByPost } = useCommentStore();



  const [ isDeleting, setIsDeleting ] = useState<boolean>(false);


  const deleteThisComment = async () => {

     let res = confirm("Are you sure you want to delete this comment?");
     if ( !res ) return;

     try {

      setIsDeleting(true);
      await useDeleteComment(comment.id);
      setCommentsByPost(params.postId)
      setIsDeleting(false)
      
     } catch (error) {

      console.log(error);
      alert(error);
      
     }

  }


  return (
    <>

    <div id="SingleComment" className="flex items-center justify-between px-8 pt-4 ">
        <div className="flex items-center relative w-full ">
           <Link href={`/profile/${comment.profile.user_id}`} >
              <img src={useCreateBucketUrl(comment.profile.image)} width={40} className="absolute top-0 rounded-full mx-auto lg:mx-0 " />
           </Link>
 
           <div className="ml-14 pt-0.5 w-full ">
               <div className="flex items-center justify-between font-semibold text-[17px] ">
                 <span className="flex items-center ">
                   { comment?.profile.name } - 
                     <span className="ml-1 font-light text-[11px] text-gray-600 ">
                        { moment( comment.created_at ).calendar() }
                     </span>
                    </span>

                    {
                       contextUser?.user?.id == comment.profile.user_id ? (
                         <button disabled={isDeleting} onClick={() => deleteThisComment()} >
                          { isDeleting ? (
                             <BiLoaderCircle className="animate-spin" size={20} color="#e91e62" />
                          ) : <BsTrash3 className="cursor-pointer" size={25} /> }
                         </button>
                       ) : null
                    }

               </div>

               <div className="font-normal text-[15px] "> { comment.text } </div>

           </div>

        </div>
    </div>
      
    </>
  )
}
