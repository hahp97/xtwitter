import type { LoginModel } from "@/types/auth";
import type { TDataResponseUser } from "@/types/common";
import { getAxiosInstance, getResponseData } from "@/utils/axios";
import { AUTHENTICATION } from "@/utils/constants/endpoint";

export const loginMutation = async (
  data: LoginModel,
): Promise<TDataResponseUser> => {
  const response = await getAxiosInstance().post(AUTHENTICATION.LOGIN, data);
  return getResponseData(response);
};

export const getProfile = async (
  payload: string,
): Promise<{ username: string; email: string }> => {
  const response = await getAxiosInstance().get(AUTHENTICATION.ME, {
    headers: { "x-token": payload },
  }); // Done after setup axios
  return getResponseData(response);
};
