"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { routes } from "@/helpers/routes";
import { useLateralMenu } from "@/hooks/useMenus";
import useSession from "@/hooks/useSession";

import { Footer } from "@/components/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import path from "path";
import { Ebook } from "@/components/Ebook";
import { Documents } from "@/components/Documents";
import Home from "./page";

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  const { isMenuOpen } = useLateralMenu();
  const { role, isLogged } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    role && router.push(routes[role][0].route);
  }, [routes, role, router]);

  useEffect(() => {
    if (
      !isLogged &&
      pathname !== "/login" &&
      pathname !== "/signin" &&
      pathname !== "/forget/password" &&
      pathname !== "/signup" &&
      pathname !== "/signup/doctor" &&
      pathname !== "/signup/otherprofessional"
    ) {
      router.push("/");
    }
  }, [isLogged, router, pathname]);

  return (
    <main className="h-screen w-screen overflow-hidden">
      {pathname === "/" ? (
        <>
          <Home />
        </>
      ) : (
        <div className="w-full h-screen grid grid-cols-1 xl:grid-cols-3 bg-[url('/SVG-CLAUDI.svg')] bg-left py-2 xl:py-8 xl:px-20">
          <div className="hidden xl:flex items-center justify-center text-white p-12" />

          <div className="flex items-center justify-center xl:col-span-2 xl:justify-end">
            <ScrollArea className="bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center p-4 md:p-8 mx-4 max-h-[90vh] md:max-h-[85vh]">
              <div className="w-full flex items-center justify-center">
                <Image
                  src="/logo-Claudinova.png"
                  width={400}
                  height={80}
                  alt="logo"
                  className="mb-16"
                />
              </div>
              {children}
            </ScrollArea>
          </div>
        </div>
      )}
    </main>
  );
}