import { TreatmentData, TreatmentDataProfissional } from "@/types";
import { api } from "./api";

const programCode = "985";

export const addTreatment = async (data: TreatmentData) => {
  const response = await api.post("/Diagnostic/add", {
    ...data,
  });
  return response.data;
};

export const addTreatmentProfissional = async (
  data: TreatmentDataProfissional
) => {
  const response = await api.post("/Diagnostic/add", {
    ...data,
  });
  return response.data;
};
