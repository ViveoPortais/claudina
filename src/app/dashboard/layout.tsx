"use client";

import { Header } from "@/components/dashboard/Header";
import { Navbar } from "@/components/dashboard/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { routes } from "@/helpers/routes";
import { useLateralMenu } from "@/hooks/useMenus";
import useSession from "@/hooks/useSession";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "@/components/custom/Theme-provider";
import api from "@/services/api";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isMenuOpen } = useLateralMenu();
  const { role, isLogged, token } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isLogged) {
      setIsLoading(false);
      router.push("/");
    } else {
      if (token !== "" && !api.defaults.headers.Authorization) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
      }
      setIsLoading(false);
    }
  }, [isLogged, token, router, pathname]);

  useEffect(() => {
    if (isLogged && role && pathname === "/" && isClient) {
      router.push(routes[role][0].route);
    }
  }, [pathname, isLogged, role, router, isClient]);

  if (!isClient) return null;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <main className={`h-screen w-screen relative`}>
        <Navbar />

        <div
          className={`lg:absolute lg:right-0 lg:top-0 h-screen overflow-auto ${
            isMenuOpen ? "w-full lg:w-3/4" : "w-full lg:w-[calc(100%-100px)]"
          } transition-all flex flex-col items-center justify-center`}
        >
          <ScrollArea className="w-full min-h-screen">
            <Header />
            <div className="px-4 lg:px-6 py-4 lg:py-8 w-full h-full">
              {children}
            </div>
          </ScrollArea>
        </div>
      </main>
    </ThemeProvider>
  );
}
