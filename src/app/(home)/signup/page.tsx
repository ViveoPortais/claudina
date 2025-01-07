"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  function goBack() {
    router.push("/login");
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="lg:text-[12px] text-xl xl:text-xl font-bold text-main-orange">
        Faça seu cadastro
      </h1>
      <span className="text-sm">
        Aqui você pode escolher qual tipo de cadastro deseja fazer:
      </span>

      <div className="w-full grid grid-cols-1 gap-2 lg:grid lg:grid-cols-1 xl:grid xl:grid-cols-2 xl:gap-4 xl:items-center">
        <div>
          <Link href="/signup/doctor" className="w-full">
            <Button size={`lg`} className="w-full">
              Médico
            </Button>
          </Link>
        </div>
        <div>
          <Link href="/signup/otherprofessional" className="w-full">
            <Button size={`lg`} className="w-full lg:mt-1" variant={`tertiary`}>
              Profissional de Saúde
            </Button>
          </Link>
        </div>
      </div>
      <Button
        size={`lg`}
        variant={`tertiary`}
        className="w-full"
        onClick={goBack}
      >
        Voltar
      </Button>
    </div>
  );
}
