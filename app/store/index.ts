import {combineReducers, Middleware} from 'redux';
import {
  persistStore,
  persistReducer,
  PersistConfig,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {MMKVStorageAdapter} from './../mmkv';
import ui from './ui';
import auth, {logoutListenerMiddleware} from './auth';
import loading from './loading';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import migrate from './migrate';
import {API_URL} from './../config';

const reducers = {
  ui,
  auth,
  loading,
};

const rootReducers = combineReducers(reducers);

const rootPersistConfig: PersistConfig<ReturnType<typeof rootReducers>> = {
  key: 'root-' + API_URL,
  storage: MMKVStorageAdapter,
  whitelist: ['auth', 'ui'],
  blacklist: ['loading'],
  timeout: undefined,
  stateReconciler: autoMergeLevel2,
  version: 1,
  migrate,
  transforms: [],
};
const persistReducers = persistReducer(rootPersistConfig, rootReducers);

const middlewares = [logoutListenerMiddleware.middleware] as Middleware[];

const store = configureStore({
  reducer: persistReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {store, persistor};
export default store;
