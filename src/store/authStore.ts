import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV();

const mmkvStorage = {
  setItem: (name: string, value: string) => storage.set(name, value),
  getItem: (name: string) => storage.getString(name) ?? null,
  removeItem: (name: string) => storage.remove(name),
};

interface User {
  id: string;
  email: string;
  name?: string;
  profile_image?: string;
  bio?: string;
  phone?: string;
  profile_completed?: number;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => {
        console.log('Setting Auth Token in store:', token ? 'Token received' : 'Token cleared');
        set({ token });
      },
      setUser: (user) => {
        console.log('--- AuthStore: Setting User ---');
        console.log(JSON.stringify(user, null, 2));
        set({ user });
      },
      logout: () => {
        console.log('Clearing Auth State (logout action)');
        set({ token: null, user: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
