import { AUTH_TOKEN_STORAGE_KEY } from './constants';

export const saveAuthToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
};

export const readAuthToken = (): string | null =>
  localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

export const removeAuthToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
};
