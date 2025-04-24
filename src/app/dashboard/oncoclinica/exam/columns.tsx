"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { LuDownload } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { downlaodLaudoPatient } from "@/services/doctor";
import { MdOutlineDescription, MdOutlineFileUpload } from "react-icons/md";
import { FaCheckDouble, FaDownload, FaUpload } from "react-icons/fa";
import {
  useInsufficientSample,
  useModalLogisticaReversaConfirmation,
  useSendLaudo,
  useSolicitation,
  useUnidentifiedSample,
} from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { downloadingLaudo, downloadingLaudoCPf } from "@/services/diagnostic";
import { toast } from "react-toastify";
import { TbReportAnalytics } from "react-icons/tb";
import { useEffect } from "react";

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
  statusSms: string;
  returnStatusName: string;
  diagnosticId: string;
  trackingCode: string;
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
    accessorKey: "statusSms",
    header: "Status do Aceite",
    cell: ({ row }) => {
      const report = row.original;
      if (report.statusSms === "Pendente de aceite via SMS") {
        return <span>{report.statusSms}</span>;
      } else {
        return <span>{report.statusSms}</span>;
      }
    },
  },
  {
    accessorKey: "returnStatusName",
    header: "Status da Devolução",
    cell: ({ row }) => {
      const params = row.original;
      const modalLogisticaReversa = useModalLogisticaReversaConfirmation();
      const dataStorage = useSession();

      const handleOpenModal = () => {
        dataStorage.setNamePatient(params.namePatient);
        dataStorage.setConfirmCode(params.diagnosticId);
        dataStorage.setTrackingCode(params.trackingCode);
        modalLogisticaReversa.openModal(true);
        console.log(params.diagnosticId);
      };

      return (
        <div>
          {params.returnStatusName === "Devolução em andamento" ? (
            <div
              className="cursor-pointer flex hover:scale-110 transition-transform duration-200 text-yellow-500"
              onClick={handleOpenModal}
            >
              <span className="hover:text-enzimaisBlue">
                {params.returnStatusName}
              </span>
            </div>
          ) : (
            <span>{params.returnStatusName}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "examDefinition",
    header: "Nome do Exame Solicitado",
  },
  {
    accessorKey: "numberProtocol",
    header: "Número do Protocolo",
  },
  {
    accessorKey: "createdOn",
    header: "Data de criação da solicitação",
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
    header: "Data da Liberação do Laudo",
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

      const handleDownloadCPF = () => {
        const data = {
          programcode: "985",
          cpf: report.cpf,
          flagStringMap: "#REPORT_TKC",
        };
        downloadingLaudoCPf(data as any)
          .then((response) => {
            if (
              !response ||
              !Array.isArray(response) ||
              response.length === 0
            ) {
              toast.error("Laudo indisponível");
              return;
            }

            response.forEach((laudo, index) => {
              if (!laudo.documentBody) {
                toast.error(`Laudo indisponível ${index + 1}`);
                return;
              }

              const base64String = laudo.documentBody;
              const byteCharacters = atob(base64String);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray], {
                type: laudo.contentType || "application/octet-stream",
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = laudo.fileName || `downloaded_file_${index + 1}.pdf`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            });

            toast.success("Laudos baixados com sucesso");
          })
          .catch((error) => {
            toast.error("Laudo indisponível");
          });
      };

      return (
        <div>
          {report.logisticsStatus === "Ausência de Laudo anatomopatológico" ? (
            <>
              <Button size="sm" onClick={handleOpen}>
                <FaUpload size={19} />
              </Button>
            </>
          ) : report.logisticsStatus === "Laudo disponível" ? (
            <Button
              size="sm"
              className="bg-main-blue hover:bg-main-blue-dark"
              onClick={handleDownloadCPF}
            >
              <FaDownload size={19} />
            </Button>
          ) : (
            <Button size="sm" disabled className="bg-main-orange">
              <TbReportAnalytics size={19} />
            </Button>
          )}
        </div>
      );
    },
  },
];
