"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <span className="material-icons text-9xl text-gray-300 mb-4">
            shopping_cart
          </span>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some products to get started!
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <span className="material-icons">restaurant</span>
            View Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        My Cart <span className="material-icons">shopping_cart</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
