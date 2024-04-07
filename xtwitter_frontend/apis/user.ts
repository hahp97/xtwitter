import { getAxiosInstance, getRequest, getResponseData } from "@/utils/axios";
import { USER } from "@/utils/constants/endpoint";

export const GetUserById = async (userId: string) => {
  const response = await getRequest(USER.GET_USER_BY_ID, {
    params: { userId },
  });
  return getResponseData(response);
};
