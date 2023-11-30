import {queryClient} from '@react-query';
import {createListenerMiddleware} from '@reduxjs/toolkit';
import {logout} from './slice';

export const logoutListenerMiddleware = createListenerMiddleware();

logoutListenerMiddleware.startListening({
  actionCreator: logout,
  effect: async () => {
    queryClient.clear();
  },
});
