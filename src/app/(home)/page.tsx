"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };
  return (
    <div className="h-full">
      <nav className="bg-white border-gray-200 z-50 absolute w-full shadow-xl">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Image
            src="/logo2.png"
            width={200}
            height={150}
            priority
            alt="logo"
          />

          <button
            onClick={toggleNavbar}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-claudinovaBlue"
            aria-controls="navbar-default"
            aria-expanded={navbarOpen ? "true" : "false"}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`w-full md:block md:w-auto ${
              navbarOpen ? "" : "hidden"
            }`}
            id="navbar-default"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 bg-main-orange md:bg-white lg:bg-white xl:bg-white 2xl:bg-white">
              <li>
                <a
                  href="#"
                  className="flex gap-2  py-2 px-3 rounded md:p-0 text-main-orange md:text-main-orange lg:text-main-orange xl:text-main-orange 2xl:text-main-orange hover:text-main-blue md:hover:text-main-blue lg:hover:text-main-blue xl:hover:text-main-blue 2xl:hover:text-main-blue transition duration-500 ease-in-out"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth="2"
                      d="M20 4H4a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth="2"
                      d="M8 2v4m0 0V2a2 2 0 012-2h4a2 2 0 012 2v4m0-4v4m0 0H8m4 0h4m-4 0v4m4 0v4m-4 0H8m0 0h4m4 0a2 2 0 002-2V8a2 2 0 00-2-2m0 0a2 2 0 00-2 2v4"
                    ></path>
                  </svg>
                  Programa
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex gap-2  py-2 px-3 rounded md:p-0 text-main-orange md:text-main-orange lg:text-main-orange xl:text-main-orange 2xl:text-main-orange hover:text-main-blue md:hover:text-main-blue lg:hover:text-main-blue xl:hover:text-main-blue 2xl:hover:text-main-blue transition duration-500 ease-in-out"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM20 22h-3v-2a4.992 4.992 0 00-3.5-4.749V13a6.002 6.002 0 00-6-6 6.002 6.002 0 00-6 6v2a4.992 4.992 0 00-3.5 4.749V22H4v-2a6 6 0 0111.46-2.25C13.862 17.176 12.956 17 12 17s-1.862.176-2.46.75A6.002 6.002 0 0118 20v2h-1.5z"
                    ></path>
                  </svg>
                  Doença
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex gap-2  py-2 px-3 rounded md:p-0 text-main-orange md:text-main-orange lg:text-main-orange xl:text-main-orange 2xl:text-main-orange hover:text-main-blue md:hover:text-main-blue lg:hover:text-main-blue xl:hover:text-main-blue 2xl:hover:text-main-blue transition duration-500 ease-in-out"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 15.5l5.5 5.5M9 17C5.686 17 3 14.314 3 11s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6zm0 0V9"
                    ></path>
                    <circle cx="9" cy="9" r="3"></circle>
                  </svg>
                  Exame
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex gap-2  py-2 px-3 rounded md:p-0 text-main-orange md:text-main-orange lg:text-main-orange xl:text-main-orange 2xl:text-main-orange hover:text-main-blue md:hover:text-main-blue lg:hover:text-main-blue xl:hover:text-main-blue 2xl:hover:text-main-blue transition duration-500 ease-in-out"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 1.99 2H20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5M4 8l8 5 8-5"
                    ></path>
                  </svg>
                  Fale Conosco
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex gap-2  py-2 px-3 rounded md:p-0 text-main-orange md:text-main-orange lg:text-main-orange xl:text-main-orange 2xl:text-main-orange hover:text-main-blue md:hover:text-main-blue lg:hover:text-main-blue xl:hover:text-main-blue 2xl:hover:text-main-blue transition duration-500 ease-in-out"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 17l-4 2m0 0l4-2m-4 2V3"
                    ></path>
                  </svg>
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section className="w-full h-[75vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-10 mt-60">
          <div className="flex flex-col items-center text-3xl md:text-4xl gap-2">
            <span className="flex gap-2">
              <span className="text-main-orange">A</span>
              <span className="flex gap-2 text-main-blue">
                plataforma de gestão
                <span className="text-main-orange">de</span>
              </span>
            </span>

            <span className="text-main-orange">exames da Astellas</span>
          </div>
          <div className="w-full">
            <Link href="/login" className="w-full">
              <Button size={`lg`} variant={`tertiary`} className="w-full">
                Quero acessar
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
