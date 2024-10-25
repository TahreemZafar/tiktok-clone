import { ShowErrorObject } from "@/app/types";
import { useState } from "react"
import TextInput from "../TextInput";
import { BiLoaderCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/user";
import { useGeneralStore } from "@/app/stores/general";



export default function Register() {

    let { setIsLoginOpen } = useGeneralStore();

    const contextUser = useUser()
    const router = useRouter();

    const [ loading, setLoading ] = useState<boolean>(false);
    const [ name, setName ] = useState<string | ''>('');
    const [ email, setEmail ] = useState<string | ''>('');
    const [ password, setPassword ] = useState<string | ''>('');
    const [ confirmPassword, setConfirmPassword ] = useState<string | ''>('');
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

          if (!name) {
            setError({ type: 'name', message: 'A Name is required'})
            isError = true
        } else if (!email) {
            setError({ type: 'email', message: 'An Email is required'})
            isError = true
        } else if (!reg.test(email)) {
            setError({ type: 'email', message: 'The Email is not valid'})
            isError = true
        } else if (!password) {
            setError({ type: 'password', message: 'A Password is required'})
            isError = true
        } else if (password.length < 8) {
            setError({ type: 'password', message: 'The Password needs to be longer'})
            isError = true
        } else if (password != confirmPassword) {
            setError({ type: 'password', message: 'The Passwords do not match'})
            isError = true
        }
        return isError
    

    }



    const Register = async () => {

        const isError = validate();
        
        if ( isError ) return;
        if (!contextUser) return;

        try {

            setLoading(true);
            await contextUser.register(name, email, password)

            setLoading(false)
            setIsLoginOpen(false);
            router.refresh()

            
        } catch (error) {
            console.log(error);
            setLoading(false);
            alert(error);
            
        }

    }


  return (
    <>


    <div>
        <h1 className="text-center text-[25px] mt-2 mb-6 font-bold ">Create an Account</h1>

         <div className="px-6 pb-3 ">
            <TextInput
                name="name"
                string={name}
                placeholder="Name"
                onUpdate={setName}
                inputType="name"
                error={showError('name')}

            />
         </div>

         <div className="px-6 pb-3  ">
            <TextInput
               name="email"
                string={email}
                placeholder="Email"
                onUpdate={setEmail}
                inputType="email"
                error={showError('email')}

            />
         </div>

         <div className="px-6 pb-3 ">
            <TextInput
             name="password"
                string={password}
                placeholder="Password"
                onUpdate={setPassword}
                inputType="password"
                error={showError('password')}

            />
         </div>

         <div className="px-6 pb-3 ">
            <TextInput
                  name="confirmPassword"
                string={confirmPassword}
                placeholder="Confirm Password"
                onUpdate={setConfirmPassword}
                inputType="password"
                error={showError('confirmPassword')}

            />
         </div> 

         <div className="px-6 pb-2 mt-4 ">
             <button 
               disabled={loading}
               onClick={() => Register()}
               className={` flex items-center justify-center w-full text-[17px] font-semibold  border   text-white py-[14px] ${ ( !email || !password || !name || !confirmPassword ) ? ' bg-gray-300/80 border-gray-400 ' : ' bg-[#f02c56] border-gray-200 ' } `}
             
             >
                { 
                   loading ? <BiLoaderCircle className="animate-spin" color="#ffffff" size={25}  /> : "Register"
                }
             </button>
         </div>

         {/* <div className="flex items-center justify-center mt-1 ">
         <span className=" text-[15px] text-gray-600 " >Already have an account? </span>
          <div className="font-medium ml-1 text-[17px] text-gray-500 hover:text-[#f02c56] underline ">Login</div>
         </div> */}

    </div>
      
    </>
  )
}
