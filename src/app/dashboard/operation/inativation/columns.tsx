"use client";

import { CustomSelect } from "@/components/custom/CustomSelect";
import { Button } from "@/components/ui/button";
import {
  useModalInativePartial,
  useModalTotalPartial,
  useSolicitation,
} from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { downloadingLaudo } from "@/services/diagnostic";
import { inactiveDoctor } from "@/services/doctor";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { FaDownload, FaHandPointer } from "react-icons/fa";
import { toast } from "react-toastify";

export type Report2 = {
  doctorId: any;
  doctorName: string;
  doctorCRMUF: string;
  inactivationType: string;
  motivo: string;
  namePatient: string;
  cpf: string;
  patientBirthDate: string;
  logisticsDateForecast: string;
};

export const columns: ColumnDef<Report2>[] = [
  {
    accessorKey: "nameDoctor",
    header: "Médico",
  },
  {
    accessorKey: "licenseNumber",
    header: "CRM",
  },
  {
    accessorKey: "licenseState",
    header: "UF",
  },
  {
    accessorKey: "namePatient",
    header: "Nome do Paciente",

    cell: ({ row }) => {
      const params = row.original;
      const dataStorage = useSession();
      const solicitation = useSolicitation();

      const handleSaveName = () => {
        dataStorage.setNamePatient(params.namePatient);
        dataStorage.setCpfPatient(params.cpf);
        solicitation.openModal(true);
      };

      return (
        <div
          className="cursor-pointer flex items-center gap-2 hover:scale-110 transition-transform duration-200"
          onClick={handleSaveName}
        >
          <span className="hover:text-enzimaisBlue">{params.namePatient}</span>
          <FaHandPointer className="text-main-orange" size={16} />
        </div>
      );
    },
  },
  {
    accessorKey: "cpf",
    header: "CPF",
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
    accessorKey: "diseaseName",
    header: "Patologia",
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
              toast.error("Erro no download do laudo");
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
            toast.error("Erro no download do laudo");
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
