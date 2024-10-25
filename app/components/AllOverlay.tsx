"use client";

import { useGeneralStore } from "../stores/general";
import AuthOverlay from "./auth/AuthOverlay";
import ClientOnly from "./ClientOnly";
import EditProfileOverlay from "./profile/EditProfileOverlay";


export default function AllOverlays() {

    let { isLoginOpen, isEditProfileOpen } = useGeneralStore()

 return (

  <>
     <ClientOnly>

        { isLoginOpen ? <AuthOverlay /> : null }
        { isEditProfileOpen ? <EditProfileOverlay /> : null }

     </ClientOnly>
  </>

 )

}