

import { useUser } from '@/app/context/user';
import useCreateBucketUrl from '@/app/hooks/useCreateBucketUrl';
import useSearchProfileByName from '@/app/hooks/useSearchProfileByName';
import { useGeneralStore } from '@/app/stores/general';
import { RandomUser } from '@/app/types';
import debounce from 'debounce';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { BiSearch, BiUser } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';



function TopNav() {

    const contextUser = useUser();
    let { setIsLoginOpen, setIsEditProfileOpen } = useGeneralStore()

 const router = useRouter();
 const pathname = usePathname();


   const [ searchProfile, setSearchProfile ] = useState<RandomUser[]>([])
   let [ showMenu, setShowMenu ] = useState<boolean>(false);


  useEffect(() => {
     setIsEditProfileOpen(false);
  },[])



 const handleSearchName = debounce( async  (e: { target: { value: string } }) => {

      if ( e.target.value == "" ) return setSearchProfile([]);

       try {

         const result = await useSearchProfileByName(e.target.value);

          if ( result ) return setSearchProfile(result);
          setSearchProfile([])
         
       } catch (error) {
         console.log(error)
         alert(error)
         setSearchProfile([])
         
       }
 
  }, 500 )


 const goTo = () => {
    if ( !contextUser?.user ) return setIsLoginOpen(true);
    router.push('/upload');
 }



 return (
  <div id='topNav' className=' fixed bg-white z-30 flex items-center w-full border-b h-[62px] ' >
   <div className={` flex items-center justify-between w-full gap-6 px-4 mx-auto ${pathname === "/" ? "max-w-[1180px]" : ""} `} >

    <Link href={"/"}>
     <img src="/images/tiktok-logo.png" className=' min-w-[110px] w-[110px] ' alt="tiktok logo image" />
    </Link>

    <div className=' relative hidden md:flex items-center justify-end bg-[#f1f1f2] p-1 py-1 rounded-full group border hover:border-gray-400/70 max-w-[420px] w-full ' >

     <input type="text" placeholder='Search' onChange={handleSearchName} className=' w-full pl-3 my-1.5 bg-transparent placeholder-[#838383] text-15 focus:outline-none ' />


     {
        searchProfile.length > 0 ? (
         <div className=' absolute bg-white max-w-[910px] h-auto w-full z-20 left-0 top-12 border p-1' >
            {
                searchProfile.map((profile, i) => (
                  <div className=' p-1' key={i} >

       <Link href={`/profile/${profile.id}`} className=' flex items-center justify-between w-full cursor-pointer p-1 px-2 hover:text-white hover:bg-[#F12B56] ' >
        <div className="flex items-center">
         <img src={ useCreateBucketUrl(profile.image) } className='rounded-md' width={40} alt="" />
         <div className=' truncate ml-2 ' > { profile.name } </div>
        </div>
       </Link>

      </div>
                ))
            }
     </div>
        ) : null
     }


     <div className="px-3 flex items-center border-l border-l-[#c2c2c2] ">
      <BiSearch size={22} className=' group-hover:fill-gray-600 fill-[#A1A2A7] ' />
     </div>

    </div>


    <div className=' flex items-center gap-3 ' >
     <button onClick={() => goTo()} className=' flex items-center border border-gray-300  py-[6px] px-2 hover:bg-gray-100 ' >
      <AiOutlinePlus color='#000000' size={21} />
      <span className="px-2 font-medium text-[15px]  ">Upload</span>
     </button>


     {
      !contextUser?.user?.id ? (
       <div className="flex items-center">
        <button
         onClick={() => setIsLoginOpen(true)}
         className=' flex items-center text-white bg-[#f02c56] px-3 py-[7px] ' >
         <span className="whitespace-nowrap mx-3 font-medium text-[15px] ">Log In</span>
        </button>
        <BsThreeDotsVertical size={23} className=' fill-[#30313b] ml-3 ' />
       </div>

      ) : (
       <div className="flex items-center ">
        <div className="relative">
         <button
          onClick={() => setShowMenu(showMenu = !showMenu)}
         className=" mt-1 border border-gray-200 rounded-full ">
          <img src={ useCreateBucketUrl( contextUser.user.image || '' ) } alt="" className=" w-[40px] h-[40px] rounded-full" />
         </button>

          
           { showMenu ? (
             <div className="absolute bg-white rounded-lg py-1.5 w-[200px] shadow-xl border top-[48px] right-0 ">
  
             <button
               onClick={
                  () => {
                     router.push(`/profile/${contextUser.user?.id}`)
                     setShowMenu(false)
                  }
               }
              className="flex items-center w-full justify-start py-3 px-3 hover:bg-gray-100 cursor-pointer ">
              <BiUser className=' fill-[#000000c5] ' size={21} />
              <span className="pl-2 font-semibold text-sm ">Profile</span>
             </button>
   
             <button
              onClick={ async () => {
               await contextUser.logout()
               setShowMenu(false)
              } }
             className="flex items-center w-full justify-start pt-2 pb-3 px-3 hover:bg-gray-100 cursor-pointer ">
              <FiLogOut className='' color='#000000c5' size={21} />
              <span className="pl-2 font-semibold text-sm ">Logout</span>
             </button>
   
            </div>
   
           ) : null }


        </div>
       </div>
      )
     }


    </div>


   </div>
  </div>
 )
}

export default TopNav