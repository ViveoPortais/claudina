import { IChangePasswordData, IForgetPasswordData, ILoginData } from "@/types";
import api from "./api";

const programCode = "985";

export const login = async (data: ILoginData) => {
  const res = await api.post("/logintwosteps", {
    ...data,
    healthProgramCode: programCode,
  });
  return res.data;
};
export const forgetPassword = async (data: IForgetPasswordData) => {
  const res = await api.post("/forgetpassword", {
    ...data,
    Code: programCode,
  });
  return res.data;
};

export const changePassword = async (data: IChangePasswordData) => {
  const res = await api.post("/changepassword", {
    ...data,
    Programcode: programCode,
  });
  return res.data;
};

export const verifyTwoFactor = async (email: any, password: any) => {
  const res = await api.post("/verifytwofactor", {
    email: email,
    password: "string",
  });
  return res.data;
};
