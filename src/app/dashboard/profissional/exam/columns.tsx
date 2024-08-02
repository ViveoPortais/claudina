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

export type Report2 = {
  id: string;
  createdOn: string;
  namePatient: string;
  cpf: string;
  voucherStatus: string;
  voucher: string;
  examStatusName: string;
  laudos: string;
  logisticsStatus: string;
  datePrevision: string;
};

export const columns: ColumnDef<Report2>[] = [
  {
    accessorKey: "namePatient",
    header: "Nome Completo do Paciente",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    accessorKey: "diseaseName",
    header: "Patologia",
  },

  {
    accessorKey: "logisticsStatus",
    header: "Status do Protocolo",
  },
  {
    accessorKey: "createdOn",
    header: "Data de Solicitação do Laudo",
    cell: ({ row }) => {
      const report = row.original;
      if (report.createdOn) {
        return dayjs(report.createdOn).format("DD/MM/YYYY");
      }
      return "";
    },
  },
  {
    accessorKey: "datePrevision",
    header: "Data Prevista do Laudo",
    cell: ({ row }) => {
      const report = row.original;
      if (report.datePrevision) {
        return dayjs(report.datePrevision).format("DD/MM/YYYY");
      }
      return "";
    },
  },
  {
    accessorKey: "Laudos",
    header: "Laudos",

    cell: ({ row }) => {
      const report = row.original;
      const sendLaudo = useSendLaudo();
      const auth = useSession();

      const handleOpen = () => {
        sendLaudo.openModal(true);
        if (report) {
          auth.setCpfLaudo(report.cpf);
          auth.setNameLaudo(report.namePatient);
        }
      };

      return (
        <div>
          {report.logisticsStatus === "Pendente Confirmação de Agendamento" && (
            <>
              <Button size="sm" onClick={handleOpen}>
                <MdOutlineFileUpload size={19} />
              </Button>
            </>
          )}

          {report.logisticsStatus === "" && (
            <>
              <Button size="sm" disabled>
                <FaCheckDouble size={19} />
              </Button>
            </>
          )}
        </div>
      );
    },
  },
];
