import { ILocalStorage, LocalStorageKeys } from './local-storage.models';

export abstract class LocalStorageUtils {
  static getItem<T extends LocalStorageKeys>(key: T): ILocalStorage[T] | null {
    return localStorage.getItem(key) as ILocalStorage[T];
  }

  static setItem<T extends LocalStorageKeys>(key: T, data: ILocalStorage[T]): void {
    localStorage.setItem(key, data);
  }

  static removeItem<T extends LocalStorageKeys>(key: T): void {
    localStorage.removeItem(key);
  }
}
