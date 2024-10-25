import { ShowErrorObject } from "@/app/types";
import { useState } from "react"
import TextInput from "../TextInput";
import { BiLoaderCircle } from "react-icons/bi";
import { useUser } from "@/app/context/user";
import { useGeneralStore } from "@/app/stores/general";



export default function Login() {

    let { setIsLoginOpen } = useGeneralStore()

    const contextUser = useUser()

    const [ loading, setLoading ] = useState<boolean>(false);
    const [ email, setEmail ] = useState<string | ''>('');
    const [ password, setPassword ] = useState<string | ''>('');
    const [ error, setError ] = useState<ShowErrorObject | null>(null);


    const showError = ( type: string ) => {
        if ( error && Object.entries(error).length > 0 && error.type == type ) {
            return error.message
        }
        return '';
    }


      
    const validate = () => {
        setError(null);
        let isError = false;

          const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

           if (!email) {
            setError({ type: 'email', message: 'An Email is required'})
            isError = true
        } else if (!password) {
            setError({ type: 'password', message: 'A Password is required'})
            isError = true
        } 
        return isError
    

    }




    const Login = async () => {

        let isError = validate();

        if ( isError ) return;
        if ( !contextUser ) return;

        try {

            setLoading(true);

            await contextUser.login(email, password);
            setLoading(false);
            setIsLoginOpen(false);

            
        } catch (error) {

            console.log(error);
            setLoading(false);
            alert(error);
            
        }
 
    }


  return (
    <>

    <div>
        <h1 className="text-center text-[25px] mt-1 mb-2 font-bold ">Log In</h1>
         <div className="px-6 pb-3 mt-7 ">
            <TextInput
             name="email"
                string={email}
                placeholder="Email"
                onUpdate={setEmail}
                inputType="email"
                error={showError('email')}

            />
         </div>

         <div className="px-6 pb-4 ">
            <TextInput
             name="password"
                string={password}
                placeholder="Password"
                onUpdate={setPassword}
                inputType="password"
                error={showError('password')}

            />
         </div>

         <div className="px-6 pb-2 mt-4 ">
             <button 
               disabled={loading}
               onClick={() => Login()}
               className={` flex items-center justify-center w-full text-[17px] font-semibold  border   text-white py-[14px] ${ ( !email || !password ) ? ' bg-gray-300/80 border-gray-400 ' : ' bg-[#f02c56] border-gray-200 ' } `}
             
             >
                { 
                   loading ? <BiLoaderCircle className="animate-spin" color="#ffffff" size={25}  /> : "Login"
                }
             </button>
         </div>

         {/* <div className="flex items-center justify-center mt-1 ">
         <span className=" text-[15px] text-gray-600 " >Don't have an account? </span>
          <div className="font-medium ml-1 text-[17px] text-gray-500 hover:text-[#f02c56] underline ">Register</div>
         </div> */}

    </div>
      
    </>
  )
}
