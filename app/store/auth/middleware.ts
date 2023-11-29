import {queryClient} from '@react-query';
import {createListenerMiddleware} from '@reduxjs/toolkit';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {LoginManager} from 'react-native-fbsdk-next';
import {logout} from './slice';

export const logoutListenerMiddleware = createListenerMiddleware();

logoutListenerMiddleware.startListening({
  actionCreator: logout,
  effect: async () => {
    queryClient.clear();
    // const isSignedIn = await GoogleSignin.isSignedIn().catch(() => {});
    // if (isSignedIn) {
    //   GoogleSignin.signOut().catch(() => {});
    // }
    // LoginManager.logOut();
  },
});
