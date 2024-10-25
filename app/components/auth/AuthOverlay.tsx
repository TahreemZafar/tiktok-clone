"use client";

import { useState } from "react"
import { AiOutlineClose } from "react-icons/ai";
import Register from "./register";
import Login from "./Login";
import { useGeneralStore } from "@/app/stores/general";



export default function AuthOverlay() {

  let { setIsLoginOpen } = useGeneralStore()

    let [ isRegister, setIsRegister ] = useState<boolean>(false);

  return (
    <>
     <div id="AuthOverlay" className="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-60 ">
        <div className={`relative bg-white w-full max-w-[470px] ${ isRegister ? 'h-[75%]' : 'h-[70%]' } p-4 rounded-lg `}>
            <div className="flex w-full justify-end ">
                <button
                 onClick={() => setIsLoginOpen(false)}
                className="rounded-full p-2 bg-gray-100 ">
                    <AiOutlineClose size={24} />
                </button>
            </div>

            { isRegister ? <Register /> : <Login /> }

             <div className=" flex items-center justify-center mt-1 ">
          <span className=" text-[15px] text-gray-600 " >{ !isRegister ? 'Don\'t have an account? ' : 'Already have an account? ' }</span>
          <button
           onClick={() => setIsRegister(isRegister = !isRegister)}
           className="font-medium ml-[6px] text-[17px] text-[#f02c56] underline ">
            { !isRegister ? 'Register' : ' Login' }
          </button>
         </div>


        </div>
     </div>
      
    </>
  )
}
