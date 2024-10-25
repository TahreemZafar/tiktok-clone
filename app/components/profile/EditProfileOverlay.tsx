import { CropperDimensions, ShowErrorObject } from "@/app/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import TextInput from "../TextInput";
import { Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { BiLoaderCircle } from "react-icons/bi";
import { useProfileStore } from "@/app/stores/profile";
import { useGeneralStore } from "@/app/stores/general";
import { useUser } from "@/app/context/user";
import useUpdateProfile from "@/app/hooks/useUpdateProfile";
import useChangeUserImage from "@/app/hooks/UseChangeUserImage";
import useUpdateProfileImage from "@/app/hooks/useUpdateProfileImage";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";

export default function EditProfileOverlay() {

   let { currentProfile, setCurrentProfile } = useProfileStore();
   let { setIsEditProfileOpen } = useGeneralStore()

  const contextUser = useUser();
  const router = useRouter();


  const [file, setFile] = useState<File | null>(null);
  const [cropper, setCropper] = useState<CropperDimensions | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | "">('');
  const [userName, setUserName] = useState<string | "">("");
  const [userBio, setUserBio] = useState<string | "">("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<ShowErrorObject | null>(null);



  useEffect(() => {

     setUserName(currentProfile?.name || '');
     setUserBio(currentProfile?.bio || '');
     setUserImage(currentProfile?.image || '');


  },[])

  

  const getUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
     const selectedfile = e.target.files && e.target.files[0];

     if ( selectedfile ) {
        setFile(selectedfile);
        setUploadedImage(URL.createObjectURL(selectedfile))
     } else {
        setFile(null);
        setUploadedImage(null);
     }

  };


   const cropAndUpdateImage = async () => {

     let isError = validate();
     if ( isError ) return;

     if ( !contextUser?.user ) return

     try {

       if ( !file ) return alert('You have no file')
       if ( !cropper ) return alert('You have no file')
        setIsUpdating(true);

       const newImageId = await useChangeUserImage(file, cropper, userImage)
       await useUpdateProfileImage( currentProfile?.id || '', newImageId )

       await contextUser.checkUser();
       setCurrentProfile(contextUser.user.id)
       setIsEditProfileOpen(false)
       setIsUpdating(false)
      
     } catch (error) {

      console.log(error);
      alert(error)
      setIsUpdating(false)
      
     }

  }


   const validate = () => {
      setError(null);
      let isError = false

       if ( !userName ) {
          setError({ type: 'userName', message: 'A username is required!' })
          isError = true
       }

       return isError
   }

   
   const updateUserInfo = async () => {

     let isError = validate();
     if ( isError ) return;
     if ( !contextUser?.user ) return;

     try {

       setIsUpdating(true);
       await useUpdateProfile(currentProfile?.id || '', userName, userBio);

       setCurrentProfile(contextUser.user.id)
       setIsEditProfileOpen(false);

       router.refresh();
      
     } catch (error) {

      console.log(error)
      alert(error)
      
     }

   }


  const showError = ( type: string ) => {

    if ( error && Object.entries(error).length > 0 && error.type == type ) {
        return error.message
    }

    return '';

  }


  return (
    <div
      id="EditProfileOverlay"
      className=" fixed flex justify-center pt-[70px] lg:pt-[65px] z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 overflow-auto "
    >
      <div
        className={` relative bg-white w-full max-w-[680px] h-[625px] border border-gray-400 mx-6 p-4  mb-10
            ${!uploadedImage ? " h-[655px] " : " h-[580px] "} `}
      >
        <div className="flex absolute items-center justify-between w-full p-5 left-0 top-0 border-b border-b-gray-300 ">
          <h1 className="font-medium text-[21px] ">Edit Profile</h1>

          <button
            disabled={isUpdating}
            onClick={() => setIsEditProfileOpen(false)}
            className=" hover:bg-gray-200 p-1 rounded-full "
          >
            <AiOutlineClose size={25} />
          </button>
        </div>

        <div
          className={` h-[calc(500px-200px)] ${
            !uploadedImage ? "mt-16" : "mt-[58px] "
          } `}
        >
          {!uploadedImage ? (
            <div>
              <div className="flex flex-col border-b sm:h-[118px] px-1.5 py-2 w-full ">
                <h3 className="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center ">
                  Profile Photo
                </h3>

                <div className="flex items-center justify-center sm:-mt-6 ">
                  <label htmlFor="image" className="relative cursor-pointer ">
                    <img src={useCreateBucketUrl(userImage)} width={95} className="rounded-full" />

                    <button className="absolute bottom-0 right-0 rounded-full bg-white shadow-xl border border-gray-300 p-1 inline-block w-[32px] h-[32px] ">
                      <BsPencil size={17} className=" ml-0.5 " />
                    </button>
                  </label>

                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={getUploadImage}
                    className="hidden"
                  />
                </div>
              </div>

              <div id="userNameSection" className="flex flex-col border-b sm:h-[118px] px-1.5 py-2 mt-1.5 w-full ">
                <h3 className="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center ">Name</h3>

                <div className="flex items-center justify-center sm:-mt-6 ">
                    <div className="w-full sm:w-[60%] max-w-md ">
                        <TextInput
                           name="username"
                           string={userName}
                           placeholder="UserName"
                           onUpdate={setUserName}
                           inputType="text"
                           error={showError('userName')}
                        />

                        <p className={` relative text-[11px] text-gray-500 ${ error ? 'mt-1' : 'mt-4' } `}>
                        Usernames can only contain letters, numbers, underscores, and periods. 
                        Changing your username will also change your profile link.
                        </p>

                    </div>
                </div>

              </div>

              <div id="UserBioSection" className="flex flex-col sm:h-[120px] px-1.5 py-2 mt-2 w-full ">
                <h3 className="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center">Bio</h3>

                <div className="flex items-center justify-center sm:-mt-6 ">
                    <div className="w-full sm:w-[60%] max-w-md ">
                        <textarea
                         cols={30}
                         rows={4}
                         value={ userBio || '' }
                         maxLength={100}
                         onChange={ e => setUserBio(e.target.value) }
                         className="w-full resize-none bg-[#f1f1f2] text-gray-800 border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none "
                         ></textarea>
                         <p className=" text-[11px] text-gray-500 ">
                            { userBio ? userBio.length : 0 }/100
                         </p>
                    </div>
                </div>

              </div>

            </div>
          ) : (
            <div className=" w-full max-h-[420px] mx-auto bg-black circle-stencil " >
                <Cropper
                   stencilProps={{ aspectRatio: 1 }}
                   className=" h-[400px] "
                   onChange={(cropper) => setCropper(cropper.getCoordinates())}
                   src={uploadedImage}
                />
            </div>
          )}
        </div>

        <div id="ButtonSection" className="absolute p-5 left-0 bottom-0 border-t border-t-gray-300 w-full ">
            { !uploadedImage ? (

                <div id="UpdateInfoButtons" className="flex items-center justify-end ">
                    <button disabled={isUpdating}
                     onClick={() => setIsEditProfileOpen(false)} 
                     className="flex items-center border border-gray-300 rounded-sm px-3 py-[6px] hover:bg-gray-100 ">
                        <span className="px-2 font-medium text-[15px] ">Cancel</span>
                    </button>

                    <button disabled={isUpdating}
                       onClick={() => updateUserInfo()}
                    className="flex items-center bg-[#f02c56] text-white border rounded-md ml-3 px-3 py-[6px] ">
                        <span className="px-2 font-medium text-[15px] ">
                            { isUpdating ? <BiLoaderCircle color="#ffffff" className=" my-1 mx-2.5 animate-spin " /> : "Save" }
                        </span>
                    </button>

                </div>

            ) : (

                <div id="CropperButtons" className="flex items-center justify-end ">
                <button onClick={() => setUploadedImage(null)} className="flex items-center border border-gray-300 rounded-sm px-3 py-[6px] hover:bg-gray-100 ">
                    <span className="px-2 font-medium text-[15px] ">Cancel</span>
                </button>

                <button onClick={() => cropAndUpdateImage()} className="flex items-center bg-[#f02c56] text-white border rounded-md ml-3 px-3 py-[6px] ">
                    <span className="px-2 font-medium text-[15px] ">
                        { isUpdating ? <BiLoaderCircle color="#ffffff" className=" my-1 mx-2.5 animate-spin " /> : "Apply" }
                    </span>
                </button>

            </div>
                
            ) }
        </div>

      </div>
    </div>
  );
}