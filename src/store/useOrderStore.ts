import { Order } from "../types/cart";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OrderStore {
    orders: Order[];
    addOrder: (order: Omit<Order, "id">) => void;
    clearOrders: () => void;
    getOrderById: (id: string) => Order | undefined;
}

export const useOrderStore = create<OrderStore>()(
    persist(
        (set, get) => ({
            orders: [],

            addOrder:(order) => {
                const newOrder: Order = {
                    ...order,
                    id: `order_${Date.now()}`
                }
                set((state) => ({
                    orders: [newOrder, ...state.orders]
                }))
            },
            clearOrders: () => set({ orders: [] }),
            getOrderById: (id: string) => {
                return get().orders.find(order => order.id === id);
            }
        }),
        {
            name: "order-storage"
        }
    )
)