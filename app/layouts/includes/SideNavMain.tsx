import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuItems from "./MenuItems";
import ClientOnly from "@/app/components/ClientOnly";
import MenuItemFollow from "./MenuItemFollow";
import { useGeneralStore } from "@/app/stores/general";
import { useUser } from "@/app/context/user";
import { useEffect } from "react";

function SideNavMain() {
  const { randomUsers, setRandomUsers } = useGeneralStore();

  const contextUser = useUser();
  const pathname = usePathname();

  useEffect(() => {
    setRandomUsers();
  }, []);

  return (
    <>
      <div
        id="sideNavMain"
        className={` fixed bg-white pt-[70px] h-full  border-r w-[75px] overflow-auto  ${
          pathname === "/" ? "lg:w-[280px]" : " lg:w-[210px] "
        } `}
      >
        <div className=" lg:w-full w-[55px] mx-auto ">
          <Link href={"/"}>
            <MenuItems
              iconString="For You"
              colorString={pathname == "/" ? "#f02c56" : ""}
              sizeString="25"
            />
          </Link>

          <MenuItems
            iconString="Following"
            colorString="#000000"
            sizeString="22"
          />

          <MenuItems iconString="LIVE" colorString="#000000" sizeString="23" />

          <div className="border-b lg:ml-2 mt-2 " />
          <h3 className=" hidden lg:block text-xs text-gray-600 font-semibold pt-4 pb-2 px-2 ">
            Suggested Accounts
          </h3>

          <div className=" lg:hidden block pt-3 " />

          <ClientOnly>
            <div className="cursor-pointer">
              {randomUsers.map((user, i) => (
                <MenuItemFollow user={user} key={i} />
              ))}
            </div>
          </ClientOnly>

          <button className="hidden lg:block text-[#f02c56] font-medium pt-1.5 pl-2 text-[13px] ">
            See All
          </button>

          {contextUser?.user?.id ? (
            <div>
              <div className="border-b lg:ml-2 mt-2 " />
              <h3 className=" hidden lg:block text-xs text-gray-600 font-semibold pt-4 pb-2 px-2 ">
                Following Accounts
              </h3>

              <div className=" lg:hidden block pt-3 " />

              <ClientOnly>
                <div className="cursor-pointer">
                  {randomUsers.map((user, i) => (
                    <MenuItemFollow user={user} key={i} />
                  ))}
                </div>
              </ClientOnly>

              <button className="hidden lg:block text-[#f02c56] font-medium pt-1.5 pl-2 text-[13px] ">
                See more
              </button>
            </div>
          ) : null}

          <div className="hidden lg:block border-b lg:ml-2 mt-2 " />

          <div className="hidden lg:block text-[11px] text-gray-500 ">
            <p className="pt-4 px-2">
              About Newsroom TikTok Shop Contact Careers ByteDance
            </p>
            <p className="pt-4 px-2">
              TikTok for Good Advertise Developers Transparency TikTok Rewards
              TikTok Browse TikTok Embeds
            </p>
            <p className="pt-4 px-2">
              Help Safety Terms Privacy Creator Portal Community Guidelines
            </p>
            <p className="pt-4 px-2">©TZ 2024 TikTok</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideNavMain;
