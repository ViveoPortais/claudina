import { IForgetPasswordData, ILoginData } from "@/types";
import api from "./api";

const programCode = "985";

export const login = async (data: ILoginData) => {
  const res = await api.post("/login", {
    ...data,
    healthProgramCode: programCode,
  });
  return res.data;
};

export const forgetPassword = async (data: IForgetPasswordData) => {
  const res = await api.post("/forgotpassword/doctor", {
    ...data,
    ProgramCode: programCode,
  });
  return res.data;
};
