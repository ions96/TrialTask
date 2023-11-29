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
