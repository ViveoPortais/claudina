"use client";

import { DialogContent } from "@/components/ui/dialog";
import { useUnidentifiedSample } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";

export function UnidentifiedSample() {
  const auth = useSession();
  const unidentifiedSample = useUnidentifiedSample();

  return (
    <DialogContent className="w-[30%] rounded-lg lg:max-w-[80vw]  border border-none">
      <div className="w-full text-3xl md:text-2xl">
        <p className="text-main-orange font-semibold md:text-xl text-sm text-start">
          A solicitação de exame do paciente{" "}
          <span className="text-main-blue">"{auth.namePatient}"</span> foi
          cancelada, por motivo de amostra não identificada. Favor realizar uma
          nova solicitação de exame!
        </p>
      </div>
    </DialogContent>
  );
}
