"use client";

import ContentCard from "@/components/ContentCard";
import { PasswordChange } from "@/components/PasswordChange";
import { useChangePassword } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { validate } from "@/services/standard";
import { Dialog } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const auth = useSession();
  const changePassword = useChangePassword();

  useEffect(() => {
    if (auth.isLogged) {
      validate().then((res) => {
        if (!res.isValid) {
          changePassword.openModal(true);
        }
      });
    }
  }, [auth.isLogged]);

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
          title="Acompanhamento de Solicitações de Exames"
          subtitle="Aqui você pode acompanhar as solicitações de exames dos pacientes."
          subtitleTwo="Clique no botão abaixo para acompanhar as solicitações de exames dos seus pacientes."
          bgColor="bg-main-blue"
          buttonText="Ver Mais"
          onButtonClick={() => router.push("/dashboard/admin/exam")}
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
