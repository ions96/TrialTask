import {storage} from './storage';
import {StorageAdapter, Storage} from './types';

class _MMKVStorageAdapter implements StorageAdapter {
  storageInstance: Storage;
  constructor(storageInstance: Storage) {
    this.storageInstance = storageInstance;
  }

  async setItem(key: string, value: string) {
    this.storageInstance.set(key, value);
  }

  async getItem(key: string) {
    const value = this.storageInstance.getString(key);
    return value || null;
  }

  async removeItem(key: string) {
    this.storageInstance.delete(key);
  }
}

export const MMKVStorageAdapter = new _MMKVStorageAdapter(storage);
