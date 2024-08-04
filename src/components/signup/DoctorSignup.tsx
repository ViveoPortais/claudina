"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useAcceptTerms } from "@/hooks/useTerms";
import { UFlist, medicSpecialtyFilter } from "@/helpers/select-filters";
import { addDoctor, getDoctorbyCRM } from "@/services/doctor";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { maskedField } from "../custom/MaskedField";
import { CustomSelect } from "../custom/CustomSelect";
import { Loading } from "../custom/Loading";
import { TermsModal } from "./TermsModal";
import { useAccept, useModal, useModalEmail } from "@/hooks/useModal";
import { RescueRegister } from "./RescueRegister";
import { AcceptRegister } from "./AcceptRegister";
import { RescueRegisterEmail } from "./RescueRegisterEmail";
import { getAddressByCep } from "@/services/address";
import { InputLoading } from "../custom/InputLoading";
import { TreatmentTerms } from "./TreatmentTerms";

const doctorSignUpSchema = z.object({
  doctorName: z.string().min(1, { message: "Insira seu nome" }),
  cpf: z.string().min(1, { message: "Insira seu CPF" }),
  licenseNumber: z.string().min(1, { message: "Insira um CRM válido" }),
  licenseState: z.string().min(1, { message: "Insira um UF válido" }),
  medicalSpecialty: z.string().min(1, { message: "Campo obrigatório" }),
  emailAddress1: z.string().email({ message: `Insira um e-mail válido` }),
  telephoneNumber: z.string().min(1, { message: "Informe o número" }),
  mobileNumber: z.string().min(1, { message: "Informe o número" }),
  addressPostalCode: z.string().min(1, { message: "Informe o número" }),
  addressCity: z.string().min(1, { message: "Informe o número" }),
  addressState: z.string().min(1, { message: "Informe o número" }),

  // regulation: z.boolean().default(false).refine((val) => val === true, {
  //     message: "É necessário aceitar os termos de Consentimento e de Privacidade",
  // }),
  personalData: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "As informações devem ser verdadeiras para continuar",
    }),
});

type DoctorSignUpSchemaProps = z.infer<typeof doctorSignUpSchema>;

export function DoctorSignUp() {
  const router = useRouter();

  const {
    register,
    control,
    watch,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<DoctorSignUpSchemaProps>({
    resolver: zodResolver(doctorSignUpSchema),
  });

  const termsModal = useAcceptTerms();
  const modalRescue = useModal();
  const modalAccept = useAccept();
  const useEmail = useModalEmail();
  const doctorUfCrm = watch("licenseState");

  const [medicalSpecialtyOptions, setMedicalSpecialtyOptions] = useState<
    { id: string; value: string }[]
  >([]);
  const [isDoctorInfoLoading, setIsDoctorInfoLoading] = useState(false);
  const [addDoctorLoading, setAddDoctorLoading] = useState(false);
  const [getLocationInfoLoading, setGetLocationInfoLoading] = useState(false);

  useEffect(() => {
    if (!!doctorUfCrm) {
      getDoctorInfo();
    }
  }, [doctorUfCrm]);

  async function getDoctorInfo() {
    setIsDoctorInfoLoading(true);

    const crm = getValues("licenseNumber");
    const ufcrm = getValues("licenseState");

    try {
      const response = await getDoctorbyCRM({
        crm,
        ufcrm,
      });

      if (!response.name) {
        toast.error(
          "CRM Inválido, digite um CRM válido para prosseguir com o cadastro"
        );
        setValue("doctorName", "");
        setIsDoctorInfoLoading(false);
        return;
      }

      setValue("doctorName", response.name);

      if (!response.medicalSpecialty) {
        setMedicalSpecialtyOptions(medicSpecialtyFilter);
      } else {
        setMedicalSpecialtyOptions([
          {
            id: response.medicalSpecialty,
            value: response.medicalSpecialty,
          },
        ]);
      }

      setIsDoctorInfoLoading(false);
    } catch {
      toast.error("Erro ao buscar dados");
      setIsDoctorInfoLoading(false);
    }
  }

  async function handleAddress() {
    setGetLocationInfoLoading(true);
    const cep = getValues("addressPostalCode");
    try {
      const response = await getAddressByCep(cep);

      if (response) {
        setValue("addressCity", response.localidade);
        setValue("addressState", response.uf);
      }
    } catch (err) {
      toast.error("Erro ao buscar endereço");
      setValue("addressCity", "");
      setValue("addressState", "");
    }
    setGetLocationInfoLoading(false);
  }

  async function registerDoctor(data: DoctorSignUpSchemaProps) {
    setAddDoctorLoading(true);
    try {
      const res = await addDoctor({
        doctorName: data.doctorName,
        cpf: data.cpf,
        licenseNumber: data.licenseNumber,
        licenseState: data.licenseState,
        medicalSpecialty: data.medicalSpecialty,
        emailAddress1: data.emailAddress1,
        telephoneNumber: data.telephoneNumber,
        mobileNumber: data.mobileNumber,
        addressCity: data.addressCity,
        addressState: data.addressState,
        healthProgramCode: "985",
      });

      if (res.isValidData === true) {
        modalAccept.openModal(true);
        setTimeout(() => {
          modalAccept.openModal(false);
          router.push("/signin");
        }, 5000);
      }
    } catch (err: any) {
      setAddDoctorLoading(false);
      if (err?.response?.data?.value === "Médico já cadastrado no programa.") {
        useEmail.openModal(true);
      } else {
        modalRescue.openModal(true);
      }
    }
  }
  const handleCrmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setValue("licenseNumber", value);
  };

  return (
    <div className="text-zinc-800">
      <h1 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 text-main-orange">
        Cadastro - Médico
      </h1>

      <form
        onSubmit={handleSubmit(registerDoctor)}
        className="w-full flex flex-col gap-4"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="w-full">
            <Input
              type="text"
              placeholder="CRM"
              maxLength={10}
              {...register("licenseNumber", {
                pattern: {
                  value: /^\d{1,6}$/,
                  message: "O CRM deve conter apenas números.",
                },
              })}
              onChange={handleCrmChange}
            />
            {errors.licenseNumber && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.licenseNumber.message}
              </span>
            )}
          </div>
          <div className="w-full">
            <Controller
              name="licenseState"
              control={control}
              render={({ field }) => (
                <CustomSelect label="UF do CRM" options={UFlist} {...field} />
              )}
            />
            {errors.licenseState && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.licenseState.message}
              </span>
            )}
          </div>

          <div className="w-full md:col-span-2">
            <Input
              type="text"
              placeholder="Nome completo"
              isLoading={isDoctorInfoLoading}
              {...register("doctorName", { required: "Campo obrigatório" })}
              disabled
            />
            {errors.doctorName && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.doctorName.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full">
          <Controller
            name="medicalSpecialty"
            control={control}
            render={({ field }) => (
              <CustomSelect
                label="Especialidade"
                isLoading={isDoctorInfoLoading}
                options={medicalSpecialtyOptions}
                {...field}
              />
            )}
          />
          {errors.medicalSpecialty && (
            <span className="ml-2 w-full text-xs text-red-400 mt-1">
              {errors.medicalSpecialty.message}
            </span>
          )}
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="w-full">
            <Input
              type="email"
              placeholder="E-mail"
              {...register("emailAddress1", { required: "Campo obrigatório" })}
            />
            {errors.emailAddress1 && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.emailAddress1.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <Controller
              name="cpf"
              control={control}
              render={({ field }) =>
                maskedField(
                  "cpf",
                  field.onChange,
                  field.name,
                  "CPF",
                  false,
                  () => {},
                  field.value
                )
              }
            />
            {errors.cpf && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.cpf.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <Controller
              name="telephoneNumber"
              control={control}
              render={({ field }) =>
                maskedField(
                  "phone",
                  field.onChange,
                  field.name,
                  "Telefone",
                  false,
                  () => {},
                  field.value
                )
              }
            />
            {errors.telephoneNumber && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.telephoneNumber.message}
              </span>
            )}
          </div>
          <div className="w-full">
            <Controller
              name="mobileNumber"
              control={control}
              render={({ field }) =>
                maskedField(
                  "cellphone",
                  field.onChange,
                  field.name,
                  "Celular",
                  false,
                  () => {},
                  field.value
                )
              }
            />

            {errors.mobileNumber && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.mobileNumber.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="w-full">
            {getLocationInfoLoading ? (
              <InputLoading />
            ) : (
              <Controller
                name="addressPostalCode"
                control={control}
                render={({ field }) =>
                  maskedField(
                    "cep",
                    field.onChange,
                    field.name,
                    "CEP",
                    false,
                    handleAddress,
                    field.value
                  )
                }
              />
            )}
            {errors.addressPostalCode && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.addressPostalCode.message}
              </span>
            )}
          </div>
          <div className="w-full">
            <Input
              type="text"
              placeholder="Cidade"
              {...register("addressCity", { required: "Campo obrigatório" })}
              isLoading={getLocationInfoLoading}
              disabled
            />
            {errors.addressCity && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.addressCity.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <Input
              type="text"
              placeholder="Estado"
              {...register("addressState", { required: "Campo obrigatório" })}
              isLoading={getLocationInfoLoading}
              disabled
            />

            {errors.addressState && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                Selecione o Estado
              </span>
            )}
          </div>
        </div>

        <div className="w-full grid grid-cols-2 lg:grid-cols-4 lg:gap-2">
          <div className="w-full flex flex-row items-center gap-4 mt-4 lg:col-span-2">
            <Checkbox
              checked={termsModal.isMedicDiagnosticTermsAccepted}
              onCheckedChange={termsModal.acceptMedicDiagnosticTerms}
              disabled
            />

            <span className="uppercase text-[11px]">
              Li e aceito a
              <Dialog
                open={termsModal.isDiagnosticModalOpen}
                onOpenChange={termsModal.openDiagnosticModal}
              >
                <DialogTrigger className="text-main-orange underline cursor-pointer uppercase text-[11px] ml-2">
                  Politica de Privacidade
                </DialogTrigger>

                <TermsModal
                  type="diagnostic"
                  isOpen={termsModal.isDiagnosticModalOpen}
                  setOpen={termsModal.openDiagnosticModal}
                />
              </Dialog>
            </span>
          </div>

          {!termsModal.isMedicDiagnosticTermsAccepted && (
            <span className="ml-2 w-full text-xs text-red-400 mt-2 h-full flex items-center">
              É necessário aceitar o termo para continuar
            </span>
          )}

          <div className="w-full flex flex-row items-center gap-4 mt-4 lg:col-span-2">
            <Checkbox
              checked={termsModal.isMedicTreatmentTermsAccepted}
              onCheckedChange={termsModal.acceptMedicTreatmentTerms}
              disabled
            />

            <span className="uppercase text-[11px]">
              Li e aceito o
              <Dialog
                open={termsModal.isTreatmentModalOpen}
                onOpenChange={termsModal.openTreatmentModal}
              >
                <DialogTrigger className="text-main-orange underline cursor-pointer uppercase text-[11px] ml-2">
                  Regulamento do Programa
                </DialogTrigger>

                <TermsModal
                  type="treatment"
                  isOpen={termsModal.isTreatmentModalOpen}
                  setOpen={termsModal.openTreatmentModal}
                />
              </Dialog>
            </span>
          </div>

          {!termsModal.isMedicTreatmentTermsAccepted && (
            <span className="ml-2 w-full text-xs text-red-400 mt-2 h-full flex items-center">
              É necessário aceitar o termo para continuar
            </span>
          )}

          <div className="w-full flex flex-row items-center gap-4 mt-4 lg:col-span-2">
            <Checkbox
              checked={termsModal.isPatientTermsAccepted}
              onCheckedChange={termsModal.acceptPatientTerms}
              disabled
            />

            <span className="uppercase text-[11px]">
              Li e aceito o
              <Dialog
                open={termsModal.isPatientModalOpen}
                onOpenChange={termsModal.openPatientModal}
              >
                <DialogTrigger className="text-main-orange underline cursor-pointer uppercase text-[11px] ml-2">
                  Termo de Consentimento
                </DialogTrigger>

                <TermsModal
                  type="patient"
                  isOpen={termsModal.isPatientModalOpen}
                  setOpen={termsModal.openPatientModal}
                />
              </Dialog>
            </span>
          </div>

          {!termsModal.isPatientTermsAccepted && (
            <span className="ml-2 w-full text-xs text-red-400 mt-2 h-full flex items-center">
              É necessário aceitar o termo para continuar
            </span>
          )}
        </div>

        <div className="w-full">
          <div className="w-full flex items-center gap-4">
            <Controller
              name="personalData"
              control={control}
              rules={{
                required: "Campo obrigatório",
              }}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <span className="uppercase text-[11px]">
              AFIRMO QUE LI E CONFERI MEUS DADOS PESSOAIS E QUE TODAS AS
              INFORMAÇÕES AQUI PREENCHIDAS SÃO VERDADEIRAS
            </span>
          </div>
          <div className="ml-9 text-blue">
            <span className="text-[12px] text-main-orange">
              Os seus dados serão tratados conforme a nossa política de
              privacidade
            </span>
          </div>

          {errors.personalData && (
            <span className="ml-2 w-full text-xs text-red-400 mt-1">
              {errors.personalData.message}
            </span>
          )}
        </div>

        <Button
          type="submit"
          size={`lg`}
          className={`mt-4 md:mt-3 ${addDoctorLoading && "bg-zinc-500"} }`}
          disabled={
            !isValid ||
            addDoctorLoading ||
            !termsModal.isMedicDiagnosticTermsAccepted ||
            !termsModal.isMedicTreatmentTermsAccepted ||
            !termsModal.isPatientTermsAccepted
          }
        >
          {addDoctorLoading ? <Loading /> : "Cadastrar"}
        </Button>
      </form>
      <div>
        <Dialog
          open={modalRescue.isModalOpen}
          onOpenChange={modalRescue.openModal}
        >
          <RescueRegister />
        </Dialog>
      </div>
      <div>
        <Dialog open={useEmail.isModalOpen} onOpenChange={useEmail.openModal}>
          <RescueRegisterEmail />
        </Dialog>
      </div>
      <div>
        <Dialog
          open={modalAccept.isModalOpen}
          onOpenChange={modalAccept.openModal}
        >
          <AcceptRegister />
        </Dialog>
      </div>
    </div>
  );
}
