import axios, { type AxiosInstance } from 'axios';

const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;
const STATUS_CODE_UNAUTHORIZED = 401;

type UnauthorizedHandler = () => void;

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};

export const setupInterceptors = (
  api: AxiosInstance,
  onUnauthorized: UnauthorizedHandler,
) => {
  api.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (axios.isAxiosError(error) && error.response?.status === STATUS_CODE_UNAUTHORIZED) {
        onUnauthorized();
      }

      return Promise.reject(error);
    },
  );
};
