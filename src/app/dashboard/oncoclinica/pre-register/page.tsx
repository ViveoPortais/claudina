"use client";

import { CustomSelect } from "@/components/custom/CustomSelect";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import validarCPF from "@/helpers/ValidateCPF";
import { sendSms } from "@/services/diagnostic";
import { addTreatment, addTreatmentProfissional } from "@/services/treatment";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  TbCheck,
  TbCircleNumber1,
  TbCircleNumber2,
  TbCircleNumber3,
  TbCircleNumber4,
} from "react-icons/tb";
import ReactInputMask from "react-input-mask";
import { toast } from "react-toastify";
import {
  MdInfo,
  MdOutlineKeyboardDoubleArrowDown,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { Dialog } from "@/components/ui/dialog";
import { SucessExam } from "@/components/SucessExam";
import { useSucessExam } from "@/hooks/useModal";
import { Loading } from "@/components/custom/Loading";
import { getDoctorVinculed } from "@/services/representative";
import { jsPDF } from "jspdf";
import Image from "next/image";
import { FiPrinter } from "react-icons/fi";
import { getOncoclinica } from "@/services/account";

export default function PreRegister() {
  const [disableSave, setDisableSave] = useState(true);
  const [step, setStep] = useState(1);
  const [localType, setLocalType] = useState("");
  const router = useRouter();
  const [checkersTrue, setCheckersTrue] = useState(false);
  const [checkersFalse, setCheckersFalse] = useState(false);
  const [mobilephone, setMobilephone] = useState("");
  const [cpfPhone, setCpfPhone] = useState("");
  const useSucess = useSucessExam();
  const [isLoading, setIsLoading] = useState(false);
  const [doctorId, setDoctorId] = useState([]);
  const [formData, setFormData] = useState({
    clinicName: "",
    addressPostalCode: "",
    addressName: "",
    addressNumber: "",
    addressCity: "",
    addressState: "",
    addressComplement: "",
    addressCountry: "",
    addressDistrict: "",
  });

  const [preRegisterData, setPreRegisterData] = useState<any>({
    AccountSettingsByProgram: {
      Cnpj: "",
      AddressCity: "",
      CustomString1: "",
      AddressComplement: "",
      AddressCountry: "BRASIL",
      AddressDistrict: "",
      AddressName: "",
      AddressNumber: "",
      AddressPostalCode: "",
      AddressState: "",
    },
    LogisticsSchedule: {
      PreferredTimeStringMap: {
        OptionName: "",
      },
      ResponsibleForReceiving: "",
      ResponsibleTelephoneWithdrawal: "",
      DateForCollecting: "",
    },
    MedicalRequestAttach: {
      Flag: "#A_LAUDOANATOMO",
      FileName: "",
      DocumentBody: "",
    },
    ProgramCode: "985",
    Name: "",
    LaboratoryName: "",
    ExamDefinitionName: "",
    Birthdate: "",
    CPF: "",
    DiseaseName: "",
    Mobilephone: "",
    DoctorId: "",
    Contact: "",
    Sector: "",
    SampleInLaboratory: false,
  });

  useEffect(() => {
    getDoctorId();
    getCepOncoclinica();
  }, []);

  const getDoctorId = () => {
    getDoctorVinculed()
      .then((res) => {
        if (res.data) {
          const validDoctors = res.data.filter(
            (doctor: any) => doctor?.id && doctor?.name
          );

          setDoctorId(
            validDoctors.map((doctor: any) => ({
              id: doctor.id,
              value: doctor.name,
            }))
          );
        }
      })
      .catch(() => {});
  };

  const getCepOncoclinica = () => {
    getOncoclinica()
      .then((res) => {
        if (res.data) {
          const clinicData = res;

          setPreRegisterData((prevData: any) => ({
            ...prevData,
            AccountSettingsByProgram: {
              ...prevData.AccountSettingsByProgram,
              AddressPostalCode: clinicData.addressPostalCode,
              AddressName: clinicData.addressName,
              AddressNumber: clinicData.addressNumber,
              AddressCity: clinicData.addressCity,
              AddressState: clinicData.addressState,
              AddressComplement: clinicData.addressComplement,
              AddressCountry: clinicData.addressCountry,
              AddressDistrict: clinicData.addressDistrict,
            },
          }));

          setFormData((prevData) => ({
            ...prevData,
            clinicName: clinicData.clinicName,
          }));
        }
      })
      .catch(() => {
        console.error("Erro ao carregar dados da clínica");
      });
  };

  const sendSmsPhone = () => {
    sendSms(mobilephone, cpfPhone)
      .then((res) => {
        if (res.isValidData) {
          toast.success("SMS enviado com sucesso");
          setMobilephone("");
        } else {
          toast.error("Erro ao enviar SMS");
        }
      })
      .catch(() => {
        toast.error("Erro ao enviar SMS");
      });
  };

  const resgisterPatient = () => {
    const { doneHER2, resultHER2, ...filteredData } = preRegisterData;

    const dataToSend = {
      ...filteredData,
      AccountSettingsByProgram: {
        ...filteredData.AccountSettingsByProgram,
        AddressPostalCode:
          preRegisterData.AccountSettingsByProgram.AddressPostalCode,
        AddressName: preRegisterData.AccountSettingsByProgram.AddressName,
        AddressNumber: preRegisterData.AccountSettingsByProgram.AddressNumber,
        AddressCity: preRegisterData.AccountSettingsByProgram.AddressCity,
        AddressState: preRegisterData.AccountSettingsByProgram.AddressState,
        AddressComplement:
          preRegisterData.AccountSettingsByProgram.AddressComplement,
        AddressDistrict:
          preRegisterData.AccountSettingsByProgram.AddressDistrict,
      },
      Birthdate: preRegisterData.Birthdate,
      LogisticsSchedule: {
        ...preRegisterData.LogisticsSchedule,
        DateForCollecting: preRegisterData.LogisticsSchedule.DateForCollecting,
      },
    };
    setIsLoading(true);
    addTreatmentProfissional(dataToSend)
      .then((res) => {
        if (res.isValidData) {
          useSucess.openModal(true);
          clearFields();
          setTimeout(() => {
            step === 4 ? setStep(1) : setStep(step + 1);
            useSucess.openModal(false);
          }, 5000);
        }
        if (!res.isValidData) {
          toast.error(res.value);
        }
      })
      .catch(() => {
        toast.error("Erro ao cadastrar");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const clearFields = () => {
    setPreRegisterData({
      AccountSettingsByProgram: {
        Cnpj: "",
        AddressCity: "",
        CustomString1: "",
        AddressComplement: "",
        AddressCountry: "BRASIL",
        AddressDistrict: "",
        AddressName: "",
        AddressNumber: "",
        AddressPostalCode: "",
        AddressState: "",
      },
      LogisticsSchedule: {
        PreferredTimeStringMap: {
          OptionName: "",
        },
        ResponsibleForReceiving: "",
        ResponsibleTelephoneWithdrawal: "",
        DateForCollecting: "",
      },
      MedicalRequestAttach: {
        Flag: "#A_LAUDOANATOMO",
        FileName: "",
        DocumentBody: "",
      },
      ProgramCode: "985",
      Name: "",
      LaboratoryName: "",
      ExamDefinitionName: "",
      Birthdate: "",
      CPF: "",
      DiseaseName: "",
      Mobilephone: "",
      DoctorId: "",
      Contact: "",
      Sector: "",
      SampleInLaboratory: false,
    });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const updatedData = { ...preRegisterData };

    if (name === "CPF") {
      setCpfPhone(value);
      updatedData.CPF = value;
    }

    if (name === "doneHER2") {
      updatedData[name] = value;
      if (value === "Não") {
        updatedData.resultHER2 = "";
        updatedData.ExamDefinitionName = "Claudina 18.2 + HER2";
      } else {
        updatedData.ExamDefinitionName = "";
      }
    } else if (name === "resultHER2" && preRegisterData.doneHER2 === "Sim") {
      updatedData[name] = value;
      if (value === "HER2 negativo") {
        updatedData.ExamDefinitionName = "Claudina 18.2";
      } else {
        updatedData.ExamDefinitionName = "";
      }
    } else if (name === "localType") {
      setLocalType(value);
      if (value === "Hospital/Clínica") {
        updatedData.AccountSettingsByProgram.Cnpj = "";
      } else {
        updatedData.AccountSettingsByProgram.CustomString1 = "";
      }
    } else if (name === "Name" || name === "ResponsibleForReceiving") {
      const lettersOnly = /^[A-Za-zÀ-ÿ\s]+$/;
      if (lettersOnly.test(value) || value === "") {
        if (name === "Name") {
          updatedData[name] = value;
        } else {
          updatedData.LogisticsSchedule.ResponsibleForReceiving = value;
        }
      }
    } else if (name === "Mobilephone") {
      updatedData[name] = value;
      setMobilephone(value);
    } else {
      updatedData[name] = value;
    }

    setPreRegisterData(updatedData);
  };

  const handleCheckersTrue = (checked: any) => {
    setCheckersTrue(checked);
    if (checked) {
      setCheckersFalse(false);
    }
  };

  const handleCheckersFalse = (checked: any) => {
    setCheckersFalse(checked);
    if (checked) {
      setCheckersTrue(false);
      printPDF();
    }
  };

  const printPDF = () => {
    const doc = new jsPDF();
    doc.addImage(
      "/Programa Claudinova- Termo de Consentimento - Pacientes_page-0001.jpg",
      "JPEG",
      0,
      0,
      210,
      297
    );
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const pdfWindow = window.open(pdfUrl);

    if (pdfWindow) {
      pdfWindow.onload = () => {
        pdfWindow.print();
      };
    }
  };
  const fileBase64 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreRegisterData({
          ...preRegisterData,
          MedicalRequestAttach: {
            FileName: file.name,
            DocumentBody: reader.result as string,
            Flag: "#A_LAUDOANATOMO",
          },
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRouter = () => {
    router.push("/dashboard/oncoclinica/exam");
  };

  const checkCPF = (cpf: any) => {
    const isCpfValid = validarCPF(cpf);
    if (!isCpfValid) {
      toast.error("CPF inválido");
      setDisableSave(true);
    } else {
      setDisableSave(false);
    }
  };

  const checkPhone = () => {
    const invalidPhones = [
      "(00) 00000-0000",
      "(11) 11111-1111",
      "(22) 22222-2222",
      "(33) 33333-3333",
      "(44) 44444-4444",
      "(55) 55555-5555",
      "(66) 66666-6666",
      "(77) 77777-7777",
      "(88) 88888-8888",
      "(99) 99999-9999",
    ];

    if (
      invalidPhones.includes(
        preRegisterData.LogisticsSchedule.ResponsibleTelephoneWithdrawal
      )
    ) {
      toast.error("Telefone inválido");
      return setDisableSave(true);
    }
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const stepClass = (currentStep: any) =>
    step > currentStep
      ? "bg-main-blue text-white border-main-blue"
      : step === currentStep
      ? "bg-main-blue text-white border-main-blue"
      : "border-main-orange text-main-blue";

  const iconColor = (currentStep: any) =>
    step > currentStep
      ? "text-white"
      : step === currentStep
      ? "text-orange-500"
      : "";

  const renderIcon = (currentStep: any) => {
    if (step > currentStep) {
      return <TbCheck size={20} className="text-white" />;
    } else {
      switch (currentStep) {
        case 1:
          return <TbCircleNumber1 size={20} />;
        case 2:
          return <TbCircleNumber2 size={20} />;
        case 3:
          return <TbCircleNumber3 size={20} />;
        case 4:
          return <TbCircleNumber4 size={20} />;
        default:
          return null;
      }
    }
  };

  const arrowClass = (currentStep: any) => {
    if (step >= currentStep) {
      return "text-main-blue";
    } else {
      return "text-main-orange";
    }
  };

  const isHER2Positive =
    preRegisterData.doneHER2 === "Sim" &&
    preRegisterData.resultHER2 === "HER2 positivo";

  const isStep1Valid = () => {
    return (
      preRegisterData.ExamDefinitionName === "Claudina 18.2 + HER2" ||
      preRegisterData.ExamDefinitionName === "Claudina 18.2"
    );
  };

  const isStep2Valid = () => {
    const birthdate = new Date(preRegisterData.Birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();

    const hasBirthdayOccurredThisYear =
      today.getMonth() > birthdate.getMonth() ||
      (today.getMonth() === birthdate.getMonth() &&
        today.getDate() >= birthdate.getDate());

    const isMinor = age < 18 || (age === 18 && !hasBirthdayOccurredThisYear);

    const isCpfValid = validarCPF(preRegisterData.CPF);

    return (
      isCpfValid &&
      preRegisterData.Name &&
      preRegisterData.Birthdate &&
      preRegisterData.DiseaseName &&
      !isMinor
    );
  };

  const isStep3Valid = () => {
    const isCnpjValid =
      localType === "Hospital/Clínica" &&
      preRegisterData.AccountSettingsByProgram.Cnpj;

    const isCpfValid =
      localType === "Pessoa Física" &&
      validarCPF(preRegisterData.AccountSettingsByProgram.CustomString1);

    return (
      (isCnpjValid || isCpfValid) &&
      preRegisterData.LogisticsSchedule.ResponsibleForReceiving &&
      preRegisterData.LogisticsSchedule.ResponsibleTelephoneWithdrawal &&
      preRegisterData.AccountSettingsByProgram.AddressPostalCode &&
      preRegisterData.AccountSettingsByProgram.AddressName &&
      preRegisterData.AccountSettingsByProgram.AddressDistrict &&
      preRegisterData.AccountSettingsByProgram.AddressCity &&
      preRegisterData.AccountSettingsByProgram.AddressState &&
      preRegisterData.AccountSettingsByProgram.AddressNumber
    );
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="w-full h-full flex flex-col mt-8 lg:mt-0">
      <div className="px-5">
        <div className=" mb-10 text-xl border border-main-purple rounded-md p-3 bg-main-orange">
          <h1 className="text-lg text-white ">
            Preencha os dados abaixo para solicitar o exame!
          </h1>
        </div>
      </div>

      <div className="w-full md:px-10 p-5">
        <div className="md:flex md:flex-row flex flex-col items-center md:items-baseline md:justify-center gap-2">
          {[1, 2, 3, 4].map((currentStep) => (
            <React.Fragment key={currentStep}>
              <div className="flex flex-col items-center justify-center p-4">
                <div
                  className={`flex items-center justify-center rounded-full border-2 p-4 ${stepClass(
                    currentStep
                  )} ${iconColor(currentStep)}`}
                >
                  {renderIcon(currentStep)}
                </div>
                <span className="mt-2 text-base text-main-blue">
                  {currentStep === 1 && "Solicitar Exame"}
                  {currentStep === 2 && "Histórico de Paciente"}
                  {currentStep === 3 && "Dados da Amostra"}
                  {currentStep === 4 && "Documentos"}
                </span>
              </div>
              {currentStep < 4 && (
                <>
                  <div className="hidden md:block md:mt-8">
                    <MdOutlineKeyboardDoubleArrowRight
                      size={25}
                      className={arrowClass(currentStep)}
                    />
                  </div>
                  <div className="block md:hidden md:mt-8">
                    <MdOutlineKeyboardDoubleArrowDown
                      size={25}
                      className={arrowClass(currentStep)}
                    />
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="mt-14">
          {step === 1 && (
            <>
              <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-5">
                <CustomSelect
                  name="doneHER2"
                  label="Paciente já realizou HER2?"
                  onChange={handleChange}
                  options={[
                    { value: "Sim", id: "Sim" },
                    { value: "Não", id: "Não" },
                  ]}
                  value={preRegisterData.doneHER2}
                />
                <CustomSelect
                  name="resultHER2"
                  label="Incluir resultado do HER2"
                  onChange={handleChange}
                  options={[
                    { value: "HER2 positivo", id: "HER2 positivo" },
                    { value: "HER2 negativo", id: "HER2 negativo" },
                  ]}
                  value={preRegisterData.resultHER2}
                  disabled={
                    preRegisterData.doneHER2 === "Não" ||
                    !preRegisterData.doneHER2
                  }
                />
              </div>
              {isHER2Positive ? (
                <div className="w-full mt-16 md:mt-32">
                  <p className="text-main-orange font-semibold md:text-xl text-sm text-center">
                    &quot;O paciente não é elegível ao programa, em caso de
                    dúvidas entre em
                  </p>
                  <p className="text-main-orange font-semibold md:text-xl text-sm text-center">
                    Contato nos canais de atendimento do programa
                  </p>
                  <p className="text-main-orange font-semibold md:text-xl text-sm text-center">
                    0800 999 5124 ou e-mail
                    contato@programaclaudinova.com.br&quot;
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid md:grid-cols-4 mt-10">
                  <Input
                    name="ExamDefinitionName"
                    placeholder="Exame"
                    onChange={handleChange}
                    disabled
                    value={preRegisterData.ExamDefinitionName}
                  />
                </div>
              )}
            </>
          )}
          {step === 2 && (
            <>
              <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-5">
                <ReactInputMask
                  mask="999.999.999-99"
                  value={preRegisterData.CPF}
                  onChange={handleChange}
                  onBlur={() => checkCPF(preRegisterData.CPF)}
                >
                  <Input placeholder="CPF" name="CPF" />
                </ReactInputMask>
                <Input
                  name="Name"
                  placeholder="Nome Completo"
                  value={preRegisterData.Name}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="date"
                  placeholder="Data de Nascimento"
                  name="Birthdate"
                  textTooltip="Paciente deve ter mais de 18 anos para ser elegivel, em caso de dúvidas entre em contato nos canais de atendimento do programa 0800 999 5124 ou e-mail contato@programaclaudinova.com.br"
                  tooltip={true}
                  value={preRegisterData.Birthdate}
                  onChange={handleChange}
                  required
                />
                <ReactInputMask
                  mask="(99) 99999-9999"
                  value={preRegisterData.Mobilephone}
                  onChange={handleChange}
                >
                  <Input
                    placeholder="Celular do Paciente"
                    name="Mobilephone"
                    required
                  />
                </ReactInputMask>
                <CustomSelect
                  required
                  name="DiseaseName"
                  label="Diagnóstico"
                  value={preRegisterData.DiseaseName}
                  onChange={handleChange}
                  options={[
                    {
                      value: "Câncer Gástrico Metastático",
                      id: "Câncer Gástrico Metastático",
                    },
                    {
                      value: "Câncer de Junção Gastroesofágica Metastático",
                      id: "Câncer de Junção Gastroesofágica Metastático",
                    },
                    {
                      value: "Câncer Gástrico Localmente Avançado Inoperável",
                      id: "Câncer Gástrico Localmente Avançado Inoperável",
                    },
                    {
                      value:
                        "Câncer de Junção Gastroesofágica Localmente Avançado Inoperável",
                      id: "Câncer de Junção Gastroesofágica Localmente Avançado Inoperável",
                    },
                  ]}
                />
                <Input
                  type="file"
                  name="DocumentBody"
                  placeholder="Upload do laudo anatomopatológico da amostra"
                  onChange={fileBase64}
                />
              </div>

              <div className="w-full mt-16 md:mt-32">
                <p className="text-main-orange font-semibold md:text-xl text-sm text-center">
                  &quot;A análise não poderá ser realizada caso o laboratório
                  não
                </p>
                <p className="text-main-orange font-semibold md:text-xl text-sm text-center">
                  receba o laudo anatomopatológico. Caso o upload não seja
                </p>
                <p className="text-main-orange font-semibold md:text-xl text-sm text-center">
                  efetuado, a cópia do laudo anatomopatológico deverá ser
                </p>
                <p className="text-main-orange font-semibold md:text-xl text-sm text-center">
                  enviada juntamente com a amostra&quot;
                </p>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold mb-2 uppercase text-main-blue">
                      Retirada da amostra pela logística do programa
                    </span>
                    <div className="hidden md:block">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger disabled>
                            <MdInfo className="text-main-blue" size={20} />
                          </TooltipTrigger>
                          <TooltipContent>
                            O médico deverá indicar o endereço para a retirada
                            da amostra do paciente e a logística do Programa
                            providenciará a entrega no laboratório parceiro para
                            análise
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <div>
                    <span className="p-[18px] border rounded-lg text-white bg-main-blue  border-main-blue text-sm font-bold ">
                      Retirada da amostra pela logística do programa
                    </span>
                  </div>
                </div>
                <Input
                  placeholder="Clínica Grupo Oncoclínica"
                  name="clinicName"
                  value={"Grupo Oncoclínicas"}
                  disabled
                />

                <ReactInputMask
                  required
                  mask="99999-999"
                  value={
                    preRegisterData.AccountSettingsByProgram.AddressPostalCode
                  }
                  onChange={(e) =>
                    setPreRegisterData({
                      ...preRegisterData,
                      AccountSettingsByProgram: {
                        ...preRegisterData.AccountSettingsByProgram,
                        AddressPostalCode: e.target.value,
                      },
                    })
                  }
                  disabled
                >
                  <Input required placeholder="CEP" name="AddressPostalCode" />
                </ReactInputMask>
                <Input
                  required
                  name="AddressName"
                  placeholder="Logradouro"
                  value={preRegisterData.AccountSettingsByProgram.AddressName}
                  onChange={handleChange}
                  disabled
                />
                <Input
                  required
                  name="AddressNumber"
                  placeholder="Número"
                  value={preRegisterData.AccountSettingsByProgram.AddressNumber}
                  onChange={(e) =>
                    setPreRegisterData({
                      ...preRegisterData,
                      AccountSettingsByProgram: {
                        ...preRegisterData.AccountSettingsByProgram,
                        AddressNumber: e.target.value,
                      },
                    })
                  }
                  disabled
                />
                <Input
                  name="AddressComplement"
                  placeholder="Complemento"
                  value={
                    preRegisterData.AccountSettingsByProgram.AddressComplement
                  }
                  onChange={(e) =>
                    setPreRegisterData({
                      ...preRegisterData,
                      AccountSettingsByProgram: {
                        ...preRegisterData.AccountSettingsByProgram,
                        AddressComplement: e.target.value,
                      },
                    })
                  }
                />
                <Input
                  required
                  name="AddressDistrict"
                  placeholder="Bairro"
                  value={
                    preRegisterData.AccountSettingsByProgram.AddressDistrict
                  }
                  onChange={handleChange}
                  disabled
                />
                <Input
                  required
                  name="AddressCity"
                  placeholder="Cidade"
                  value={preRegisterData.AccountSettingsByProgram.AddressCity}
                  onChange={handleChange}
                  disabled
                />
                <Input
                  required
                  name="AddressState"
                  placeholder="UF"
                  value={preRegisterData.AccountSettingsByProgram.AddressState}
                  onChange={handleChange}
                  disabled
                />

                <CustomSelect
                  name="OptionName"
                  label="Horário de preferência para retirada"
                  onChange={(e) =>
                    setPreRegisterData({
                      ...preRegisterData,
                      LogisticsSchedule: {
                        ...preRegisterData.LogisticsSchedule,
                        PreferredTimeStringMap: {
                          OptionName: e.target.value,
                        },
                      },
                    })
                  }
                  options={[
                    { value: "Manhã", id: "Manhã" },
                    { value: "Tarde", id: "Tarde" },
                    { value: "Integral", id: "Integral" },
                  ]}
                  value={
                    preRegisterData.LogisticsSchedule.PreferredTimeStringMap
                      .OptionName
                  }
                  required
                />

                <CustomSelect
                  name="LaboratoryName"
                  label="Laboratório de análise"
                  onChange={handleChange}
                  options={[
                    {
                      value: "Oncoclinica - 4 dias úteis",
                      id: "FLEURY (MATRIZ) (H27848)",
                    },
                  ]}
                  value={preRegisterData.LaboratoryName}
                  required
                />
                <Input
                  name="Sector"
                  placeholder="Setor"
                  onChange={handleChange}
                  value={preRegisterData.Sector}
                  required
                />

                <Input
                  name="ResponsibleForReceiving"
                  placeholder="Responsável"
                  value={
                    preRegisterData.LogisticsSchedule.ResponsibleForReceiving
                  }
                  onChange={handleChange}
                  required
                />

                <ReactInputMask
                  required
                  mask="(99) 99999-9999"
                  value={preRegisterData.Contact}
                  onChange={(e) =>
                    setPreRegisterData({
                      ...preRegisterData,
                      Contact: e.target.value,
                    })
                  }
                  onBlur={checkPhone}
                >
                  <Input name="Contact" placeholder="Contato" />
                </ReactInputMask>

                <CustomSelect
                  name="DoctorId"
                  label="Médico Solicitante"
                  onChange={handleChange}
                  options={doctorId}
                  value={preRegisterData.DoctorId}
                  disabled={isHER2Positive || !preRegisterData.doneHER2}
                  required
                />

                <Input
                  type="date"
                  value={preRegisterData.LogisticsSchedule.DateForCollecting}
                  name="dateForCollecting"
                  placeholder="Data Prevista Para Retirada"
                  onChange={(e) =>
                    setPreRegisterData({
                      ...preRegisterData,
                      LogisticsSchedule: {
                        ...preRegisterData.LogisticsSchedule,
                        DateForCollecting: e.target.value,
                      },
                    })
                  }
                  min={getCurrentDate()}
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  required
                />

                <div className="flex gap-1 text-sm font-semibold uppercase tracking-wide text-main-blue mt-5">
                  <Checkbox
                    name="SampleInLaboratory"
                    onCheckedChange={() =>
                      setPreRegisterData({
                        ...preRegisterData,
                        SampleInLaboratory: !preRegisterData.SampleInLaboratory,
                      })
                    }
                  />
                  <span>amostra já está no laboratório?</span>
                </div>
              </div>

              <div>
                <Dialog
                  open={useSucess.isModalOpen}
                  onOpenChange={useSucess.openModal}
                >
                  <SucessExam />
                </Dialog>
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <div className="mb-5">
                <span className="text-base font-bold  text-main-blue">
                  Documentos
                </span>
              </div>
              <div
                className="w-full flex justify-center mb-10 overflow-auto border border-gray-300 rounded-lg"
                style={{ maxHeight: "45vh" }}
              >
                <div className="md:min-w-[600px] w-[350px]">
                  <Image
                    src="/Programa Claudinova- Termo de Consentimento - Pacientes_page-0001.jpg"
                    alt="Termo de Consentimento"
                    width={900}
                    height={100}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col items-center">
                <div className="flex flex-col md:flex md:flex-row items-start md:items-center md:mb-2 mb-5 gap-2">
                  <div>
                    <span>Deseja enviar o termo ao Paciente via SMS ?</span>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      name="yes"
                      onCheckedChange={handleCheckersTrue}
                      checked={checkersTrue}
                    />
                    <span className="ml-2">Sim</span>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      name="no"
                      onCheckedChange={handleCheckersFalse}
                      checked={checkersFalse}
                    />
                    <span className="ml-2">Não</span>
                  </div>
                  <div>
                    <FiPrinter
                      size={23}
                      className="hover:text-main-orange cursor-pointer"
                      onClick={printPDF}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid md:grid-cols-2 items-center gap-2 mt-5">
                  <div>
                    <ReactInputMask
                      mask="(99) 99999-9999"
                      value={mobilephone}
                      onChange={(e) => setMobilephone(e.target.value)}
                      onBlur={checkPhone}
                      disabled
                    >
                      <Input
                        name="mobilephone"
                        placeholder="Informe o celular do paciente"
                      />
                    </ReactInputMask>
                  </div>
                  <div className="mt-5">
                    <Button
                      size={`lg`}
                      variant={`tertiary`}
                      className="md:w-60 h-14 w-full md:mb-0 mb-5"
                      onClick={sendSmsPhone}
                      disabled={!checkersTrue}
                    >
                      Enviar SMS
                    </Button>
                  </div>
                </div>
              </div>
              <div className="w-full mt-16">
                <p className="text-main-orange font-semibold md:text-xl text-sm text-center">
                  &quot;O aceite do termo pelo paciente é obrigatório para a
                  realização do exame. Ele pode ser feito via SMS ou impresso e
                  devidamente assinado pelo paciente.&quot;
                </p>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col md:flex md:flex-row md:items-center md:justify-end gap-2 mt-10 md:mt-24 mb-10">
          {step > 1 && step <= 3 && (
            <Button
              size={`lg`}
              variant={`tertiary`}
              onClick={handlePreviousStep}
              className="md:w-60 w-full"
            >
              Anterior
            </Button>
          )}
          {step < 3 && !isHER2Positive ? (
            <Button
              size={`lg`}
              variant={`tertiary`}
              onClick={handleNextStep}
              className="md:w-60 w-full md:mb-0 mb-5"
              disabled={step === 1 ? !isStep1Valid() : !isStep2Valid()}
            >
              Próximo
            </Button>
          ) : step === 3 ? (
            <Button
              size={`lg`}
              variant={`tertiary`}
              className="md:w-60 w-full md:mb-0 mb-5"
              onClick={resgisterPatient}
              // disabled={step === 3 ? !isStep3Valid() : false || isLoading}
            >
              {isLoading ? <Loading /> : "Solicitar Exame"}
            </Button>
          ) : (
            <Button
              size={`lg`}
              variant={`tertiary`}
              className="md:w-60 w-full md:mb-0 mb-5"
              onClick={handleRouter}
            >
              Finalizar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
