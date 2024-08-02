"use client";

import ContentCard from "@/components/ContentCard";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();

  return (
    <div className="p-2">
      <ContentCard
        title="Bem Vindo ao Painel Profissional de Saúde"
        subtitle="Aqui você pode solicitar exames para os pacientes e inativar seus Profissionais de Saúde."
        subtitleTwo="Clique nos botões abaixo para solicitar exames ou inativar um Profissional de Saúde."
        bgColor="bg-main-blue"
        hideButton
      />
      <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-5 my-5">
        <ContentCard
          title="Solicitar Exames"
          subtitle="Aqui você pode solicitar exames para os pacientes."
          subtitleTwo="Clique no botão abaixo para solicitar exames para os seus pacientes."
          bgColor="bg-main-blue"
          buttonText="Ver Mais"
          onButtonClick={() => router.push("/dashboard/doctor/pre-register")}
        />
        <ContentCard
          title="Acompanhamento de Solicitações de Exames"
          subtitle="Aqui você pode acompanhar as solicitações de exames dos pacientes."
          subtitleTwo="Clique no botão abaixo para acompanhar as solicitações de exames dos seus pacientes."
          bgColor="bg-main-blue"
          buttonText="Ver Mais"
          onButtonClick={() => router.push("/dashboard/doctor/exam")}
        />
      </div>
    </div>
  );
};

export default Page;
