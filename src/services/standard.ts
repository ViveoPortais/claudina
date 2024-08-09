import { IDoctorData, IDoctorInfoByCRM, IUpdateDoctorData } from "@/types";
import { api } from "./api";

const programCode = "985";

export const validate = async () => {
  const res = await api.post("/Standard/ValidatebyUser", null, {});
  return res.data;
};
