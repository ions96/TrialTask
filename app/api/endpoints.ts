import {api} from './client';
import {AxiosRequestConfig} from 'axios';

export const getProducts = (config?: AxiosRequestConfig) => {
  return api.get<any>('/products', config);
};
