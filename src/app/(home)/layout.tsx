"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { routes } from "@/helpers/routes";
import { useLateralMenu } from "@/hooks/useMenus";
import useSession from "@/hooks/useSession";
import { ScrollArea } from "@/components/ui/scroll-area";
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

  const isSpecialRoute =
    pathname === "/signup/doctor" || pathname === "/signup/otherprofessional";

  return (
    <main className="h-screen w-screen overflow-hidden">
      {pathname === "/" ? (
        <>
          <Home />
        </>
      ) : (
        <div
          className={`w-full h-screen grid grid-cols-1 xl:grid-cols-3 py-2 xl:py-8 xl:px-20 bg-[#F7F7F7] ${
            !isSpecialRoute
              ? 'lg:bg-[url("/SVG-CLAUDI2.svg")] lg:bg-left lg:bg-no-repeat '
              : "bg-[#F7F7F7]"
          }`}
        >
          <div className="hidden xl:flex items-center justify-center text-white p-12">
            {isSpecialRoute && (
              <Image
                src="/SVG-CLAUDI2.svg"
                width={1000}
                height={80}
                alt="bg"
                className="absolute ml-10"
              />
            )}
          </div>

          <div className="flex items-center justify-center xl:col-span-2 xl:justify-end">
            <ScrollArea className="bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center p-4 md:p-8 mx-4 max-h-[90vh] md:max-h-[85vh]">
              <div className="w-full flex items-center justify-center">
                <Image
                  src="/logo-removebg-preview.png"
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
