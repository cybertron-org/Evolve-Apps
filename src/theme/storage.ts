let storage: any = null;

const getStorage = () => {
  if (!storage) {
    try {
      // v2.x
      const { MMKV } = require('react-native-mmkv');
      storage = new MMKV();
    } catch {
      storage = null;
    }
  }
  return storage;
};

export const themeStorage = {
  get: (key: string): string | null => {
    try {
      return getStorage()?.getString(key) ?? null;
    } catch {
      return null;
    }
  },
  set: (key: string, value: string): void => {
    try {
      getStorage()?.set(key, value);
    } catch {}
  },
};