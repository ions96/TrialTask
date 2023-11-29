import axios, {AxiosError, AxiosResponse} from 'axios';
import {API_URL} from './../config';
import i18next from 'i18next';
import store from '@store';
import {logout} from '@store/auth';

export const headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  Accept: 'application/json',
  'Accept-Language': i18next.language,
};

export const timeout = 30000;

export const api = axios.create({
  baseURL: API_URL,
  timeout,
  headers,
});

api.interceptors.request.use(config => {
  config.headers['Accept-Language'] = i18next.language;
  // config.headers.AuthorizationToken = store.getState().auth.user?.token;

  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data?.error?.includes('token')) {
      store.dispatch(logout());
      return response;
    }
    if (response.data.status === 'error') {
      // throw new Error(response.data);
      return Promise.reject(response.data);
    }
    return response;
  },
  async (error: AxiosError) => {
    // The request was made, and the server responded with a status code
    // we should handle this error properly
    return Promise.reject(error);
  },
);

export default api;
