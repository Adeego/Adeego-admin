import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const staffStore = create(
  persist(
    (set) => ({
      staff: null,
      setStaff: (newStaff) => set({ staff: newStaff }),
      clearStaff: () => set({ staff: null }),
    }),
    {
      name: 'staffStore',
      Storage: () => localStorage
    }
  )
);

export default staffStore;