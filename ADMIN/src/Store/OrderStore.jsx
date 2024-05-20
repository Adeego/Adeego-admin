import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const OrderStore = create(
  persist(
    (set) => ({
      items: [],
      itemList: [],
      setItemList: (newItems) => set({ itemList: newItems }),
      clearItems: () => set({ items: [] }),
      removeItem: (productToRemove) =>
        set((state) => ({
          items: state.items.filter(
            (product) => product.ProductId !== productToRemove.ProductId
          ),
        })),
      addItem: (newProductId) =>
        set((state) => ({
          items: [...state.items, newProductId],
        })),
    }),
    {
      name: 'OrderStore',
      Storage: () => localStorage
    }
  )
);

export default OrderStore;