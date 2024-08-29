"use client";

import { Header } from "@/components/dashboard/Header";
import { Navbar } from "@/components/dashboard/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { routes } from "@/helpers/routes";
import { useLateralMenu } from "@/hooks/useMenus";
import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { ThemeProvider } from "@/components/custom/Theme-provider";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isMenuOpen } = useLateralMenu();
  const { role, isLogged } = useSession();
  const router = useRouter();

  useEffect(() => {
    role && router.push(routes[role][0].route);
  }, [routes, role, router]);

  useEffect(() => {
    !isLogged && router.push("/");
  }, [isLogged, router]);

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
