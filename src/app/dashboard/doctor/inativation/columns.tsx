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
  inactivateHealthProfessional,
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
    accessorKey: "healthProfessionalStatus",
    header: "Status",
  },
  {
    accessorKey: "examStatusName",
    header: "Validação do Cadastro",
    cell: ({ row }) => {
      const report = row.original;

      const handleInativation = () => {
        const data = {
          HealthProgramCode: "985",
          Name: report.name,
          LicenseNumber: report.licenseNumber,
          // LicenseState: report.licenseState,
        };
        inactivateHealthProfessional(data)
          .then((response) => {
            if (response.isValidData) {
              toast.success("Profissional de saúde inativado com sucesso.");
            }
            if (!response.isValidData) {
              toast.error(response.message);
              return;
            }
          })
          .catch((error) => {
            toast.error("Erro ao ativar profissional de saúde!");
          });
      };

      return (
        <div className="grid grid-cols-1 justify-center gap-2">
          <Button variant={"tertiary"} onClick={handleInativation}>
            Inativar
          </Button>
        </div>
      );
    },
  },
];
