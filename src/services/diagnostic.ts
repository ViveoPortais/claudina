import { ISendLaudo } from "@/types";
import { api } from "./api";

const programCode = "985";

export const sendSms = async (mobilePhone: any) => {
  const response = await api.post(
    `/Diagnostic/sendsmsdiagnosticpatient`,
    null,
    {
      params: {
        mobilephone: mobilePhone,
        programcode: "985",
        templatename: "#TesteClaudinova",
      },
    }
  );
  return response.data;
};

export const getExam = async () => {
  const response = await api.get("/Diagnostic/getdiagnostics", {
    params: {
      programcode: "985",
    },
  });
  return response.data;
};

export const sendLaudoPatient = async (data: ISendLaudo) => {
  const response = await api.post("/Diagnostic/addattachment", data);
  return response.data;
};
