"use client";

import { DialogContent } from "@/components/ui/dialog";
import { useModalLogisticaReversa, useSolicitation } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import {
  getReverseLogisticsByExamId,
  pendentDiagnostic,
  setReturnProgressByExamId,
} from "@/services/diagnostic";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CustomSelect } from "./custom/CustomSelect";
import { Dialog } from "@radix-ui/react-dialog";
import { formatDate } from "date-fns";

export function ModalLogistocaReversa() {
  const [devolution, setDevolution] = useState(false);
  const modalLogisticaReversa = useModalLogisticaReversa();
  const dataStorage = useSession();
  const [dados, setDados] = useState<any>([]);
  const [data, setData] = useState<any>([
    {
      ExamId: dataStorage.id,
      ExpectedReturnDate: "",
      SamplePostingData: "",
      TrackingCode: "",
      ProgramCode: "985",
    },
  ]);

  const handleDevolution = () => {
    setDevolution(true);
  };

  const reverseLogisticsByExamId = async () => {
    getReverseLogisticsByExamId(dataStorage.id).then((res) => {
      setDados(res.value);
      console.log(res.value);
    });
  };

  useEffect(() => {
    if (modalLogisticaReversa.isModalOpen && dataStorage.id) {
      reverseLogisticsByExamId();
    }
  }, [modalLogisticaReversa.isModalOpen, dataStorage.id]);

  const handleChanges = (e: any) => {
    const { name, value } = e.target;

    if (name === "SamplePostingData" || name === "ExpectedReturnDate") {
      if (value) {
        try {
          const formattedValue = new Date(value).toISOString();
          setData([{ ...data[0], [name]: formattedValue }]);
        } catch (error) {
          console.error("Erro ao converter data:", error);
          toast.error("Data inválida. Verifique o formato.");
        }
      } else {
        setData([{ ...data[0], [name]: "" }]); // Garante que o estado não fique com valor inválido
      }
    } else {
      setData([{ ...data[0], [name]: value }]);
    }
  };

  const returnProgressByExamId = () => {
    setReturnProgressByExamId(data)
      .then((res) => {
        if (res.isValidData === false) {
          toast.error(res.value);
          return;
        }

        toast.success(res.value);
        modalLogisticaReversa.openModal(false);
        setDevolution(false);
        dataStorage.setRefresh(true);
        setData([
          {
            ExamId: "",
            ExpectedReturnDate: "",
            SamplePostingData: "",
            TrackingCode: "",
            ProgramCode: "985",
          },
        ]);
      })
      .catch(() => {
        toast.error("Erro ao confirmar devolução da amostra");
      })
      .finally(() => {
        dataStorage.setRefresh(false);
      });
  };

  return (
    <Dialog
      open={modalLogisticaReversa.isModalOpen}
      onOpenChange={modalLogisticaReversa.openModal}
    >
      <DialogContent className="w-[50%] rounded-lg lg:max-w-[80vw]  border border-none">
        <div className="flex items-center gap-2">
          <span className="text-xl text-main-blue">Nome do Paciente:</span>
          <span className="text-lg">{dataStorage.namePatient}</span>
        </div>
        {devolution ? (
          <>
            <div className="w-full grid grid-cols-2 items-center gap-4">
              <Input
                type="datetime-local"
                name="SamplePostingData"
                onChange={handleChanges}
                value={
                  data[0].SamplePostingData
                    ? data[0].SamplePostingData.slice(0, 16) // Mantém apenas YYYY-MM-DDTHH:mm
                    : ""
                }
                placeholder="Data da postagem da amostra"
              />
              <Input
                type="datetime-local"
                name="ExpectedReturnDate"
                onChange={handleChanges}
                value={
                  data[0].ExpectedReturnDate
                    ? data[0].ExpectedReturnDate.slice(0, 16) // Mantém apenas YYYY-MM-DDTHH:mm
                    : ""
                }
                placeholder="Data prevista de retorno"
              />
              <Input
                placeholder="Código de rastreio"
                type="text"
                name="TrackingCode"
                onChange={handleChanges}
                value={data[0].TrackingCode}
              />
            </div>
            <div className="flex mt-10">
              <Button
                onClick={returnProgressByExamId}
                variant="tertiary"
                className="w-full"
              >
                Confirmar devolução da amostra
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="w-full grid grid-cols-2 items-center  gap-4">
              <Input
                placeholder="CPF/CNPJ"
                type="text"
                name=""
                disabled
                value={dados?.cpf || dados?.cnpj}
              />
              <Input
                placeholder="Nome da pessoa responsável"
                type="text"
                name="responsibleForReceiving"
                disabled
                value={dados?.responsibleForReceiving}
              />
            </div>
            <div className="w-full grid grid-cols-2 items-center gap-4">
              <Input
                placeholder="Telefone da pessoa responsável"
                type="text"
                name=""
                disabled
                value={dados?.mainContact ?? dados?.mainContact ?? ""}
              />
              <Input
                placeholder="CEP"
                type="email"
                name=""
                disabled
                value={dados?.addressPostalCode}
              />
            </div>
            <div className="w-full grid grid-cols-2 items-center gap-4">
              <Input
                placeholder="Logradouro"
                type="text"
                name=""
                disabled
                value={dados?.addressName}
              />
              <Input
                placeholder="Número"
                type="text"
                name=""
                disabled
                value={dados?.addressNumber}
              />
            </div>
            <div className="w-full grid grid-cols-2 items-center gap-4">
              <Input
                placeholder="Complemento"
                type="text"
                name=""
                disabled
                value={
                  dados?.addressComplement ?? dados?.addressComplement ?? ""
                }
              />
              <Input placeholder="Bairro" type="text" name="" disabled />
            </div>
            <div className="w-full grid grid-cols-2 items-center gap-4">
              <Input
                placeholder="Cidade"
                type="text"
                name=""
                disabled
                value={dados?.addressDistrict}
              />
              <Input
                placeholder="UF"
                type="text"
                name=""
                disabled
                value={dados?.addressState}
              />
            </div>
            <div className="w-full grid grid-cols-2 items-center gap-4">
              <Input
                placeholder="Horário de preferência"
                type="text"
                name=""
                disabled
                value={dados?.preferredTime}
              />
            </div>

            <div className="flex mt-10">
              <Button
                onClick={handleDevolution}
                variant="tertiary"
                className="w-full"
              >
                Agendar devolução da amostra
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
