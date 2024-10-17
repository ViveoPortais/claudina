"use client";

import { DialogContent } from "@/components/ui/dialog";
import { useSendLaudo } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { sendLaudoPatient } from "@/services/diagnostic";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function SendLaudo() {
  const auth = useSession();
  const sendLaudo = useSendLaudo();
  const [sendQuestions, setSendQuestions] = useState({
    FileName: "",
    DocumentBody: "",
    ProgramCode: "985",
    Flag: "#A_LAUDOANATOMO",

    Diagnostic: {
      Cpf: auth.cpfLaudo as string,
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSendQuestions({
      ...sendQuestions,
      Diagnostic: {
        ...sendQuestions.Diagnostic,
        [name]: value,
      },
    });
  };

  useEffect(() => {
    if (auth.cpfLaudo) {
      setSendQuestions((prevState) => ({
        ...prevState,
        Diagnostic: {
          ...prevState.Diagnostic,
          Cpf: auth.cpfLaudo!,
        },
      }));
    }
  }, [auth.cpfLaudo]);

  const fileBase64 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSendQuestions({
          ...sendQuestions,
          FileName: file.name,
          DocumentBody: reader.result as string,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    auth.setRefresh(true);
    sendLaudoPatient(sendQuestions)
      .then((res) => {
        if (res) {
          toast.success("Laudo enviado com sucesso");
          sendLaudo.openModal(false);
          clearFields();
        }
      })
      .catch((err) => {
        toast.error("Erro ao enviar laudo");
      })
      .finally(() => {
        auth.setRefresh(false);
      });
  };

  const clearFields = () => {
    setSendQuestions({
      FileName: "",
      DocumentBody: "",
      ProgramCode: "985",
      Flag: "#A_LAUDOANATOMO",
      Diagnostic: {
        Cpf: auth.cpfLaudo as string,
      },
    });
  };
  return (
    <DialogContent className="w-[30%] rounded-lg lg:max-w-[80vw]  border border-none">
      <div className="grid grid-cols-2 gap-4">
        <Input
          name="Name"
          placeholder="Nome Completo"
          value={auth.nameLaudo}
          required
          disabled
          onChange={handleChange}
        />
        <Input
          name="Cpf"
          placeholder="CPF"
          value={auth.cpfLaudo}
          required
          disabled
          onChange={handleChange}
        />
      </div>
      <div className="mt-5">
        <Input
          placeholder="Insira o laudo anatomopatológico"
          name="DocumentBody"
          type="file"
          onChange={fileBase64}
        />
      </div>
      <div className="mt-5">
        <Button className="w-full" onClick={handleSubmit}>
          Enviar Laudo
        </Button>
      </div>
    </DialogContent>
  );
}
