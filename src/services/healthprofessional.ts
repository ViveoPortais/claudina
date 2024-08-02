import { IActivateHeathProfessional, IRescueHeathProfessional } from "@/types";
import { api } from "./api";

const programCode = "985";

export const getHealthProfessionals = async () => {
  const response = await api.get("/HealthProfessional/gethealthprofessionals", {
    params: {
      HealthProgramCode: "985",
    },
  });
  return response.data;
};

export const rescueHeathProfessional = async (
  data: IRescueHeathProfessional
) => {
  const response = await api.post(
    "/HealthProfessional/inactivatehealthprofessional",
    data
  );
  return response.data;
};

export const activateHeathProfessional = async (
  data: IActivateHeathProfessional
) => {
  const response = await api.post(
    "/HealthProfessional/activatehealthprofessional",
    data
  );
  return response.data;
};

export const getHealthProfessionalsActivated = async () => {
  const response = await api.get(
    "/HealthProfessional/gethealthprofessionalsactivated",
    {
      params: {
        HealthProgramCode: "985",
      },
    }
  );
  return response.data;
};

export const inactivateHealthProfessional = async (
  data: IActivateHeathProfessional
) => {
  const response = await api.post(
    "/HealthProfessional/inactivatehealthprofessional",
    data
  );
  return response.data;
};
