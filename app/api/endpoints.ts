import {Platform} from 'react-native';
import {api} from './client';
import {LoginRequestPayload, LoginResponse} from './types';
import {AxiosRequestConfig} from 'axios';

export const auth = (payload: LoginRequestPayload['user']) => {
  return api.post<LoginResponse>('/AppAuthenticate.php', {
    device_type: Platform.OS,
    firebase_token: '',
    login: payload.login,
    password: payload.pass,
  });
};
export const getProducts = (config?: AxiosRequestConfig) => {
  return api.get<any>('/products', config);
};
