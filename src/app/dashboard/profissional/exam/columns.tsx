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
  useUnidentifiedSample,
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
      const unidentifiedSample = useUnidentifiedSample();

      const handleModalInsufficientSample = () => {
        dataStorage.setNamePatient(params.namePatient);
        dataStorage.setCpfPatient(params.cpf);
        insufficientSample.openModal(true);
      };

      const handleModalUnidentifiedSample = () => {
        dataStorage.setNamePatient(params.namePatient);
        dataStorage.setCpfPatient(params.cpf);
        unidentifiedSample.openModal(true);
      };

      if (params.logisticsStatus === "Amostra insuficiente") {
        return (
          <div
            className="cursor-pointer flex justify-center gap-2 hover:scale-110 transition-transform duration-200"
            onClick={handleModalInsufficientSample}
          >
            <span className="text-main-orange">{params.logisticsStatus}</span>
          </div>
        );
      } else if (params.logisticsStatus === "Amostra não identificada") {
        return (
          <div
            className="cursor-pointer flex justify-center gap-2 hover:scale-110 transition-transform duration-200"
            onClick={handleModalUnidentifiedSample}
          >
            <span className="text-main-orange">{params.logisticsStatus}</span>
          </div>
        );
      } else {
        return <span>{params.logisticsStatus}</span>;
      }
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
          {report.logisticsStatus === "Ausência de Laudo anatomopatológico" ? (
            <>
              <Button size="sm" onClick={handleOpen}>
                <MdOutlineFileUpload size={19} />
              </Button>
            </>
          ) : (
            <Button size="sm" disabled className="bg-green-600">
              <FaCheckDouble size={19} />
            </Button>
          )}
        </div>
      );
    },
  },
];
