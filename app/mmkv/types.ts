import {storage} from './storage';

export type Storage = typeof storage;

export interface StorageAdapter {
  setItem: (key: string, value: string) => Promise<void>;
  getItem: (key: string) => Promise<string | null>;
  removeItem: (key: string) => Promise<void>;
}
