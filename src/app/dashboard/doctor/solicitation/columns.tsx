"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { LuDownload } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { downlaodLaudoPatient } from "@/services/doctor";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { useSendLaudo } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { toast } from "react-toastify";
import {
  activateHeathProfessional,
  rescueHeathProfessional,
} from "@/services/healthprofessional";

export type Report2 = {
  name: string;
  licenseNumber: string;
};

export const columns: ColumnDef<Report2>[] = [
  {
    accessorKey: "name",
    header: "Nome do Profissional de Saúde",
  },
  {
    accessorKey: "licenseNumber",
    header: "Conselho",
  },
  {
    accessorKey: "licenseState",
    header: "UF",
  },
  {
    accessorKey: "examStatusName",
    header: "Validação do Cadastro",
    cell: ({ row }) => {
      const report = row.original;

      const handleACcept = () => {
        const data = {
          HealthProgramCode: "985",
          Name: report.name,
          LicenseNumber: report.licenseNumber,
          // LicenseState: params.licenseState,
        };
        activateHeathProfessional(data)
          .then((response) => {
            if (!response.isValidData) {
              toast.error(response.message);
              return;
            }
            toast.success("Profissional de saúde ativado com sucesso!");
          })
          .catch((error) => {
            toast.error("Erro ao ativar profissional de saúde!");
          });
      };

      const handleRescue = () => {
        const data = {
          HealthProgramCode: "985",
          Name: report.name,
          LicenseNumber: report.licenseNumber,
          // LicenseState: params.licenseState,
        };
        rescueHeathProfessional(data)
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
