"use client";

import { DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CustomSelect } from "./custom/CustomSelect";
import { UFlist } from "@/helpers/select-filters";
import { useState } from "react";
import { addDoctorCrm } from "@/services/doctor";
import { toast } from "react-toastify";
import { useRegisterOncoCRM } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import ReactInputMask from "react-input-mask";

export function CrmRegister() {
  const refresh = useSession();
  const registerOncoCRM = useRegisterOncoCRM();
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [preRegisterData, setPreRegisterData] = useState<any>({
    DoctorName: "",
    LicenseNumber: "",
    LicenseState: "",
    EmailAddress1: "",
    HealthProgramCode: "985",
    MobileNumber: "",
  });

  const addDoctor = async () => {
    refresh.setRefresh(true);
    addDoctorCrm(preRegisterData)
      .then((res) => {
        if (!res.isValidData) {
          toast.error("Não foi possível cadastrar o médico");
        }
        if (res.isValidData) {
          toast.success("Médico cadastrado com sucesso!");
          setPreRegisterData({
            DoctorName: "",
            LicenseNumber: "",
            LicenseState: "",
            EmailAddress1: "",
            HealthProgramCode: "985",
            MobileNumber: "",
          });
          registerOncoCRM.openModal(false);
        }
      })
      .catch((err) => {
        toast.error("Erro ao cadastrar médico");
      })
      .finally(() => {
        refresh.setRefresh(false);
      });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setIsEmailValid(false);
      toast.error("Por favor, insira um e-mail válido.");
    } else {
      toast.success("E-mail válido.");
      setIsEmailValid(true);
    }
  };

  return (
    <DialogContent className="md:w-[40%] rounded-lg lg:max-w-[80vw]  border border-none">
      <div className="w-full flex flex-col gap-1 text-3xl md:text-2xl">
        <div>
          <p className="text-main-orange font-semibold md:text-xl text-base text-start">
            Registro CRM
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-4 mt-5">
          <Input
            name="LicenseNumber"
            placeholder="CRM"
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/\D/g, "");
              setPreRegisterData({
                ...preRegisterData,
                LicenseNumber: onlyNumbers,
              });
            }}
            value={preRegisterData.LicenseNumber}
            maxLength={10}
          />
          <CustomSelect
            name="LicenseState"
            label="UF"
            options={UFlist}
            onChange={(e) =>
              setPreRegisterData({
                ...preRegisterData,
                LicenseState: e.target.value,
              })
            }
          />

          <Input
            name="DoctorName"
            placeholder="Nome do Médico"
            onChange={(e) => {
              const onlyLetters = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
              setPreRegisterData({
                ...preRegisterData,
                DoctorName: onlyLetters,
              });
            }}
            value={preRegisterData.DoctorName}
            maxLength={50}
          />
          <ReactInputMask
            mask="(99) 99999-9999"
            value={preRegisterData.MobileNumber}
            onChange={(e: any) =>
              setPreRegisterData({
                ...preRegisterData,
                MobileNumber: e.target.value,
              })
            }
          >
            <Input
              name="MobileNumber"
              placeholder="Telefone/Celular do Médico"
            />
          </ReactInputMask>

          <Input
            name="EmailAddress1"
            placeholder="Email do Médico"
            type="email"
            onChange={(e) => {
              const email = e.target.value;
              setPreRegisterData({
                ...preRegisterData,
                EmailAddress1: email,
              });
            }}
            onBlur={(e) => {
              validateEmail(e.target.value);
            }}
            value={preRegisterData.EmailAddress1}
          />
        </div>

        <Button
          className="w-full py-3 mt-2"
          type="submit"
          variant="tertiary"
          onClick={addDoctor}
          disabled={
            !(
              preRegisterData.DoctorName &&
              preRegisterData.LicenseNumber &&
              preRegisterData.LicenseState &&
              preRegisterData.MobileNumber &&
              isEmailValid
            )
          }
        >
          Cadastrar
        </Button>
      </div>
    </DialogContent>
  );
}
