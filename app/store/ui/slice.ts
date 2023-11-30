import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {ThemeSchemes} from '@theme';

export interface UIState {
  colorScheme: ThemeSchemes;
  isOnboardingPassed: boolean;
}

const initialState: UIState = {
  colorScheme: 'light',
  isOnboardingPassed: true,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    changeColorScheme: (state, action: PayloadAction<ThemeSchemes>) => {
      state.colorScheme = action.payload;
    },
    markOnboardingAsPassed: state => {
      state.isOnboardingPassed = true;
    },
  },
});

export const {changeColorScheme, markOnboardingAsPassed} = uiSlice.actions;

export default uiSlice.reducer;
