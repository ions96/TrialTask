export type Langcode = 'ro' | 'en';
export interface User {
  id: number;
  email: string;
  name: string;
  login: string;
  pass: string;
  notify: boolean;
  token: any;
}
export interface LoginResponse extends User {}
export interface LoginRequestPayload {
  email: string;
  type: 'login';
  device_type: string;
  mobile_token: string;
  user: {
    login: string;
    pass: string;
  };
}
export interface PaginationParams {
  limit?: number;
  offset?: number;
}
export interface Product {
  id: number;
  title: string;
  price: number;
  category: number;
  description: string;
  images: string[];
}

export interface CartProductItem {
  id: number;
  user_id: number;
  quantity: number;
}

export interface CartItem {
  id: string | number;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}
