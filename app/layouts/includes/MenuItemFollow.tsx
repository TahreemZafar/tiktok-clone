import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import { FollowCompTypes } from "@/app/types";
import Link from "next/link";
import React from "react";
import { AiOutlineCheck } from "react-icons/ai";

export default function MenuItemFollow({ user }: FollowCompTypes) {
  return (
    <>
      <Link
        href={`/profile/${user?.id}`}
        className=" flex items-center hover:bg-gray-100 rounded-md w-full py-1.5 px-2 "
      >
        <img
          src={useCreateBucketUrl(user.image)}
          className=" rounded-full mx-auto lg:mx-0 "
          width={35}
          alt=""
        />
        <div className=" lg:pl-2.5 lg:block hidden ">
          <div className="flex items-center">
            <p className="font-bold text-[14px] truncate ">{user.name}</p>
            <p className="ml-1 rounded-full bg-[#58d5ec] h-[14px] relative ">
              <AiOutlineCheck
                className=" relative p-[3px] "
                color="#ffffff"
                size={15}
              />
            </p>
          </div>

          <p className="font-normal text-[12px] text-gray-600 ">{user?.name}</p>
        </div>
      </Link>
    </>
  );
}
