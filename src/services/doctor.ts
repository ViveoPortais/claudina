import {
  IDoctorData,
  IDoctorInfoByCRM,
  IInactiveDoctor,
  IOtherData,
  IUpdateDoctorData,
} from "@/types";
import { api } from "./api";

const programCode = "985";

export const getDoctorbyCRM = async (data: IDoctorInfoByCRM) => {
  const res = await api.get("/doctor/getdoctorbycfm", {
    params: {
      crm: data.crm,
      ufcrm: data.ufcrm,
    },
  });
  return res.data;
};

export const addDoctor = async (data: IDoctorData) => {
  const res = await api.post("/Doctor/adddoctor", {
    ...data,
  });
  return res.data;
};

export const getDoctorInfo = async () => {
  const res = await api.get("/doctor/getdoctorinfo", {
    params: {
      programCode: programCode,
    },
  });
  return res.data;
};

export const updateDoctor = async (data: IUpdateDoctorData) => {
  const res = await api.put("/doctor/update", {
    ...data,
    healthProgramCode: programCode,
  });
  return res.data;
};

export const disableDoctor = async (programCode: any) => {
  const res = await api.put("/doctor/disable", null, {
    params: {
      programCode: programCode,
    },
  });
  return res.data;
};

export const inactiveDoctor = async (data: IInactiveDoctor) => {
  const res = await api.put("/doctor/inactive", {
    ...data,
  });
};

export const downlaodLaudoPatient = async (id: string) => {
  const res = await api.get(`/Patient/download/report/${id}`, {
    params: {
      programCode: programCode,
    },
  });
  return res.data;
};
