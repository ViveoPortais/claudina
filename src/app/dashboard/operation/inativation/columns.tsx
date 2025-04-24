"use client";

import { Button } from "@/components/ui/button";
import {
  useModalLogisticaReversa,
  useSendLaudo,
  useSolicitation,
} from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { downloadingLaudo, downloadingLaudoCPf } from "@/services/diagnostic";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { FaDownload, FaUpload } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { toast } from "react-toastify";

export type Report2 = {
  licenseState: any;
  nameDoctor: string;
  licenseNumber: string;
  namePatient: string;
  cpf: string;
  patientBirthDate: string;
  diseaseName: string;
  logisticsDateForecast: string;
  hasPending: boolean;
  customDateTime2: string;
  createdOn: string;
  examDefinition: string;
  logisticsStatus: string;
  returnStatusName: string;
  id: string;
  examStatusId: string;
  diagnosticId: string;
};

export const columns: ColumnDef<Report2>[] = [
  {
    accessorKey: "nameDoctor",
    header: "Médico",
    cell: ({ row }) => {
      const params = row.original;
      const dataStorage = useSession();
      const solicitation = useSolicitation();

      const handleSaveName = () => {
        dataStorage.setNamePatient(params.namePatient);
        dataStorage.setCpfPatient(params.cpf);
        dataStorage.setHasPending(params.hasPending);
        dataStorage.setDateTime(params.customDateTime2);
        solicitation.openModal(true);
        dataStorage.setExamDefinition(params.examDefinition);
      };

      return (
        <div
          className="cursor-pointer flex justify-center gap-2 hover:scale-110 transition-transform duration-200"
          onClick={handleSaveName}
        >
          <span className="hover:text-enzimaisBlue">{params.nameDoctor}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "licenseNumber",
    header: "CRM",
    cell: ({ row }) => {
      const params = row.original;
      const dataStorage = useSession();
      const solicitation = useSolicitation();

      const handleSaveName = () => {
        dataStorage.setNamePatient(params.namePatient);
        dataStorage.setCpfPatient(params.cpf);
        dataStorage.setHasPending(params.hasPending);
        dataStorage.setDateTime(params.customDateTime2);
        solicitation.openModal(true);
        dataStorage.setExamDefinition(params.examDefinition);
      };

      return (
        <div
          className="cursor-pointer flex justify-center gap-2 hover:scale-110 transition-transform duration-200"
          onClick={handleSaveName}
        >
          <span className="hover:text-enzimaisBlue">
            {params.licenseNumber}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "licenseState",
    header: "UF",
    cell: ({ row }) => {
      const params = row.original;
      const dataStorage = useSession();
      const solicitation = useSolicitation();

      const handleSaveName = () => {
        dataStorage.setNamePatient(params.namePatient);
        dataStorage.setCpfPatient(params.cpf);
        dataStorage.setHasPending(params.hasPending);
        dataStorage.setDateTime(params.customDateTime2);
        solicitation.openModal(true);
        dataStorage.setExamDefinition(params.examDefinition);
      };

      return (
        <div
          className="cursor-pointer flex justify-center gap-2 hover:scale-110 transition-transform duration-200"
          onClick={handleSaveName}
        >
          <span className="hover:text-enzimaisBlue">{params.licenseState}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "namePatient",
    header: "Nome Completo do Paciente",

    cell: ({ row }) => {
      const params = row.original;
      const dataStorage = useSession();
      const solicitation = useSolicitation();

      const handleSaveName = () => {
        dataStorage.setNamePatient(params.namePatient);
        dataStorage.setCpfPatient(params.cpf);
        dataStorage.setHasPending(params.hasPending);
        dataStorage.setDateTime(params.customDateTime2);
        solicitation.openModal(true);
        dataStorage.setExamDefinition(params.examDefinition);
      };

      return (
        <div
          className="cursor-pointer flex hover:scale-110 transition-transform duration-200"
          onClick={handleSaveName}
        >
          <span className="hover:text-enzimaisBlue">{params.namePatient}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "cpf",
    header: "CPF",
    cell: ({ row }) => {
      const params = row.original;
      const dataStorage = useSession();
      const solicitation = useSolicitation();

      const handleSaveName = () => {
        dataStorage.setNamePatient(params.namePatient);
        dataStorage.setCpfPatient(params.cpf);
        dataStorage.setHasPending(params.hasPending);
        dataStorage.setDateTime(params.customDateTime2);
        solicitation.openModal(true);
        dataStorage.setExamDefinition(params.examDefinition);
      };

      return (
        <div
          className="cursor-pointer flex justify-center gap-2 hover:scale-110 transition-transform duration-200"
          onClick={handleSaveName}
        >
          <span className="hover:text-enzimaisBlue">{params.cpf}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "patientBirthDate",
    header: "Data de Nascimento",
    cell: ({ row }) => {
      const report = row.original;
      if (report.patientBirthDate) {
        return dayjs(report.patientBirthDate).format("DD/MM/YYYY");
      }
      return "";
    },
  },
  {
    accessorKey: "statusSms",
    header: "Status do Aceite",
  },
  {
    accessorKey: "diseaseName",
    header: "Patologia",
    cell: ({ row }) => {
      const params = row.original;
      const dataStorage = useSession();
      const solicitation = useSolicitation();

      const handleSaveName = () => {
        dataStorage.setNamePatient(params.namePatient);
        dataStorage.setCpfPatient(params.cpf);
        dataStorage.setHasPending(params.hasPending);
        dataStorage.setDateTime(params.customDateTime2);
        solicitation.openModal(true);
        dataStorage.setExamDefinition(params.examDefinition);
      };

      return (
        <div
          className="cursor-pointer flex hover:scale-110 transition-transform duration-200"
          onClick={handleSaveName}
        >
          <span className="hover:text-enzimaisBlue">{params.diseaseName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "numberProtocol",
    header: "Protocolo",
  },
  {
    accessorKey: "logisticsStatus",
    header: "Status do Protocolo",
  },
  {
    accessorKey: "returnStatusName",
    header: "Status da Devolução",
    cell: ({ row }) => {
      const params = row.original;
      const modalLogisticaReversa = useModalLogisticaReversa();
      const dataStorage = useSession();

      const handleOpenModal = () => {
        dataStorage.setNamePatient(params.namePatient);
        dataStorage.setId(params.diagnosticId);
        modalLogisticaReversa.openModal(true);
      };

      return (
        <div>
          {params.returnStatusName === "Logística Reversa" ? (
            <div
              className="cursor-pointer flex hover:scale-110 transition-transform duration-200 text-red-500"
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
    header: "Data Solicitação do Laudo",
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
  {
    accessorKey: "laudo",
    header: "Laudo Anatomopatológico",
    cell: ({ row }) => {
      const params = row.original;

      const handleDownload = () => {
        const data = {
          programcode: "985",
          cpf: params.cpf,
          flagStringMap: "#A_LAUDOANATOMO",
        };
        downloadingLaudo(data as any)
          .then((response) => {
            if (!response.documentBody) {
              toast.error("Laudo indisponível");
              return;
            }

            const base64String = response.documentBody;
            const byteCharacters = atob(base64String);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], {
              type: response.contentType || "application/octet-stream",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = response.fileName || "downloaded_file";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            toast.success("Laudo baixado com sucesso");
          })
          .catch((error) => {
            toast.error("Laudo indisponível");
          });
      };
      return (
        <div className="hover:scale-110 transition-transform duration-200 cursor-pointer flex justify-center">
          <span>
            <FaDownload
              onClick={handleDownload}
              size={24}
              className="text-main-orange"
            />
          </span>
        </div>
      );
    },
  },
];
