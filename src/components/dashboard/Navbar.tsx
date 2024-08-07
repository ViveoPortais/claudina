"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { useLateralMenu } from "@/hooks/useMenus";
import { routes } from "@/helpers/routes";
import useSession from "@/hooks/useSession";
import { MenuIcon } from "../custom/Icon";

export function Navbar() {
  const pathname = usePathname();
  const { isMenuOpen, changeMenu } = useLateralMenu();
  const auth = useSession();
  const role = auth.role;

  return (
    <nav
      className={`${
        isMenuOpen ? "w-1/4" : "w-[100px]"
      } hidden lg:flex relative h-full transition-all border-r border-zinc-200 shadow-lg px-4 pb-6 flex-col items-center text-zinc-800`}
    >
      <div className="w-full h-28 border-b-2 border-main-purple flex items-center justify-center gap-2">
        <Image
          src="/simbolo-removebg-preview.png"
          width={50}
          height={50}
          alt="logo"
          className={`${isMenuOpen ? "hidden" : "block"}`}
        />
        <Image
          src="/logo-removebg-preview.png"
          width={200}
          height={60}
          alt="logo"
          className={`hidden mt-2 ${isMenuOpen && "lg:flex"}`}
        />
      </div>

      <ul
        className={`flex flex-col mt-12 ${
          !isMenuOpen && "items-center"
        } gap-4 w-full px-4`}
      >
        {role !== "" &&
          routes[role].map((profileRoutes) => {
            return (
              <Link
                key={profileRoutes.route}
                href={`${profileRoutes.route}`}
                className={`flex gap-x-2 items-center cursor-pointer hover:bg-zinc-100 rounded-lg p-6 ${
                  pathname === `${profileRoutes.route}` &&
                  "bg-main-orange text-white hover:text-zinc-800"
                }`}
              >
                <MenuIcon icon={profileRoutes.icon} size={24} />
                {isMenuOpen && profileRoutes.text}
              </Link>
            );
          })}
      </ul>

      <div
        className="absolute bottom-10 flex items-center gap-2 cursor-pointer text-zinc-800 p-6 rounded-lg bg-white hover:bg-zinc-100"
        onClick={() => changeMenu(isMenuOpen)}
      >
        <HiChevronDoubleLeft
          size={24}
          className={` ${!isMenuOpen && "rotate-180"} transition-all`}
        />
        {isMenuOpen && <span>Fechar</span>}
      </div>
    </nav>
  );
}
