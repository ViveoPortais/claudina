"use client";

import ContentCard from "@/components/ContentCard";
import { PasswordChange } from "@/components/PasswordChange";
import { useChangePassword } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { validate } from "@/services/standard";
import { Dialog } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const router = useRouter();
  const auth = useSession();
  const changePassword = useChangePassword();

  useEffect(() => {
    validate(auth.code as string).then((res) => {
      if (!res.isValid) {
        changePassword.openModal(true);
      }
    });
  }, [auth]);

  return (
    <div className="p-2">
      <ContentCard
        title="Bem Vindo ao Painel do Médico"
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
        <ContentCard
          title="Solicitações de Profissionais de Saúde"
          subtitle="Aqui você aprova ou rejeita as solicitações de Profissionais de Saúde."
          subtitleTwo="Clique no botão abaixo para acompanhar as solicitações profissionais de saúde."
          bgColor="bg-main-blue"
          buttonText="Ver Mais"
          onButtonClick={() => router.push("/")}
        />
        <ContentCard
          title="Inativação de Profissionais de Saúde"
          subtitle="Aqui você pode inativar os Profissionais de Saúde."
          subtitleTwo="Clique no botão abaixo para inativar um Profissional de Saúde."
          bgColor="bg-main-blue"
          buttonText="Ver Mais"
          onButtonClick={() => router.push("/")}
        />
      </div>
      <Dialog
        open={changePassword.isModalOpen}
        onOpenChange={changePassword.openModal}
      >
        <PasswordChange />
      </Dialog>
    </div>
  );
};

export default Page;
