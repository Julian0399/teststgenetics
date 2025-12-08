import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";
import { CartStore } from "@/types/cart";
import { calculateDiscount, validateItemType } from "@/components/lib/discountCalculator";

interface ExtendCartStore extends CartStore {
  error: string | null;
  setError: (error: string | null) => void;
  getDiscount: () => {
    percentage: number;
    amount: number;
    description: string;
  };
  getSubtotal: () => number;
}
export const useCartStore = create<ExtendCartStore>()(
  persist(
    (set, get) => ({
      items: [],
      error: null,

      setError: (error: string | null) => set({ error }),
      addItem: (product: Product) => {
        const items = get().items
        const productsData = require('@/data/products.json')
        const allProducts = [...productsData.sandwiches, ...productsData.extras] as Product[];
        const validation = validateItemType(items, product, allProducts);
        if (!validation.valid) {
            set({ error: validation.error || null });
            setTimeout(() => {
                set({ error: null });
            }, 5000);
            return;
        }
        set({
                items:[...items,{
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image,
                }],
                error: null,
            })
        },
      removeItem: (id: string) => {
        set({
          items: get().items.filter((item) => item.id !== id),error: null
        });
      },
      updateQuantity: (id: string, quantity: number) => {
        if (quantity > 1) {
          set({ error: 'You can only have one of each item per order.' })
          setTimeout(() => set({ error: null }), 5000)
          return
        }
        
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
      },
      clearCart: () => {
        set({ items: [], error: null });
      },
      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      getDiscount: () => {
        const items = get().items;
        const productsData = require('@/data/products.json')
        const allPructs = [...productsData.sandwiches, ...productsData.extras] as Product[];
        return calculateDiscount(items, allPructs);
      },
      getTotal: () => {
        const subtotal = get().getSubtotal()
        const discount = get().getDiscount()
        return subtotal - discount.amount
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
