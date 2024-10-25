"use client";

import ClientOnly from '@/app/components/ClientOnly';
import CommentHeader from '@/app/components/post/CommentHeader';
import Comments from '@/app/components/post/Comments';
import useCreateBucketUrl from '@/app/hooks/useCreateBucketUrl';
import { useCommentStore } from '@/app/stores/comment';
import { useLikeStore } from '@/app/stores/like';
import { usePostStore } from '@/app/stores/post';
import { PostPageType } from '@/app/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';




export default function Post({ params }: PostPageType) {

    const router = useRouter();

    let { postById, postsByUser, setPostById, setPostsByUser } = usePostStore();
    let { setLikesByPost } = useLikeStore();
    let { setCommentsByPost } = useCommentStore();


        useEffect(() => {

          setPostById(params.postId);
          setCommentsByPost(params.postId);
          setLikesByPost(params.postId);
          setPostsByUser(params.userId);

        },[])
     

  

    const loopThroughPostsUp = () => {

       postsByUser.forEach((post) => {
          if ( post.id > params.postId ) {
            router.push(`/post/${post.id}/${params.userId}`)
          }
       })

    }


    const loopThroughPostsDown = () => {
      postsByUser.forEach(post => {
          if (post.id < params.postId) {
              router.push(`/post/${post.id}/${params.userId}`)
          }
      });
  }


  return (
    <>

      <div id="PostPage" className="w-full lg:flex justify-between h-screen bg-black overflow-auto ">
          <div className="h-full relative lg:w-[calc(100%-540px)] ">
             <Link href={`/profile/${params.userId}`}
              className=' absolute text-white m-5 z-20 rounded-full bg-gray-700 p-1.5 hover:bg-gray-600 ' 
              >
                <AiOutlineClose size={27} />
             </Link>

             <div>
                <button
                  className=' absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-600 ' 
                  onClick={() => loopThroughPostsUp()}
                >
                    <BiChevronUp size={30} color='#ffffff' />
                </button>

                <button
                  className=' absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-600 ' 
                  onClick={() => loopThroughPostsDown()}
                >
                    <BiChevronDown size={30} color='#ffffff' />
                </button>
             </div>

             <img src="/images/tiktok-logo-small.png"
              alt="tiktok logo"
              width={42}
              className="absolute z-20 top-[18px] left-[70px] rounded-full mx-auto lg:mx-0 " />

              <ClientOnly>
                 { 
                    postById?.video_url ? (
                        <video 
                        src={useCreateBucketUrl( postById?.video_url)}
                        className="fixed object-cover w-full my-auto z-[0] h-screen "
                         />
                    ) : null }

                    <div className="bg-black bg-opacity-70 z-10 relative lg:min-w-[480px] ">
                    { 
                     postById?.video_url ? (
                        <video 
                        src={useCreateBucketUrl( postById?.video_url )}
                        autoPlay
                        controls
                        loop
                        muted
                        className=" mx-auto h-screen "
                         />
                    ) : null }
                    </div>
 
              </ClientOnly>

          </div>

          <div id="InfoSection" className="w-full lg:max-w-[550px] relative h-full bg-white ">
             <div className="py-7" />
                <ClientOnly>
                    { 
                      postById?.video_url   ? (
                        <CommentHeader post={postById} params={params} />
                      ) : null
                    }
                </ClientOnly>

                <Comments params={params} />

             
          </div>

      </div>
      
    </>
  )
}
