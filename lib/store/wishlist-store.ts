import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  image?: string;
  slug?: string;
}

export interface WishlistState {
  items: WishlistItem[];
  isOpen: boolean;
}

export interface WishlistActions {
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  toggleItem: (item: WishlistItem) => void;
  clearWishlist: () => void;
  toggleWishlist: () => void;
  openWishlist: () => void;
  closeWishlist: () => void;
}

export type WishlistStore = WishlistState & WishlistActions;

export const defaultInitState: WishlistState = {
  items: [],
  isOpen: false,
};

export const createWishlistStore = (
  initState: WishlistState = defaultInitState,
) => {
  return createStore<WishlistStore>()(
    persist(
      (set) => ({
        ...initState,

        addItem: (item) =>
          set((state) => {
            if (state.items.some((i) => i.productId === item.productId)) {
              return state;
            }
            return { items: [item, ...state.items] };
          }),

        removeItem: (productId) =>
          set((state) => ({
            items: state.items.filter((i) => i.productId !== productId),
          })),

        toggleItem: (item) =>
          set((state) => {
            const isWishlisted = state.items.some(
              (i) => i.productId === item.productId,
            );
            if (isWishlisted) {
              return {
                items: state.items.filter((i) => i.productId !== item.productId),
              };
            }
            return { items: [item, ...state.items] };
          }),

        clearWishlist: () => set({ items: [] }),
        toggleWishlist: () => set((state) => ({ isOpen: !state.isOpen })),
        openWishlist: () => set({ isOpen: true }),
        closeWishlist: () => set({ isOpen: false }),
      }),
      {
        name: "suradiq-wishlist",
        skipHydration: true,
        partialize: (state) => ({ items: state.items }),
      },
    ),
  );
};
