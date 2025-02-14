import { DialogContent } from "@/components/ui/dialog";
import { useChangePassword } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { changePassword } from "@/services/auth";
import { useTheme } from "next-themes";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { GoShieldX } from "react-icons/go";

export function PasswordChange() {
  const auth = useSession();
  const changedPassword = useChangePassword();
  const { theme, setTheme } = useTheme();
  const [sendQuestions, setSendQuestions] = useState({
    Email: auth.email as string,
    OldPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
    Programcode: "985",
  });

  const [passwordValid, setPasswordValid] = useState({
    length: false,
    special: false,
    number: false,
    uppercase: false,
    match: false,
  });

  const validatePassword = (password: string) => {
    const lengthValid = password.length >= 8 && password.length <= 12;
    const specialValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const numberValid = /\d/.test(password);
    const uppercaseValid = /[A-Z]/.test(password);
    const matchValid = sendQuestions.ConfirmPassword === password;

    setPasswordValid({
      length: lengthValid,
      special: specialValid,
      number: numberValid,
      uppercase: uppercaseValid,
      match: matchValid,
    });
  };

  useEffect(() => {
    validatePassword(sendQuestions.NewPassword);
  }, [sendQuestions.NewPassword, sendQuestions.ConfirmPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (value.length <= 12) {
      setSendQuestions((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    auth.setRefresh(true);
    changePassword(sendQuestions)
      .then((res) => {
        if (res) {
          toast.success("Senha alterada com sucesso, Favor logar novamente!");
          setTimeout(() => {
            changedPassword.openModal(false);
            if (theme !== "light") {
              setTheme("light");
            }
            auth.onLogout();
            clearFields();
          }, 3000);
        }
      })
      .catch((err) => {
        if (err.response?.data && Array.isArray(err.response.data)) {
          err.response.data.forEach((error: any) => {
            if (!error.isValid) {
              toast.error(error.message);
            }
          });
        } else {
          toast.error("Erro ao alterar senha!");
        }
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
      className="md:w-[30%] rounded-lg lg:max-w-[80vw]  border border-none"
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
          maxLength={12}
        />
        <Input
          type="password"
          name="NewPassword"
          placeholder="Nova Senha"
          value={sendQuestions.NewPassword}
          required
          onChange={handleChange}
          maxLength={12}
        />
        <Input
          type="password"
          name="ConfirmPassword"
          placeholder="Confirmar Nova Senha"
          value={sendQuestions.ConfirmPassword}
          required
          onChange={handleChange}
          maxLength={12}
        />
      </div>

      <div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            {passwordValid.length ? (
              <IoShieldCheckmarkOutline
                size={17}
                className="text-green-500 mr-2"
              />
            ) : (
              <GoShieldX size={17} className="text-red-500 mr-2" />
            )}
            <span
              className={`text-xs  font-bold ${
                passwordValid.length
                  ? "text-green-500 font-thin"
                  : "text-red-500"
              }`}
            >
              A senha deve ter entre no mínimo 8 caracteres e no máximo 12
              caracteres
            </span>
          </div>
          <div className="flex items-center">
            {passwordValid.special ? (
              <IoShieldCheckmarkOutline
                size={17}
                className="text-green-500 mr-2"
              />
            ) : (
              <GoShieldX size={17} className="text-red-500 mr-2" />
            )}
            <span
              className={`text-xs  font-bold ${
                passwordValid.special
                  ? "text-green-500 font-thin"
                  : "text-red-500"
              }`}
            >
              Deve conter caracteres especiais
            </span>
          </div>
          <div className="flex items-center">
            {passwordValid.number ? (
              <IoShieldCheckmarkOutline
                size={17}
                className="text-green-500 mr-2"
              />
            ) : (
              <GoShieldX size={17} className="text-red-500 mr-2" />
            )}
            <span
              className={`text-xs  font-bold ${
                passwordValid.number
                  ? "text-green-500 font-thin"
                  : "text-red-500"
              }`}
            >
              Deve conter pelo menos um número
            </span>
          </div>
          <div className="flex items-center">
            {passwordValid.uppercase ? (
              <IoShieldCheckmarkOutline
                size={17}
                className="text-green-500 mr-2"
              />
            ) : (
              <GoShieldX size={17} className="text-red-500 mr-2" />
            )}
            <span
              className={`text-xs  font-bold ${
                passwordValid.uppercase
                  ? "text-green-500 font-thin"
                  : "text-red-500"
              }`}
            >
              Deve conter pelo menos uma letra maiúscula
            </span>
          </div>
          <div className="flex items-center">
            {passwordValid.match ? (
              <IoShieldCheckmarkOutline
                size={17}
                className="text-green-500 mr-2"
              />
            ) : (
              <GoShieldX size={17} className="text-red-500 mr-2" />
            )}
            <span
              className={`text-xs  font-bold ${
                passwordValid.match
                  ? "text-green-500 font-thin"
                  : "text-red-500"
              }`}
            >
              As senhas devem coincidir
            </span>
          </div>
        </div>

        <Button
          className="w-full mt-5"
          onClick={handleSubmit}
          disabled={
            !passwordValid.length ||
            !passwordValid.special ||
            !passwordValid.number ||
            !passwordValid.uppercase ||
            !passwordValid.match ||
            !sendQuestions.OldPassword
          }
        >
          Alterar Senha
        </Button>
      </div>
    </DialogContent>
  );
}
