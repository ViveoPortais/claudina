import { TreatmentData } from "@/types";
import { api } from "./api";

const programCode = "985";

export const addTreatment = async (data: TreatmentData) => {
  const response = await api.post("/Diagnostic/add", {
    ...data,
  });
  return response.data;
};
