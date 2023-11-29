import {QueryClient} from '@tanstack/react-query';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import {PersistQueryClientOptions} from '@tanstack/react-query-persist-client';

import {MMKVStorageAdapter} from '../mmkv';
import {API_URL} from './../config';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 2 * 60 * 60 * 1000, // 2 hours
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  key: 'edneos.react-query.' + API_URL,
  storage: MMKVStorageAdapter,
  throttleTime: 2000,
});

export const persistOptions: Omit<PersistQueryClientOptions, 'queryClient'> = {
  persister: asyncStoragePersister,
  maxAge: 2 * 60 * 60 * 1000, // 2 hours
};
