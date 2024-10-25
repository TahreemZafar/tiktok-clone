"use client";

import ClientOnly from "@/app/components/ClientOnly";
import EditProfileOverlay from "@/app/components/profile/EditProfileOverlay";
import PostUser from "@/app/components/profile/PostUser";
import { useUser } from "@/app/context/user";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import MainLayout from "@/app/layouts/MainLayout";
import { useGeneralStore } from "@/app/stores/general";
import { usePostStore } from "@/app/stores/post";
import { useProfileStore } from "@/app/stores/profile";
import { ProfileTypes } from "@/app/types";
import { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";

export default function Profile({ params }: ProfileTypes) {

    const contextUser = useUser();


    let { postsByUser, setPostsByUser } = usePostStore();
    let { setIsLoginOpen } = useGeneralStore()
    let { currentProfile, setCurrentProfile } = useProfileStore();
    let { isEditProfileOpen, setIsEditProfileOpen } = useGeneralStore();
    

     const [ followed, setFollowed ] = useState(false);



    useEffect(() => {

      setCurrentProfile(params.id);
      setPostsByUser(params.id)

    },[])


    const Followed = () => {

       if ( !contextUser?.user ) setIsLoginOpen(true);

        setFollowed(true);

         console.log("Followed")

    }


  return (
    <>
      <MainLayout>
        <div className="pr-3 pt-[90px] ml-[90px] 2xl:pl-[185px] lg:pl-[160px] lg:pr-[0] w-[calc(100%-90px)] max-w-[1800px] 2xl:mx-auto ">
          <div className="flex w-[calc(100vw-230px)] ">
             <ClientOnly>
                 {
                    true ? (
                        <img src={ useCreateBucketUrl(currentProfile ? currentProfile.image : '') } className=" w-[120px] min-w-[120px] rounded-full " alt="" />
                    ) : (
                        <div className=" min-w-[120px] h-[120px] bg-gray-200 rounded-full " ></div>

                    )
                 }
             </ClientOnly>

             <div className="ml-5 w-full ">
                <ClientOnly>
                   {
                      currentProfile?.name ? (
                        <div>
                           <p className=" text-[27px] font-bold truncate " >{ currentProfile.name }</p>
                           <p className="truncate text-[18px] "> { currentProfile.name } </p>
                        </div>
                      ) : (
                        <div className= "h-[60px]"  />
                      )
                   }
                </ClientOnly>

                { contextUser?.user?.id == params.id ? (
                   <button 
                   onClick={() => setIsEditProfileOpen( isEditProfileOpen = !isEditProfileOpen )}
                   className="flex items-center  py-2 px-3.5 mt-3 text-[15px] font-semibold border border-gray-300 hover:bg-gray-100 ">
                      <BsPencil size={18} className=" mt-0.5 mr-1 " />
                      <span>Edit Profie</span>

                   </button>  
                ) : (

                  <button
                    onClick={ () => Followed() }
                   className="flex items-center py-2 px-6 mt-3 text-[15px] text-white font-semibold bg-[#f02c56] "> { followed ? ' Followed ' : 'Follow' } </button>
                ) }

             </div>

          </div>

            <div className="flex items-center pt-4 ">
               <div className="mr-4">
                  <span className="font-bold">10K</span>
                  <span className="font-light text-gray-500 text-[15px] pl-1.5 ">Following</span>
               </div>
               <div className="mr-4">
                  <span className="font-bold">44K</span>
                  <span className="font-light text-gray-500 text-[15px] pl-1.5 ">Followers</span>
               </div>
            </div>

            <ClientOnly>
                <p className="pt-4 mr-4 text-gray-500 font-light text-[15px] pl-[1.5] max-w-[500px] ">
                   { currentProfile?.bio }
                </p>
            </ClientOnly>

            <ul className="w-full flex items-center pt-4 border-b ">
               <li className=" w-60 py-2 text-center text-[17px] font-semibold border-b-2 border-b-black " >Videos</li>
               <li className=" w-60 text-gray-500 text-center py-2 text-[17px] font-semibold " >Likes</li>
            </ul>

            <ClientOnly>
                <div className="mt-4 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 ">

                    {
                       postsByUser.map(( post, i ) => (
                          <PostUser post={post} key={i} />
                       ))
                    }

                   {/* <PostUser post={{
                      id: '123',
                      user_id: '123',
                      video_url: '/2.mp4',
                      text:'this is a post',
                      created_at: 'date here'
                   }} /> */}
                </div>
            </ClientOnly>

        </div>
      </MainLayout>
    </>
  );
}
