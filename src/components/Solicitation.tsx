"use client";

import { DialogContent } from "@/components/ui/dialog";
import { useSolicitation } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { pendentDiagnostic } from "@/services/diagnostic";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CustomSelect } from "./custom/CustomSelect";
import { Dialog } from "@radix-ui/react-dialog";
import { formatDate } from "date-fns";

export function Solicitation() {
  const auth = useSession();
  const [hasPending, setHasPending] = useState<boolean | null>(null);
  const [logisticsStatus, setLogisticsStatus] = useState("");
  const solicitation = useSolicitation();
  const [her2Result, setHer2Result] = useState("");
  const [claudinaResult, setClaudinaResult] = useState("");
  const dateValue = auth?.date ? new Date(auth.date) : null;

  interface DataItem {
    CPF: any;
    ProgramCode: string;
    HasPending: boolean;
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
    CPF: auth.cpfPatient,
    ProgramCode: "985",
    HasPending: false,
    LogisticsSchedule: {
      DateReceivingBlock: dateValue ? formatDate(dateValue, "yyyy-MM-dd") : "",
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

  useEffect(() => {
    if (auth.cpfPatient) {
      setData((prevData) => ({
        ...prevData,
        CPF: auth.cpfPatient,
      }));
    }
  }, [auth.cpfPatient]);

  useEffect(() => {
    if (auth.date) {
      setData((prevData) => ({
        ...prevData,
        LogisticsSchedule: {
          ...prevData.LogisticsSchedule,
          DateReceivingBlock: dateValue
            ? formatDate(dateValue, "yyyy-MM-dd")
            : "",
        },
      }));
    }
  }, [auth.date]);

  const handlePendingChange = (value: string) => {
    const hasPendingValue = value === "Sim";
    setHasPending(hasPendingValue);

    setData((prevData) => ({
      ...prevData,
      HasPending: hasPendingValue,
    }));

    if (!hasPendingValue) {
      setData((prevData) => ({
        ...prevData,
        Exams: prevData.Exams.map((exam) => ({
          ...exam,
          ExamStatusStringMap: { OptionName: "" },
        })),
      }));
      setLogisticsStatus("");
    }
  };

  const clearFilds = () => {
    hasPending !== null && setHasPending(null);
    setHer2Result("");
    setClaudinaResult("");
    setLogisticsStatus("");

    setData((prevData) => ({
      ...prevData,
      Exams: prevData.Exams.map((exam) => ({
        ...exam,
        ExamStatusStringMap: { OptionName: "" },
      })),
      LogisticsSchedule: {
        DateReceivingBlock: "",
        ScheduleStatusStringMap: { OptionName: "" },
      },
    }));

    solicitation.openModal(false);
    auth.setDateTime("");
  };

  const sendDocument = () => {
    pendentDiagnostic(data)
      .then((res) => {
        if (res.isValidData) {
          toast.success("Solicitação enviada com sucesso");

          clearFilds();
          solicitation.openModal(false);
          auth.setRefresh(true);
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
    if (examName === "HER2") {
      setHer2Result(selectedValue);
    } else if (examName === "Claudina 18.2") {
      setClaudinaResult(selectedValue);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;

    useSession.getState().setDateTime(newDate);

    setData((prevData) => ({
      ...prevData,
      LogisticsSchedule: {
        ...prevData.LogisticsSchedule,
        DateReceivingBlock: newDate,
      },
    }));
  };

  const handleLogisticsStatusChange = (e: any) => {
    const selectedValue = e.target.value;
    setLogisticsStatus(selectedValue);
    setData((prevData) => ({
      ...prevData,
      LogisticsSchedule: {
        ...prevData.LogisticsSchedule,
        ScheduleStatusStringMap: { OptionName: selectedValue },
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
    <Dialog open={solicitation.isModalOpen} onOpenChange={clearFilds}>
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
            disabled={!!data.LogisticsSchedule.DateReceivingBlock}
          />

          <CustomSelect
            name="hasPending"
            label="Possui alguma pendência?"
            options={[
              { value: "Sim", id: "Sim" },
              { value: "Não", id: "Não" },
            ]}
            onChange={(e: any) => handlePendingChange(e.target.value)}
            value={hasPending !== null ? (hasPending ? "Sim" : "Não") : ""}
          />
        </div>

        {hasPending !== null && !hasPending && (
          <>
            <div className="mt-5 grid grid-cols-1 gap-4">
              <div>
                <Input
                  placeholder="Upload do pedido médico"
                  name="doctorRequest"
                  type="file"
                  onChange={(e: any) => handleFileChange(e, "#DOCTOR_REQUEST")}
                />
              </div>
              {(auth.examDefinition === "HER2" ||
                auth.examDefinition === "Claudina 18.2 + HER2") && (
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Upload do laudo HER2"
                    name="her2Report"
                    type="file"
                    onChange={(e: any) => handleFileChange(e, "#REPORT_TKC")}
                    disabled={
                      auth.examDefinition !== "HER2" &&
                      auth.examDefinition !== "Claudina 18.2 + HER2"
                    }
                  />
                  <CustomSelect
                    name="her2Result"
                    label="Resultado do laudo HER2"
                    options={[
                      { value: "Positivo", id: "Positivo" },
                      { value: "Negativo", id: "Negativo" },
                      { value: "Inconclusivo", id: "Inconclusivo" },
                    ]}
                    onChange={(e: any) => handleSelectChange(e, "HER2")}
                    value={her2Result}
                    disabled={
                      (auth.examDefinition !== "HER2" &&
                        auth.examDefinition !== "Claudina 18.2 + HER2") ||
                      auth.hasPending
                    }
                  />
                </div>
              )}
            </div>
            {(auth.examDefinition === "Claudina 18.2" ||
              auth.examDefinition === "Claudina 18.2 + HER2") && (
              <div className="mt-5 grid grid-cols-2 gap-4">
                <Input
                  placeholder="Upload do laudo Claudina 18.2"
                  name="claudinaReport"
                  type="file"
                  onChange={(e: any) => handleFileChange(e, "#REPORT_TKC")}
                  disabled={
                    auth.examDefinition !== "Claudina 18.2" &&
                    auth.examDefinition !== "Claudina 18.2 + HER2"
                  }
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
                  value={claudinaResult}
                  disabled={
                    (auth.examDefinition !== "Claudina 18.2" &&
                      auth.examDefinition !== "Claudina 18.2 + HER2") ||
                    auth.hasPending
                  }
                />
              </div>
            )}
          </>
        )}
        {hasPending && (
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
              value={logisticsStatus}
            />
            {logisticsStatus === "Ausência do termo do Paciente" && (
              <Input
                placeholder="Termo do paciente"
                name="file1"
                type="file"
                onChange={(e: any) =>
                  handleFileChange(e, "#PatientConsentForm_TKC")
                }
              />
            )}
          </div>
        )}
        <div className="flex mt-10">
          <Button onClick={sendDocument} variant="tertiary" className="w-full">
            Enviar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
