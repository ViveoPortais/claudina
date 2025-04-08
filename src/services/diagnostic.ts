import { ISendLaudo } from "@/types";
import { api } from "./api";

const programCode = "985";

export const sendSms = async (mobilePhone: any, cpf: any) => {
  const response = await api.post(
    `/Diagnostic/sendsmsdiagnosticpatient`,
    null,
    {
      params: {
        mobilephone: mobilePhone,
        programcode: "985",
        templatename: "#SOLICITAÇÃOEXAMECLAUDINOVA",
        cpf: cpf,
      },
    }
  );
  return response.data;
};

export const getExam = async () => {
  const response = await api.get("/Diagnostic/getdiagnostics", {
    params: {
      programcode: "985",
      pageSize: 10000,
      page: 1,
    },
  });
  return response.data;
};

export const sendLaudoPatient = async (data: ISendLaudo) => {
  const response = await api.post("/Diagnostic/addattachmentdoctor", data);
  return response.data;
};

export const getSolicitation = async () => {
  const response = await api.get("/Diagnostic/getdiagnostics", {
    params: {
      programcode: "985",
      pageSize: 10000,
      page: 1,
    },
  });
  return response.data;
};

export const getDiagnosticsLaboratory = async () => {
  const response = await api.get("/Diagnostic/getdiagnosticslaboratory", {
    params: {
      programcode: "985",
      pageSize: 10000,
      page: 1,
    },
  });
  return response.data;
};

export const downloadingLaudo = async (data: any) => {
  const response = await api.get("/Diagnostic/getdocattchmentbycpf", {
    params: {
      programcode: data.programcode,
      cpf: data.cpf,
      flagStringMap: data.flagStringMap,
    },
  });
  return response.data;
};

export const downloadingLaudoCPf = async (data: any) => {
  const response = await api.get("/Diagnostic/getdocsattchmentbycpf", {
    params: {
      programcode: data.programcode,
      cpf: data.cpf,
      flagStringMap: data.flagStringMap,
    },
  });
  return response.data;
};

export const pendentDiagnostic = async (data: any) => {
  const res = await api.post("/Diagnostic/pendentdiagnostic", data);
  return res.data;
};

export const getReverseLogisticsByExamId = async (examId: any) => {
  const response = await api.get(
    "/logisticsSchedule/getreverselogisticsbyexamid",
    {
      params: {
        programcode: "985",
        examId: examId,
      },
    }
  );
  return response.data;
};

export const setReturnProgressByExamId = async (data: any) => {
  const response = await api.post(
    "/logisticsSchedule/setreturnprogressbyexamid",
    ...data
  );
  return response.data;
};

export const setReturnCompletedByExamId = async (data: any) => {
  const response = await api.post(
    "/logisticsSchedule/setreturncompletedbyexamId",
    ...data
  );
  return response.data;
};
