"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import {
  activateHeathProfessional,
  rescueHeathProfessional,
} from "@/services/representative";

export type Report2 = {
  name: string;
  licenseNumberCoren: string;
  licenseCoren: string;
};

export const columns: ColumnDef<Report2>[] = [
  {
    accessorKey: "name",
    header: "Nome do Profissional de Saúde",
  },
  {
    accessorKey: "licenseCoren",
    header: "Conselho",
  },
  {
    accessorKey: "examStatusName",
    header: "Validação do Cadastro",
    cell: ({ row }) => {
      const report = row.original;

      const handleACcept = () => {
        const data = {
          ProgramCode: "985",
          Name: report.name,
          LicenseNumberCoren: report.licenseCoren,
        };
        activateHeathProfessional(data as any)
          .then((response) => {
            if (!response.isValidData) {
              toast.error(response.message);
              return;
            }
            if (response.isValidData) {
              toast.success("Profissional de saúde ativado com sucesso!");
            }
          })
          .catch((error) => {
            toast.error("Erro ao ativar profissional de saúde!");
          });
      };

      const handleRescue = () => {
        const data = {
          ProgramCode: "985",
          Name: report.name,
          LicenseNumberCoren: report.licenseCoren,
        };
        rescueHeathProfessional(data as any)
          .then((response) => {
            if (!response.isValidData) {
              toast.error("Erro ao resgatar profissional de saúde!");
              return;
            }
            toast.success("Profissional de saúde recusado com sucesso!");
          })
          .catch((error) => {
            toast.error("Erro ao ativar profissional de saúde!");
          });
      };

      return (
        <div className="grid grid-cols-2 justify-center gap-2">
          <Button onClick={handleACcept}>Aceitar</Button>
          <Button variant={"tertiary"} onClick={handleRescue}>
            Recusar
          </Button>
        </div>
      );
    },
  },
];
