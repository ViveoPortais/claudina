"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { LuDownload } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { downlaodLaudoPatient } from "@/services/doctor";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import {
  useInsufficientSample,
  useSendLaudo,
  useSolicitation,
} from "@/hooks/useModal";
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
  logisticsDateForecast: string;
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
    cell: ({ row }) => {
      const params = row.original;
      const dataStorage = useSession();
      const insufficientSample = useInsufficientSample();

      const handleSaveName = () => {
        dataStorage.setNamePatient(params.namePatient);
        dataStorage.setCpfPatient(params.cpf);
        insufficientSample.openModal(true);
      };

      return (
        <>
          {params.logisticsStatus === "Amostra insuficiente" ? (
            <div
              className="cursor-pointer flex justify-center gap-2 hover:scale-110 transition-transform duration-200"
              onClick={handleSaveName}
            >
              <span className="text-main-orange">{params.logisticsStatus}</span>
            </div>
          ) : (
            <>{params.logisticsStatus}</>
          )}
        </>
      );
    },
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
    accessorKey: "logisticsDateForecast",
    header: "Data Prevista do Laudo",
    cell: ({ row }) => {
      const report = row.original;
      if (report.logisticsDateForecast) {
        return dayjs(report.logisticsDateForecast).format("DD/MM/YYYY");
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

          <div>
            <Button size="sm" disabled className="bg-green-600">
              <FaCheckDouble size={19} />
            </Button>
          </div>
        </div>
      );
    },
  },
];
