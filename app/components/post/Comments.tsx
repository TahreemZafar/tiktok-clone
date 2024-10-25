import { CommentsTypes } from "@/app/types";
import ClientOnly from "../ClientOnly";
import SingleComment from "./SingleCommet";
import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { useCommentStore } from "@/app/stores/comment";
import { useGeneralStore } from "@/app/stores/general";
import { useUser } from "@/app/context/user";
import useCreateComment from "@/app/hooks/useCreateComment";



export default function Comments({ params }: CommentsTypes) {

    let { commentsByPost, setCommentsByPost } = useCommentStore();
    let { setIsLoginOpen } = useGeneralStore();

    const contextUser = useUser();

    const [ comment, setComment ] = useState<string>('');
    const [ inputFocused, setInputFocusd ] = useState<boolean>(false);
    const [ isUploading, setIsUploading ] = useState<boolean>(false);


   
    const addComment = async () => {
        if (!contextUser?.user) return setIsLoginOpen(true)

        try {
            setIsUploading(true)
            await useCreateComment(contextUser?.user?.id, params?.postId, comment)
            setCommentsByPost(params?.postId)
            setComment('')
            setIsUploading(false)
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
    

  return (
    <>

     <div className="relative bg-[#f8f8f8] z-0 w-full h-[calc(100%-273px)] border-t-2 overflow-auto ">
        <div className="pt-2" />

        <ClientOnly>
            {
                commentsByPost.length < 1 ? (
                    <div className="text-center mt-6 text-[17] text-gray-500 ">No Comments...</div>
                ) : (
                    <div>
                        {
                            commentsByPost.map(( comment, i ) => (

                                <SingleComment key={i} comment={comment} params={params} />

                            ))
                        }
                    </div>
                )
            }
        </ClientOnly>

        <div />
        <div className="mb-28" />

     </div>

       <div id="CreateComment" className="absolute flex items-center bottom-0 bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-2 ">
          <div className={`
                 flex items-center  w-full lg:max-w-[380px]
                 ${ inputFocused ? ' border-2 border-gray-400 ' : ' border-2 border-[#dbdbdcf8] ' }
            `}>
                <input
                  onFocus={() => setInputFocusd(true)}
                  onBlur={() => setInputFocusd(false)}
                  onChange={e => setComment(e.target.value)}
                  value={comment || ''}
                  className=" bg-[#ebebec] text-[14px] focus:outline-none w-full lg:max-w-[380px] p-3  "
                  type="text"
                  placeholder="Add Comment"
                 />
            </div>

            { !isUploading ? (
                <button
                  disabled={!comment}
                  onClick={() => addComment()}
                  className={` font-semibold text-md ml-2 px-8 text-white py-[11px] ${ comment ? " bg-[#f02c56] cursor-pointer border " : " bg-[#d8d8d9] border-2 border-[#c2c2c2f8] cursor-not-allowed " } `}
                > Post </button>
            ) : (

                                    <BiLoaderCircle className=" ml-12 animate-spin  " size={20} color="#e91e62" />
              

            ) }

       </div>
      
    </>
  )
}
