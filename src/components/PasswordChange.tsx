"use client";

import { DialogContent } from "@/components/ui/dialog";
import { useChangePassword } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { useState } from "react";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { changePassword } from "@/services/auth";

export function PasswordChange() {
  const auth = useSession();
  const changedPassword = useChangePassword();
  const [sendQuestions, setSendQuestions] = useState({
    Email: auth.email as string,
    OldPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
    Programcode: "985",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSendQuestions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    auth.setRefresh(true);
    changePassword(sendQuestions)
      .then((res) => {
        if (res) {
          toast.success("Senha alterada com sucesso, Favor logar novamente!");
          setTimeout(() => {
            changedPassword.openModal(false);
            auth.onLogout();
            clearFields();
          }, 4000);
        }
      })
      .catch((err) => {
        toast.error("Erro ao alterar senha!");
      });
  };

  const clearFields = () => {
    setSendQuestions({
      Email: "",
      OldPassword: "",
      NewPassword: "",
      ConfirmPassword: "",
      Programcode: "985",
    });
  };
  return (
    <DialogContent
      showCloseIcon={false}
      className="w-[30%] rounded-lg lg:max-w-[80vw]  border border-none"
    >
      <span className="text-main-blue text-2xl text-center mb-5">
        Alterar Senha
      </span>
      <div className="grid grid-cols-1 gap-4">
        <Input
          type="password"
          name="OldPassword"
          placeholder="Senha Atual"
          value={sendQuestions.OldPassword}
          required
          onChange={handleChange}
        />
        <Input
          type="password"
          name="NewPassword"
          placeholder="Nova Senha"
          value={sendQuestions.NewPassword}
          required
          onChange={handleChange}
        />
        <Input
          type="password"
          name="ConfirmPassword"
          placeholder="Confirmar Nova Senha"
          value={sendQuestions.ConfirmPassword}
          required
          onChange={handleChange}
        />
      </div>

      <div className="mt-5">
        <Button className="w-full" onClick={handleSubmit}>
          Alterar Senha
        </Button>
      </div>
    </DialogContent>
  );
}
