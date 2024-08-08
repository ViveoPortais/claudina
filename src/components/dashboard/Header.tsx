"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { BsPersonBadge } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";

import api from "@/services/api";
import useSession from "@/hooks/useSession";
import { useLateralRightMenu, useMobilelMenu } from "@/hooks/useMenus";
import { routes } from "@/helpers/routes";

import { MenuIcon } from "../custom/Icon";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "../ui/separator";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const auth = useSession();
  const { isMobileMenuOpen, changeMobileMenu } = useMobilelMenu();
  const { isMenuOpen, changeMenu } = useLateralRightMenu();
  const [currentRoute, setCurrentRoute] = useState("");
  const role = auth.role;

  function handleLogout() {
    router.push("/");
    auth.onLogout();
    api.defaults.headers.Authorization = "";
  }

  useEffect(() => {
    if (isMobileMenuOpen) {
      changeMobileMenu(isMobileMenuOpen);
    }

    if (isMenuOpen) {
      changeMenu(isMenuOpen);
    }
  }, [pathname]);

  useEffect(() => {
    if (role !== "") {
      let findRoute = routes[role].find((x) => `${x.route}` === pathname);

      if (pathname.includes("profile")) {
        setCurrentRoute("Meus Dados");
        return;
      }

      if (findRoute) {
        setCurrentRoute(findRoute.text);
      } else {
        setCurrentRoute("");
      }
    }
  }, [auth, pathname]);

  return (
    <>
      <header
        id="mobile-header"
        className="flex lg:hidden h-28 w-full border-b-2 border-zinc-100 items-center justify-between px-8 bg-white text-main-orange"
      >
        <div>
          <Image
            src={`/logo-removebg-preview.png`}
            width={100}
            height={50}
            alt="Claudinova"
            className="mt-5"
          />
          <span className="text-main-blue text-sm lg:hidden font-normal">
            {currentRoute}
          </span>
        </div>
        <div className="flex items-center justify-center gap-6">
          <span className="text-main-orange font-semibold text-base">
            {auth.name?.includes(" ") ? auth.name.split(" ")[0] : auth.name}
          </span>
          <div
            className="hover:opacity-70 cursor-pointer"
            onClick={() => changeMobileMenu(isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <IoClose size={30} />
            ) : (
              <PiDotsThreeVerticalBold size={30} />
            )}
          </div>
        </div>
      </header>

      <nav
        id="mobile-nav"
        className={`absolute top-28 left-0 h-[calc(100vh-102px)] w-screen text-zinc-800 z-50 bg-white ${
          isMobileMenuOpen ? "flex lg:hidden" : "hidden"
        }`}
      >
        <ul className={`flex flex-col mt-8 gap-2 w-full px-4`}>
          {role !== "" &&
            routes[role].map((profileRoutes) => {
              return (
                <Link
                  key={profileRoutes.route}
                  href={`${profileRoutes.route}`}
                  className={`flex gap-x-2 cursor-pointer hover:bg-zinc-100 rounded-lg p-4 ${
                    pathname === `${profileRoutes.route}` &&
                    "text-main-orange hover:text-zinc-800"
                  }`}
                >
                  <MenuIcon icon={profileRoutes.icon} size={24} />
                  {profileRoutes.text}
                </Link>
              );
            })}
          {role === "doctor" ||
          role === "laboratory" ||
          role === "profissional" ? (
            <Link
              href={`/`}
              className={`flex gap-x-2 cursor-pointer hover:bg-zinc-100 rounded-lg p-4 `}
              onClick={handleLogout}
            >
              <LuLogOut size={24} />
              Logout
            </Link>
          ) : (
            <Link
              href={`/dashboard/profile`}
              className={`flex gap-x-2 cursor-pointer hover:bg-zinc-100 rounded-lg p-4 ${
                pathname === `/dashboard/profile` &&
                "text-main-orange hover:text-zinc-800"
              }`}
            >
              <BsPersonBadge size={24} />
              Meus Dados
            </Link>
          )}
        </ul>
      </nav>

      <header
        id="desktop-header"
        className="hidden lg:flex h-28 w-full border-b border-zinc-200 items-center justify-between px-12"
      >
        <div>
          <h1 className="text-lg lg:text-2xl font-semibold text-main-orange flex mt-5">
            Bem vindo {auth.role === "doctor" && "Dr(a)"} {auth.name}!
          </h1>
          <span className="text-main-blue text-xs lg:text-base font-normal">
            {currentRoute}
          </span>
        </div>

        <Sheet open={isMenuOpen} onOpenChange={changeMenu}>
          <SheetTrigger>
            <div className="hover:opacity-70">
              <PiDotsThreeVerticalBold size={32} className="text-main-orange" />
            </div>
          </SheetTrigger>

          <SheetContent className="m-4 rounded-lg h-auto">
            <SheetHeader>
              <SheetTitle className="text-main-orange text-xl  border-b-2 border-main-blue p-2">
                {auth.name}
              </SheetTitle>
            </SheetHeader>

            <Separator className="my-4 bg-main-green" />

            <div className="text-zinc-700">
              {role === "doctor" ||
              role === "laboratory" ||
              role === "profissional" ? (
                <>
                  <Link
                    href={`/`}
                    className={` text-lg flex gap-x-2 cursor-pointer hover:bg-zinc-100 rounded-lg p-4 `}
                    onClick={handleLogout}
                  >
                    <LuLogOut size={28} />
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={`/dashboard/profile`}
                    className={` text-lg flex gap-x-2 cursor-pointer hover:bg-zinc-100 rounded-lg p-4 ${
                      pathname === `/dashboard/profile` &&
                      "text-main-orange hover:text-zinc-800"
                    }`}
                  >
                    <BsPersonBadge size={28} />
                    Meus Dados
                  </Link>
                  <Link
                    href={`/`}
                    className={` text-lg flex gap-x-2 cursor-pointer hover:bg-zinc-100 rounded-lg p-4 `}
                    onClick={handleLogout}
                  >
                    <LuLogOut size={28} />
                    Logout
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}
