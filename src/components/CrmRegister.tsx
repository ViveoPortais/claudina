"use client";

import { DialogContent } from "@/components/ui/dialog";
import { useInsufficientSample } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { CustomSelect } from "./custom/CustomSelect";
import { UFlist } from "@/helpers/select-filters";

export function CrmRegister() {
  return (
    <DialogContent className="md:w-[40%] rounded-lg lg:max-w-[80vw]  border border-none">
      <div className="w-full flex flex-col gap-1 text-3xl md:text-2xl">
        <div>
          <p className="text-main-orange font-semibold md:text-xl text-base text-start">
            Registro CRM
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-4 mt-5">
          <Input name="CRM" placeholder="CRM" />
          <CustomSelect name="UF" label="UF" options={UFlist} />
          <Input name="doctorName" placeholder="Nome do Médico" />
          <Input name="email" placeholder="E-mail" />
          <Input name="phone" placeholder="Telefone/Celular do Médico" />
        </div>

        <Button className="w-full py-3 mt-2" type="submit" variant="tertiary">
          Cadastrar
        </Button>
      </div>
    </DialogContent>
  );
}
