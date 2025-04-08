"use client";

import { DialogContent } from "@/components/ui/dialog";
import {
  useModalLogisticaReversa,
  useModalLogisticaReversaConfirmation,
  useSolicitation,
} from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import {
  getReverseLogisticsByExamId,
  pendentDiagnostic,
  setReturnCompletedByExamId,
  setReturnProgressByExamId,
} from "@/services/diagnostic";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CustomSelect } from "./custom/CustomSelect";
import { Dialog } from "@radix-ui/react-dialog";
import { formatDate } from "date-fns";

export function ModalLogistocaReversaOnco() {
  const modalLogisticaReversa = useModalLogisticaReversaConfirmation();
  const dataStorage = useSession();
  const [data, setData] = useState<any>([
    {
      ExamId: dataStorage.confirmCode,
      SampleDeliveryDate: "",
      StatusFlag: "",
      ProgramCode: "985",
    },
  ]);

  const handleChanges = (e: any) => {
    const { name, value } = e.target;

    if (name === "SampleDeliveryDate" && value) {
      if (value) {
        try {
          const formattedValue = new Date(value).toISOString();
          setData([{ ...data[0], [name]: formattedValue }]);
        } catch (error) {
          console.error("Erro ao converter data:", error);
          toast.error("Data inválida. Verifique o formato.");
        }
      } else {
        setData([{ ...data[0], [name]: "" }]);
      }
    } else {
      setData([{ ...data[0], [name]: value }]);
    }
  };

  const ResponseProgressByExamId = () => {
    setReturnCompletedByExamId(data)
      .then((res) => {
        if (res.isValidData === false) {
          toast.error(res.value);
          return;
        }
        if (res.isValidData === true) {
          toast.success(res.value);
          modalLogisticaReversa.openModal(false);
          dataStorage.setRefresh(true);
          setData([
            {
              ExamId: "",
              SampleDeliveryDate: "",
              StatusFlag: "",
              ProgramCode: "985",
            },
          ]);
        }
      })
      .catch((err) => {
        toast.error("Erro ao confirmar devolução da amostra");
      })
      .finally(() => {
        dataStorage.setRefresh(false);
      });
  };

  useEffect(() => {
    setData([
      {
        ExamId: dataStorage.confirmCode,
        SampleDeliveryDate: "",
        StatusFlag: "",
        ProgramCode: "985",
      },
    ]);
  }, [dataStorage.confirmCode]);

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

        <div className="w-full grid grid-cols-2 items-center gap-4">
          <Input
            type="datetime-local"
            name="SampleDeliveryDate"
            onChange={handleChanges}
            value={
              data[0].SampleDeliveryDate
                ? data[0].SampleDeliveryDate.slice(0, 16)
                : ""
            }
            placeholder="Data de Entrega da amostra"
          />
          <CustomSelect
            label="Status da devolução"
            name="StatusFlag"
            onChange={handleChanges}
            options={[
              { id: "#RETURN_COMPLETED", value: "Devolução concluída" },
              { id: "#ADDRESS_NOT_FOUND", value: "Endereço não localizado" },
              { id: "#RECIPIENT_ABSENT", value: "Destinatário ausente" },
              { id: "#MISPLACEMENT", value: "Extravio" },
              { id: "#OTHERS", value: "Outros" },
            ]}
            value={data.StatusFlag}
          />

          <Input
            placeholder="Código de rastreio"
            type="text"
            name="TrackingCode"
            value={dataStorage?.trackingCode}
            disabled
          />
        </div>
        <div className="flex mt-10">
          <Button
            onClick={ResponseProgressByExamId}
            variant="tertiary"
            className="w-full"
          >
            Confirmar devolução da amostra
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
