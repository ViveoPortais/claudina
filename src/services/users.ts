import { IChangePasswordData, IForgetPasswordData, ILoginData } from "@/types";
import api from "./api";

const programCode = "985";

export const talkwithus = async (data: any) => {
  const response = await api.post("/user/talkwithus", data);

  return response.data;
};
