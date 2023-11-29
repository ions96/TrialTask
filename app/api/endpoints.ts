import {Platform} from 'react-native';
import {api} from './client';
import {LoginRequestPayload, LoginResponse} from './types';

export const auth = (payload: LoginRequestPayload['user']) => {
  return api.post<LoginResponse>('/AppAuthenticate.php', {
    device_type: Platform.OS,
    firebase_token: '',
    login: payload.login,
    password: payload.pass,
  });
};
