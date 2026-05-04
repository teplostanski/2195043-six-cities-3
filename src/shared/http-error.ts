import type { AxiosError } from 'axios';
import { getReasonPhrase } from 'http-status-codes';

export type HttpError = {
  status: number | null;
  message: string;
};

const UNKNOWN_HTTP_ERROR_MESSAGE = 'Unknown Error';

type ServerErrorData = {
  message?: string;
  error?: string;
};

export const UNKNOWN_HTTP_ERROR: HttpError = {
  status: null,
  message: UNKNOWN_HTTP_ERROR_MESSAGE,
};

const getReasonPhraseSafe = (status: number | null): string => {
  if (status === null) {
    return UNKNOWN_HTTP_ERROR_MESSAGE;
  }

  try {
    return getReasonPhrase(status);
  } catch {
    return UNKNOWN_HTTP_ERROR_MESSAGE;
  }
};

export const createHttpError = (error: AxiosError): HttpError => {
  const status = error.response?.status ?? null;
  const data = error.response?.data as ServerErrorData | string | undefined;

  if (typeof data === 'string' && data.trim().length > 0) {
    return { status, message: data };
  }

  if (typeof data === 'object' && data !== null) {
    if (typeof data.message === 'string' && data.message.trim().length > 0) {
      return { status, message: data.message };
    }

    if (typeof data.error === 'string' && data.error.trim().length > 0) {
      return { status, message: data.error };
    }
  }

  return {
    status,
    message: getReasonPhraseSafe(status),
  };
};
