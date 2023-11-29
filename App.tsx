import React, {useMemo} from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {I18nextProvider} from 'react-i18next';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {queryClient, persistOptions} from './app/react-query';
import {ThemeProvider} from '@shopify/restyle';
import AppNavigationContainer from '@navigation';
import i18next, {useI18nStatus} from './app/utils/i18n';
import {CombinedDefaultTheme, CombinedDarkTheme} from './app/themes';
import useColorScheme from './app/hooks/useColorScheme';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor, useAppSelector} from './app/store';
import 'dayjs/locale/ro';
import 'dayjs/locale/ru';
import Overlay from '@component/Overlay';

const App = () => {
  const deviceColorScheme = useColorScheme();
  const appColorScheme = useAppSelector(state => state.ui.colorScheme);
  const isOverlayVisible = useAppSelector(state => state.loading);

  const theme = useMemo(() => {
    if (appColorScheme === 'system') {
      return deviceColorScheme === 'dark'
        ? CombinedDarkTheme
        : CombinedDefaultTheme;
    }
    return appColorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;
  }, [deviceColorScheme, appColorScheme]);

  const isLoadingTranslations = useI18nStatus();

  if (isLoadingTranslations) {
    return <Overlay />;
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={persistOptions}>
      <I18nextProvider i18n={i18next}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            {isOverlayVisible && <Overlay />}
            <AppNavigationContainer theme={theme} />
          </SafeAreaProvider>
        </ThemeProvider>
      </I18nextProvider>
    </PersistQueryClientProvider>
  );
};

const AppWithRedux = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </ReduxProvider>
  );
};

export default AppWithRedux;
