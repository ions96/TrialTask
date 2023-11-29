import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {ThemeSchemes} from '@theme';

export interface UIState {
  colorScheme: ThemeSchemes;
  isOnboardingPassed: boolean;
  isHomeRegisterCardVisible: boolean;
  rating: number;
  unreadNotificationsCount: number;
}

const initialState: UIState = {
  colorScheme: 'light',
  isOnboardingPassed: true,
  isHomeRegisterCardVisible: true,
  rating: 0,
  unreadNotificationsCount: 0,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    changeColorScheme: (state, action: PayloadAction<ThemeSchemes>) => {
      state.colorScheme = action.payload;
    },
    setRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
    },
    markOnboardingAsPassed: state => {
      state.isOnboardingPassed = true;
    },
    hideHomeRegisterCard: state => {
      state.isHomeRegisterCardVisible = false;
    },
    setNotificationsCount: (state, action: PayloadAction<number>) => {
      state.unreadNotificationsCount = action.payload;
    },
    decrementNotificationsCount: (
      state,
      action: PayloadAction<number | undefined>,
    ) => {
      state.unreadNotificationsCount -= action.payload || 1;
    },
  },
});

export const {
  changeColorScheme,
  markOnboardingAsPassed,
  hideHomeRegisterCard,
  setRating,
  setNotificationsCount,
  decrementNotificationsCount,
} = uiSlice.actions;

export default uiSlice.reducer;
