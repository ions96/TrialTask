import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export type LoadingState = boolean;

const initialState: LoadingState = false;

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export const {setIsLoading} = loadingSlice.actions;

export default loadingSlice.reducer;
