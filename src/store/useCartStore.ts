import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";
import { CartStore } from "@/types/cart";
import { error } from "console";
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
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);
        const productType = product.type;
        const hasType = items.some((item) => {
          const itemProduct = [
            ...require("@/data/products.json").sandwiches,
            ...require("@/data/products.json").extras,
          ].find((p: Product) => p.id === item.id);
          return itemProduct?.type === productType;
        });
        if (hasType && existingItem) {
            const typeNames = {
                sandwich: "sandwich",
                fries: "fries",
                drink: "softdrink"
            }
            set({
                error: `You can only add one ${typeNames[productType as keyof typeof typeNames]} to the cart.`,
            });

            setTimeout(() => {
                set({ error: null });
            }, 5000);
            return;
        }
        if (existingItem) {
            set({
                error: `This item is already in the cart. You can update the quantity from the cart page.`,
            })
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

        const types = items.map((item) => {
            const product = allPructs.find((p) => p.id === item.id);
            return product?.type;
        })
        const hasSandwich = types.includes('sandwich');
        const hasFries = types.includes('fries');
        const hasDrink = types.includes('drink');

        const subtotal = get().getSubtotal();

        if (hasSandwich && hasFries && hasDrink) {
            return {
                percentage: 20,
                amount: subtotal * 0.20,
                description: '20% discount for sandwich, fries, and drink combo'
            }
        } else if (hasSandwich && hasDrink) {
            return {
                percentage: 15,
                amount: subtotal * 0.15,
                description: '15% discount for sandwich and drink combo'
            }
        } else if (hasSandwich && hasFries) {
            return {
                percentage: 10,
                amount: subtotal * 0.10,
                description: '10% discount for sandwich and fries combo'
            }
        }
        return {
            percentage: 0,
            amount: 0,
            description: 'No discount applied'
        }
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
