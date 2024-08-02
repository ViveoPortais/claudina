"use client";

import ContentCard from "@/components/ContentCard";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();

  return (
    <div>
      <ContentCard
        title="Bem Vindo ao Painel de Laboratório"
        subtitle="Aqui você pode acompanhar as solicitações."
        subtitleTwo="Escolha uma das opções abaixo para começar."
        bgColor="bg-main-blue"
        hideButton
      />
      <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-5 my-5">
        <ContentCard
          title="Acompanhamento de Solicitação"
          subtitle="Aqui você pode acompanhar as solicitações."
          subtitleTwo="Clique no botão abaixo para ver mais."
          bgColor="bg-main-blue"
          buttonText="Ver Mais"
          onButtonClick={() => router.push("/dashboard/operation/inativation")}
        />
      </div>
    </div>
  );
};

export default Page;
