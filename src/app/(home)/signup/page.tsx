"use client";

import { PatientPreRegister } from "@/components/signup/PatientPreRegister";
import { PatientSignUp } from "@/components/signup/PatientSignUp";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();

  function goBack() {
    router.push("/login");
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-xl font-bold text-main-orange">Faça seu cadastro</h1>
      <span className="text-sm">
        Aqui você pode escolher qual tipo de cadastro deseja fazer:
      </span>

      <div className="w-full flex flex-col md:flex-row gap-2 md:gap-4 items-center md:min-w-[600px]">
        <Link href="/signup/doctor" className="w-full">
          <Button size={`lg`} className="w-full mt-5">
            Médico
          </Button>
        </Link>
        <Link href="/signup/otherprofessional" className="w-full">
          <Button size={`lg`} className="w-full mt-5" variant={`tertiary`}>
            Profissional de Saúde
          </Button>
        </Link>
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
