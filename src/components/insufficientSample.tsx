"use client";

import { DialogContent } from "@/components/ui/dialog";
import { useSendLaudo } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { sendLaudoPatient } from "@/services/diagnostic";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function InsufficientSample() {
  const auth = useSession();
  const sendLaudo = useSendLaudo();

  return (
    <DialogContent className="w-[30%] rounded-lg lg:max-w-[80vw]  border border-none">
      <div className="w-full text-3xl md:text-2xl">
        <p className="text-main-orange font-semibold md:text-xl text-sm text-start">
          A solicitação de exame do paciente{" "}
          <span className="text-main-blue">"{auth.namePatient}"</span> foi
          cancelada, por motivo de amostra insuficiente. Favor realizar uma nova
          solicitação de exame!
        </p>
      </div>
    </DialogContent>
  );
}
