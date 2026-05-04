import axios, { type AxiosInstance } from 'axios';
import type { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import {
  createHttpError,
  type HttpError,
  UNKNOWN_HTTP_ERROR,
} from '../shared/http-error';

type HttpErrorThunkConfig = {
  rejectValue: HttpError;
  extra: AxiosInstance;
};

type HttpRequest<Result, Arg> = (
  arg: Arg,
  api: AxiosInstance,
) => Promise<Result>;

type HttpErrorThunkApi = {
  extra: AxiosInstance;
  rejectWithValue: (value: HttpError) => unknown;
};

export const createSafeThunkPayload = <Result, Arg>(
  request: HttpRequest<Result, Arg>,
) => {
  const payloadCreator = async (
    arg: Arg,
    { extra: api, rejectWithValue }: HttpErrorThunkApi,
  ) => {
    try {
      return await request(arg, api);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(createHttpError(error));
      }

      return rejectWithValue(UNKNOWN_HTTP_ERROR);
    }
  };

  return payloadCreator as AsyncThunkPayloadCreator<
    Result,
    Arg,
    HttpErrorThunkConfig
  >;
};
