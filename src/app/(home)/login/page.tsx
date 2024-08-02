import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="text-sm text-gray-900 max-w-[500px] text-justify">
        <p>
          <span className="text-lg font-bold text-main-orange">
            Bem vindo ao programa Claudinova
          </span>
        </p>
        <p className="mt-1">
          A Claudinova é uma plataforma de saúde que conecta pacientes a
          profissionais de saúde de forma simples e segura.
        </p>
      </div>

      <h1 className="w-full text-start font-bold mt-8 mb-2 text-main-orange">
        Acesse a sua conta ou cadastre-se!
      </h1>

      <Link href="/signin" className="w-full">
        <Button size={`lg`} className="w-full">
          Login
        </Button>
      </Link>

      <Link href="/signup" className="w-full">
        <Button size={`lg`} variant={`tertiary`} className="w-full">
          Me cadastrar
        </Button>
      </Link>
    </div>
  );
};

export default page;
