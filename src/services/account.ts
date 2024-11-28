import api from "./api";

export const getClinics = async (filters?: any) => {
  const response = await api.post(
    "/AccountSettingsByProgram/getaccountsbyprogram",
    null,
    {
      params: {
        programcode: "150",
        ...filters,
      },
    }
  );
  return response.data.data;
};

export const getOncoclinica = async () => {
  const response = await api.get(
    "/AccountSettingsByProgram/getaccountsbyprogrambyuser",
    {
      params: {
        programcode: "985",
      },
    }
  );
  return response.data;
};
