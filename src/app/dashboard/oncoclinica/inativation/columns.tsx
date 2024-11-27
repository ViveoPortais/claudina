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
import { inactivateHealthProfessional } from "@/services/representative";

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
    accessorKey: "representativeStatus",
    header: "Status",
  },
  {
    accessorKey: "examStatusName",
    header: "Validação do Cadastro",
    cell: ({ row }) => {
      const report = row.original;
      const loading = useSession();

      const handleInativation = () => {
        loading.setRefresh(true);
        const data = {
          ProgramCode: "985",
          Name: report.name,
          LicenseNumberCoren: report.licenseCoren,
        };
        inactivateHealthProfessional(data as any)
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
          })
          .finally(() => {
            loading.setRefresh(false);
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
