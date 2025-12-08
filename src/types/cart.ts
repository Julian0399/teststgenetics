import { Product } from "./product";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface Order {
    id: string;
    customerName: string;
    items: CartItem[];
    total: number;
    subtotal: number;
    discount: {
        percentage: number;
        amount: number;
        description: string;
    }
    date: Date;
}

export interface CartStore {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
    getItemCount: () => number;
}