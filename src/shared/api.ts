import axios, { type AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { readAuthToken } from './auth-token';

const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

type UnauthorizedHandler = () => void;

export const createApi = (): AxiosInstance =>
  axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

export const setupInterceptors = (
  api: AxiosInstance,
  onUnauthorized: UnauthorizedHandler,
) => {
  api.interceptors.request.use((config) => {
    const token = readAuthToken();
    if (token) {
      config.headers['X-Token'] = token;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (axios.isAxiosError(error) && error.response?.status === StatusCodes.UNAUTHORIZED) {
        onUnauthorized();
      }

      return Promise.reject(error);
    },
  );
};
