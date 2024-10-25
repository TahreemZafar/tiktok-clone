"use client";

import { ItemsTypes } from "@/app/types";
import { AiOutlineHome } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { RiGroupLine } from "react-icons/ri";

export default function MenuItems({
  iconString,
  colorString,
  sizeString,
}: ItemsTypes) {
  const icons = () => {
    if (iconString == "For You")
      return <AiOutlineHome size={sizeString} color={colorString} />;
    if (iconString == "Following")
      return <RiGroupLine size={sizeString} color={colorString} />;
    if (iconString == "LIVE")
      return <BsCameraVideo size={sizeString} color={colorString} />;
  };

  return (
    <>
      <div className=" w-full flex items-center hover:bg-gray-100 p-2 rounded-md ">
        <div className=" flex items-center lg:mx-0 mx-auto ">
          {icons()}

          <p
            className={` hidden lg:block pl-[9px] mt-0.5 font-semibold text-[15px] text-[${colorString}] `}
          >
            {iconString}
          </p>
        </div>
      </div>
    </>
  );
}
