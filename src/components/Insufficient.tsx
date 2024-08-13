"use client";

import { DialogContent } from "@/components/ui/dialog";
import { useInsufficientSample } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function Insufficient() {
  const auth = useSession();
  const insufficientSample = useInsufficientSample();
  const router = useRouter();

  const handleSendLaudo = () => {
    if (auth.role === "doctor") {
      router.push("/dashboard/doctor/pre-register");
      insufficientSample.openModal(false);
      return;
    }

    if (auth.role === "profissional") {
      router.push("/dashboard/profissional/pre-register");
      insufficientSample.openModal(false);
      return;
    }
  };

  return (
    <DialogContent className="w-[30%] rounded-lg lg:max-w-[80vw]  border border-none">
      <div className="w-full flex flex-col gap-1 text-3xl md:text-2xl">
        <div>
          <p className="text-main-orange font-semibold md:text-xl text-sm text-start">
            Foi identificada uma pendência na solicitação do exame do paciente{" "}
            <span className="text-main-blue">"{auth?.namePatient}"</span>, pelo
            motivo de amostra insuficiente.
          </p>
        </div>
        <div>
          <p className="text-main-orange font-semibold md:text-xl text-sm text-start">
            Clique abaixo para ser direcionado
          </p>
        </div>

        <Button
          onClick={handleSendLaudo}
          className="w-full py-3 mt-2"
          type="submit"
          variant="tertiary"
        >
          Solicitar Exame
        </Button>
      </div>
    </DialogContent>
  );
}
