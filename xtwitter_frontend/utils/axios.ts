import type { IPlainObject } from '@/types/common';
import axios, { Axios, AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const token = cookies.get('token');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 60000,
  timeoutErrorMessage: 'timeout',
  headers: {
    'x-token': token,
  },
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.message === 'timeout') {
      console.log('timeout');
    }
    return Promise.reject(error.response?.data || error.message);
  },
);

axiosInstance.interceptors.request
  .use
  // TODO: Add request interceptor for headers
  ();

const getAxiosInstance = (): Axios => axiosInstance;

const getResponseData = <T>(response: AxiosResponse): T => {
  return (response?.data || response) as T;
};

export function postRequest(URL: string, payload: IPlainObject, config?: AxiosRequestConfig) {
  return axiosInstance.post(URL, payload, config);
}

export function putRequest(URL: string, payload: IPlainObject, config?: AxiosRequestConfig) {
  return axiosInstance.put(URL, payload, config);
}

export function deleteRequest(URL: string, payload: IPlainObject) {
  return axiosInstance.delete(URL, { data: payload });
}

export { getAxiosInstance, getResponseData };
