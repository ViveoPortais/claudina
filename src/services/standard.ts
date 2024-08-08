import { IDoctorData, IDoctorInfoByCRM, IUpdateDoctorData } from "@/types";
import { api } from "./api";

const programCode = "985";

export const validate = async (password: string) => {
  const res = await api.post("/standard/validate", null, {
    params: {
      password: password,
    },
  });
  return res.data;
};
