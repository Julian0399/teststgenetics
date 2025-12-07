'use client'

import Image from "next/image"
import { CartItem as CartItemType } from "@/types/cart"
import { useCartStore } from "@/store/useCartStore"

interface CartItemProps {
    item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeItem }  = useCartStore();
    console.log('Rendering CartItem for:', item);
    return (
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md">
            <div className="relative w-20 h-20 shrink-0">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="w-full h-full object-cover rounded-md"
                />
            </div>
            <div className="grow min-w-0">
                <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                <p className="text-orange-600 font-bold">${item.price.toFixed(2)}</p>                
            </div>
            <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold rounded-lg">
                    <span className="material-icons text-base">
                    remove
                    </span>
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold rounded-lg">
                    <span className="material-icons text-base">
                    add
                    </span>
                </button>
            </div>
            <div className="text-right shrink-0">
                <p className="text-sm text-gray-600">SubTotal</p>
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button onClick={() => removeItem(item.id)} className="ml-4 text-red-400 hover:text-red-600 shrink-0">
                <span className="material-icons">
                    delete
                </span>
            </button>
        </div>
    )
}