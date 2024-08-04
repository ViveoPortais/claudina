"use client";

import { AcceptRegister } from "@/components/signup/AcceptRegister";
import { PasswordCorrect } from "@/components/signup/PasswordCorrect";
import { PasswordErr } from "@/components/signup/PasswordErr";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { passwordCorrect, passwordErr } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { disableDoctor, getDoctorInfo, updateDoctor } from "@/services/doctor";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Logistics() {
  const auth = useSession();
  const router = useRouter();
  const accept = passwordCorrect();
  const err = passwordErr();

  const programCode = "985";

  const [isAccepted, setIsAccepted] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState<any>({
    healthProgramCode: "150",
    licenseNumber: "",
    licenseState: "",
    emailAddress: "",
    telephoneNumber: "",
    mobileNumber: "",
    addressCity: "",
    name: "",
    password: "",
    newPassword: "",
  });

  const infoDoctor = async () => {
    getDoctorInfo()
      .then((res) => {
        setDoctorInfo(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const doctorUpdate = async () => {
    updateDoctor(doctorInfo)
      .then((res) => {
        if (!res.isValidData) {
          err.openModal(true);
          setIsAccepted(false);
        }
        if (res.isValidData) {
          accept.openModal(true);
          setIsAccepted(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const disable = async () => {
    disableDoctor(programCode).then((res) => {
      if (res.isValidData) {
        toast.success("Desativado com sucesso");
        auth.onLogout();
        router.push("/");
      }
      if (!res.isValidData) {
        toast.error("Erro ao desativar");
      }
    });
  };

  const handleChange = (e: any) => {
    setDoctorInfo({ ...doctorInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    infoDoctor();
  }, []);

  return (
    <div className="h-full w-full">
      <h1 className="bg-main-orange p-4 rounded-xl w-full text-start text-white font-semibold text-lg md:text-2xl mb-8">
        Meus dados
      </h1>

      <div className="flex flex-col items-center gap-4">
        <div
          className={`w-full grid grid-cols-1 ${
            auth.role === "doctor" && "md:grid-cols-4"
          } gap-4`}
        >
          <Input
            placeholder="Nome completo"
            name="name"
            value={doctorInfo.name}
            disabled
            className={auth.role === "doctor" ? "md:col-span-2" : ""}
          />

          {auth.role === "doctor" && (
            <>
              <Input
                placeholder="CRM"
                name="licenseNumber"
                value={doctorInfo.licenseNumber}
                disabled
              />
              <Input
                placeholder="UF"
                name="licenseState"
                value={doctorInfo.licenseState}
                disabled
              />
            </>
          )}
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Celular"
            name="mobileNumber"
            value={doctorInfo.mobileNumber}
            disabled
          />
        </div>

        <div className="w-full h-[1px] bg-main-orange/80 my-8" />

        <div className="w-full flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid md:grid-cols-3 gap-4">
            <Input
              placeholder="E-mail"
              name="emailAddress"
              value={doctorInfo.emailAddress}
              disabled
            />
            <Input
              type="password"
              placeholder="Senha Atual"
              name="password"
              value={doctorInfo.password}
              disabled
            />
            <Input
              type="password"
              placeholder="Nova Senha"
              name="newPassword"
              value={doctorInfo.newPassword}
              disabled
            />
          </div>
          <div className="w-full flex flex-col items-center gap-2 md:flex md:flex-row md:gap-4 mt-5">
            <Dialog>
              <DialogTrigger className="inline-flex w-full items-center justify-center whitespace-nowrap bg-black text-white hover:bg-gray-700 h-11 rounded-lg px-8 py-4 md:py-6 text-xs md:text-base uppercase lg:max-w-[200px]">
                Editar
              </DialogTrigger>

              <DialogContent className="mt-4">
                {isAccepted ? (
                  <>
                    <h1 className="text-lg md:text-2xl font-semibold">
                      Alterar Dados
                    </h1>
                    <p className="mt-1 mb-2 md:mb-4">
                      Por favor insira o novo Email e uma Nova Senha:
                    </p>

                    <Input
                      placeholder="E-mail"
                      name="emailAddress"
                      value={doctorInfo.emailAddress}
                      onChange={handleChange}
                    />
                    <Input
                      placeholder="Senha Atual"
                      name="password"
                      value={doctorInfo.password}
                      onChange={handleChange}
                    />
                    <Input
                      placeholder="Nova Senha"
                      name="newPassword"
                      value={doctorInfo.newPassword}
                      onChange={handleChange}
                    />

                    <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
                      <DialogClose asChild>
                        <Button onClick={doctorUpdate}>Salvar</Button>
                      </DialogClose>

                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="tertiary"
                          onClick={() => setIsAccepted(false)}
                        >
                          Cancelar
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </>
                ) : (
                  <>
                    <h1 className="text-lg md:text-2xl font-semibold">
                      Atenção
                    </h1>
                    <p className="my-2 md:my-4">
                      Olá Dr(a) {auth.name} , caso o E-mail e Senha informados
                      forem alterados, seu login de acesso ao portal também será
                      alterado. Está de acordo?
                    </p>

                    <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
                      <Button onClick={() => setIsAccepted(true)}>
                        Confirmar
                      </Button>

                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="tertiary"
                          onClick={() => setIsAccepted(false)}
                        >
                          Cancelar
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </>
                )}
              </DialogContent>
            </Dialog>
            <Button
              onClick={disable}
              className="inline-flex w-full items-center justify-center whitespace-nowrap bg-black text-white hover:bg-gray-700 h-11 rounded-lg px-8 py-4 md:py-6 text-xs md:text-base uppercase lg:max-w-[200px]"
            >
              Descadastrar
            </Button>
          </div>
          <Dialog open={err.isModalOpen} onOpenChange={err.openModal}>
            <PasswordErr />
          </Dialog>
          <Dialog open={accept.isModalOpen} onOpenChange={accept.openModal}>
            <PasswordCorrect />
          </Dialog>
        </div>
      </div>
    </div>
  );
}
