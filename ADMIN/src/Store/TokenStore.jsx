import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const tokenStore = create(
  persist(
    (set) => ({
      token: null,
      setToken: (newToken) => set({ token: newToken }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: 'tokenStore',
      Storage: () => localStorage
    }
  )
);

export default tokenStore;