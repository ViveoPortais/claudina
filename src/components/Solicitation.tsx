"use client";

import { DialogContent } from "@/components/ui/dialog";
import { useSendLaudo, useSolicitation } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { pendentDiagnostic, sendLaudoPatient } from "@/services/diagnostic";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CustomSelect } from "./custom/CustomSelect";

export function Solicitation() {
  const auth = useSession();
  const [hasPendingNo, setHasPendingNo] = useState(false);
  const [hasPendingYes, setHasPendingYes] = useState(false);
  const solicitation = useSolicitation();

  interface DataItem {
    CPF: string;
    ProgramCode: string;
    LogisticsSchedule: {
      DateReceivingBlock: string;
      ScheduleStatusStringMap: {
        OptionName: string;
      };
    };
    Attachments: {
      FileName: string;
      DocumentBody: string;
      Flag: string;
      AnnotationTypeName?: string;
    }[];
    Exams: {
      Name: string;
      ExamStatusStringMap: {
        OptionName: string;
      };
    }[];
  }

  const [data, setData] = useState<DataItem>({
    CPF: auth.cpfPatient as string,
    ProgramCode: "985",
    LogisticsSchedule: {
      DateReceivingBlock: "",
      ScheduleStatusStringMap: {
        OptionName: "",
      },
    },
    Attachments: [
      {
        FileName: "",
        DocumentBody: "",
        Flag: "#REPORT_TKC",
        AnnotationTypeName: "Claudina 18.2",
      },
      {
        FileName: "",
        DocumentBody: "",
        Flag: "#DOCTOR_REQUEST",
        AnnotationTypeName: "",
      },
      {
        FileName: "",
        DocumentBody: "",
        Flag: "#REPORT_TKC",
        AnnotationTypeName: "HER2",
      },
      {
        FileName: "",
        DocumentBody: "",
        Flag: "#PatientConsentForm_TKC",
      },
    ],
    Exams: [
      {
        Name: "Claudina 18.2",
        ExamStatusStringMap: {
          OptionName: "",
        },
      },
      {
        Name: "HER2",
        ExamStatusStringMap: {
          OptionName: "",
        },
      },
    ],
  });

  const handlePendingChange = (value: string) => {
    setHasPendingNo(value === "Não");
    setHasPendingYes(value === "Sim");
  };

  const sendDocument = () => {
    pendentDiagnostic(data)
      .then((res) => {
        if (res.isValidData) {
          toast.success("Solicitação enviada com sucesso");
          solicitation.openModal(false);
        }
        if (res.isValidData === false) {
          toast.error("Erro ao enviar solicitação");
        }
      })
      .catch((err) => {
        toast.error("Erro ao enviar solicitação");
      });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    flag: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prevData) => ({
          ...prevData,
          Attachments: prevData.Attachments.map((attachment) =>
            attachment.Flag === flag
              ? {
                  ...attachment,
                  FileName: file.name,
                  DocumentBody: reader.result as string,
                }
              : attachment
          ),
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectChange = (e: any, examName: string) => {
    const selectedValue = e.target.value;
    setData((prevData) => ({
      ...prevData,
      Exams: prevData.Exams.map((exam) =>
        exam.Name === examName
          ? { ...exam, ExamStatusStringMap: { OptionName: selectedValue } }
          : exam
      ),
    }));
  };

  const handleDateChange = (e: any) => {
    setData((prevData) => ({
      ...prevData,
      LogisticsSchedule: {
        DateReceivingBlock: e.target.value,
        ScheduleStatusStringMap: {
          OptionName:
            prevData.LogisticsSchedule.ScheduleStatusStringMap.OptionName,
        },
      },
    }));
  };

  const handleLogisticsStatusChange = (e: any) => {
    setData((prevData) => ({
      ...prevData,
      LogisticsSchedule: {
        ...prevData.LogisticsSchedule,
        ScheduleStatusStringMap: { OptionName: e.target.value },
      },
    }));
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <DialogContent className="w-[50%] rounded-lg lg:max-w-[80vw]  border border-none">
      <div className="flex items-center gap-2">
        <span className="text-xl text-main-blue">Nome do Paciente:</span>
        <span className="text-lg">{auth.namePatient}</span>
      </div>
      <div className="w-full grid grid-cols-2 items-center mt-8 gap-4">
        <Input
          placeholder="Data do recebimento da amostra"
          name="DateReceivingBlock"
          type="date"
          onChange={handleDateChange}
          value={data.LogisticsSchedule.DateReceivingBlock}
          max={getCurrentDate()}
          className="mt-1"
        />
        <CustomSelect
          name="hasPending"
          label="Possui alguma pendência?"
          options={[
            { value: "Sim", id: "Sim" },
            { value: "Não", id: "Não" },
          ]}
          onChange={(e: any) => handlePendingChange(e.target.value)}
          value={hasPendingNo ? "Não" : hasPendingYes ? "Sim" : ""}
        />
      </div>

      {hasPendingNo && (
        <>
          <div className="mt-5 grid grid-cols-3 gap-4">
            <Input
              placeholder="Upload do pedido médico"
              name="doctorRequest"
              type="file"
              onChange={(e: any) => handleFileChange(e, "#DOCTOR_REQUEST")}
            />
            <Input
              placeholder="Upload do laudo HER2"
              name="her2Report"
              type="file"
              onChange={(e: any) => handleFileChange(e, "#REPORT_TKC")}
            />
            <Input
              placeholder="Upload do laudo Claudina 18.2"
              name="claudinaReport"
              type="file"
              onChange={(e: any) => handleFileChange(e, "#REPORT_TKC")}
            />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-4">
            <CustomSelect
              name="her2Result"
              label="Resultado do laudo HER2"
              options={[
                { value: "Positivo", id: "Positivo" },
                { value: "Negativo", id: "Negativo" },
                { value: "Inconclusivo", id: "Inconclusivo" },
              ]}
              onChange={(e: any) => handleSelectChange(e, "HER2")}
              value={data.Exams[1].ExamStatusStringMap.OptionName}
            />
            <CustomSelect
              name="claudinaResult"
              label="Resultado do laudo Claudina 18.2"
              options={[
                { value: "Positivo", id: "Positivo" },
                { value: "Negativo", id: "Negativo" },
                { value: "Inconclusivo", id: "Inconclusivo" },
              ]}
              onChange={(e: any) => handleSelectChange(e, "Claudina 18.2")}
              value={data.Exams[0].ExamStatusStringMap.OptionName}
            />
          </div>
        </>
      )}
      {hasPendingYes && (
        <div className="mt-5 grid grid-cols-2 gap-4">
          <CustomSelect
            name="logisticsStatus"
            label="Informe aqui a pendência"
            options={[
              {
                value: "Bloco de parafina divergente do laudo",
                id: "Bloco de parafina divergente do laudo",
              },
              {
                value: "Amostra não identificada",
                id: "Amostra não identificada",
              },
              { value: "Amostra insuficiente", id: "Amostra insuficiente" },
              {
                value: "Ausência de Laudo anatomopatológico",
                id: "Ausência de Laudo anatomopatológico",
              },
              {
                value: "Ausência do termo do Paciente",
                id: "Ausência do termo do Paciente",
              },
            ]}
            onChange={handleLogisticsStatusChange}
            value={data.LogisticsSchedule.ScheduleStatusStringMap.OptionName}
          />
          <Input
            placeholder="Termo do paciente"
            name="file1"
            type="file"
            onChange={(e: any) =>
              handleFileChange(e, "#PatientConsentForm_TKC")
            }
          />
        </div>
      )}
      <div className="flex mt-10">
        <Button
          onClick={sendDocument}
          className="w-full bg-[#12356A] border border-[#12356A] text-white"
        >
          Enviar
        </Button>
      </div>
    </DialogContent>
  );
}
