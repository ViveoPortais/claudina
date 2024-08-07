"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAcceptTerms } from "@/hooks/useTerms";
import { UFlist } from "@/helpers/select-filters";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { maskedField } from "../custom/MaskedField";
import { CustomSelect } from "../custom/CustomSelect";
import { Loading } from "../custom/Loading";
import { TermsModal } from "./TermsModal";
import { useAccept, useModal, useModalEmail } from "@/hooks/useModal";
import { AcceptRegisterOther } from "./AcceptRegisterOther";
import { RescueRegisterEmailOther } from "./RescueRegisterEmailOther";
import { RescueRegisterOther } from "./RescueRegisterOther";
import { AddOtherProfessional } from "@/services/representative";

const doctorSignUpSchema = z.object({
  ProfessionalName: z
    .string()
    .min(1, { message: "Insira seu nome" })
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, {
      message: "O nome deve conter apenas letras.",
    }),
  LicenseNumberCoren: z.string().min(1, { message: "Insira seu nome" }),

  EmailAddress: z.string().min(1, { message: "Insira seu nome" }),
  Cpf: z.string().min(1, { message: "Insira seu nome" }),
  DoctorLicenseNumber: z.string().min(1, { message: "Insira seu nome" }),
  DoctorLicenseState: z.string().min(1, { message: "Insira seu nome" }),
  Mobilephone: z.string().min(1, { message: "Insira seu nome" }),
  Telefone: z.string().min(1, { message: "Insira seu nome" }),

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

export function OtherProfessionalModal() {
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
  const doctorUfCrm = watch("DoctorLicenseNumber");

  const [medicalSpecialtyOptions, setMedicalSpecialtyOptions] = useState<
    { id: string; value: string }[]
  >([]);
  const [addDoctorLoading, setAddDoctorLoading] = useState(false);

  async function registerDoctor(data: DoctorSignUpSchemaProps) {
    setAddDoctorLoading(true);
    try {
      const res = await AddOtherProfessional({
        ProfessionalName: data.ProfessionalName,
        Cpf: data.Cpf,
        LicenseNumberCoren: data.LicenseNumberCoren,
        EmailAddress: data.EmailAddress,
        DoctorLicenseNumber: data.DoctorLicenseNumber,
        DoctorLicenseState: data.DoctorLicenseState,
        Mobilephone: data.Mobilephone,
        Telefone: data.Telefone,
        ProgramCode: "985",
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
      if (err?.response?.data?.additionalMessage === "User already exists!") {
        useEmail.openModal(true);
      } else {
        modalRescue.openModal(true);
      }
    }
  }
  const handleCrmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setValue("DoctorLicenseNumber", value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
    setValue("ProfessionalName", value);
  };

  const handleLicenseNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    setValue("LicenseNumberCoren", value);
  };

  return (
    <div className="text-zinc-800">
      <h1 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 text-main-orange">
        Cadastro de Profissional de Saúde
      </h1>

      <form
        onSubmit={handleSubmit(registerDoctor)}
        className="w-full flex flex-col gap-4"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="w-full md:col-span-2">
            <Input
              type="text"
              placeholder="Nome completo"
              {...register("ProfessionalName", {
                required: "Campo obrigatório",
                onChange: handleNameChange,
              })}
            />
            {errors.ProfessionalName && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.ProfessionalName.message}
              </span>
            )}
          </div>
          <div className="w-full md:col-span-2">
            <Input
              type="text"
              placeholder="Número do Conselho"
              {...register("LicenseNumberCoren", {
                required: "Campo obrigatório",
              })}
              onChange={handleLicenseNumberChange}
              value={watch("LicenseNumberCoren")}
              maxLength={10}
            />
            {errors.LicenseNumberCoren && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.LicenseNumberCoren.message}
              </span>
            )}
          </div>
          <div className="w-full md:col-span-2">
            <Controller
              name="Cpf"
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
            {errors.Cpf && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.Cpf.message}
              </span>
            )}
          </div>

          <div className="w-full md:col-span-2">
            <Input
              type="email"
              placeholder="E-mail"
              {...register("EmailAddress", { required: "Campo obrigatório" })}
            />
            {errors.EmailAddress && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.EmailAddress.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="w-full">
            <Controller
              name="Telefone"
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
            {errors.Telefone && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.Telefone.message}
              </span>
            )}
          </div>
          <div className="w-full">
            <Controller
              name="Mobilephone"
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

            {errors.Mobilephone && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.Mobilephone.message}
              </span>
            )}
          </div>
          <div className="w-full">
            <Input
              textTooltip="Informe o número o CRM do médico previamente cadastrado para vincular o cadastro da equipe"
              tooltip={true}
              type="text"
              placeholder="CRM"
              maxLength={10}
              {...register("DoctorLicenseNumber", {
                pattern: {
                  value: /^\d{1,6}$/,
                  message: "O CRM deve conter apenas números.",
                },
              })}
              onChange={handleCrmChange}
            />
            {errors.DoctorLicenseNumber && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.DoctorLicenseNumber.message}
              </span>
            )}
          </div>
          <div className="w-full">
            <Controller
              name="DoctorLicenseState"
              control={control}
              render={({ field }) => (
                <CustomSelect label="UF do CRM" options={UFlist} {...field} />
              )}
            />
            {errors.DoctorLicenseState && (
              <span className="ml-2 w-full text-xs text-red-400 mt-1">
                {errors.DoctorLicenseState.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col lg:gap-2">
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
            <div>
              {!termsModal.isMedicDiagnosticTermsAccepted && (
                <span className="ml-2 w-full text-xs text-red-400 h-full">
                  É necessário aceitar o termo para continuar
                </span>
              )}
            </div>
          </div>

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
            <div>
              {!termsModal.isMedicTreatmentTermsAccepted && (
                <span className="ml-2 w-full text-xs text-red-400">
                  É necessário aceitar o termo para continuar
                </span>
              )}
            </div>
          </div>

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
            <div>
              {!termsModal.isPatientTermsAccepted && (
                <span className="ml-2 w-full text-xs text-red-400">
                  É necessário aceitar o termo para continuar
                </span>
              )}
            </div>
          </div>
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
          <RescueRegisterOther />
        </Dialog>
      </div>
      <div>
        <Dialog open={useEmail.isModalOpen} onOpenChange={useEmail.openModal}>
          <RescueRegisterEmailOther />
        </Dialog>
      </div>
      <div>
        <Dialog
          open={modalAccept.isModalOpen}
          onOpenChange={modalAccept.openModal}
        >
          <AcceptRegisterOther />
        </Dialog>
      </div>
    </div>
  );
}
