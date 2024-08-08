import {
  IActivateHeathProfessional,
  IOtherData,
  IRescueHeathProfessional,
} from "@/types";
import { api } from "./api";

const programCode = "985";

export const getHealthProfessionalsActivated = async () => {
  const response = await api.get("/Representative/getprofessionalsactivated", {
    params: {
      ProgramCode: "985",
    },
  });
  return response.data;
};

export const AddOtherProfessional = async (data: IOtherData) => {
  const response = await api.post("/Representative/addprofessional", data);

  return response.data;
};

export const getHealthProfessionals = async () => {
  const response = await api.get("/Representative/getprofessionals", {
    params: {
      ProgramCode: "985",
    },
  });
  return response.data;
};

export const activateHeathProfessional = async (
  data: IActivateHeathProfessional
) => {
  const response = await api.post("/Representative/activateprofessional", data);
  return response.data;
};

export const rescueHeathProfessional = async (
  data: IRescueHeathProfessional
) => {
  const response = await api.post(
    "/Representative/inactivateprofessional",
    data
  );
  return response.data;
};

export const inactivateHealthProfessional = async (
  data: IActivateHeathProfessional
) => {
  const response = await api.post(
    "/Representative/inactivateprofessional",
    data
  );
  return response.data;
};

export const getDoctorVinculed = async () => {
  const response = await api.get("/Representative/getdoctorvinculed", {
    params: {
      HealthProgramCode: "985",
    },
  });
  return response.data;
};
