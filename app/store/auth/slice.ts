import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {User} from '@api';

type DiscriminatedAuthState =
  | {isAuthenticated: true; user: User}
  | {isAuthenticated: false; user: null};
interface State {
  attempts: number;
  remember: boolean;
}
export type AuthState = DiscriminatedAuthState & State;
const initialState = {
  isAuthenticated: false,
  user: null,
  attempts: 0,
  remember: true,
} as AuthState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = {...action.payload};
    },
    logout: () => {
      return initialState;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      return state;
    },
  },
});

export const {loginSuccess, logout, updateUser} = authSlice.actions;

export default authSlice.reducer;
