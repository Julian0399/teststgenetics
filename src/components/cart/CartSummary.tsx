"use client";

import { useCartStore } from "@/store/useCartStore";
import { useOrderStore } from "@/store/useOrderStore";
import { useState, FormEvent } from "react";

export function CartSummary() {
  const { items, getTotal, getSubtotal, getDiscount, clearCart } = useCartStore();
  const [customerName, setCustomerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const addOrder = useOrderStore((state) => state.addOrder);

  const total = getTotal();
    const subtotal = getSubtotal();
    const discount = getDiscount();
  const handleSubmitOrder = (event: FormEvent) => {
    event.preventDefault();

    if (!customerName.trim()) return;

    setIsSubmitting(true);

    const order = {
      customerName: customerName.trim(),
      items: [...items],
      total,
      subtotal,
      discount,
      date: new Date(),
    };

    setTimeout(() => {
      addOrder(order);
      setOrderSuccess(true);
      setIsSubmitting(false);
      
      setTimeout(() => {
        clearCart();
        setOrderSuccess(false);
        setCustomerName("");
      }, 5000);
    }, 1000);
  };
  if (orderSuccess) {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center">
        <span className="material-icons text-6xl text-green-500 mb-4">
          check_circle
        </span>
        <h2 className="text-2xl font-bold text-green-700 mb-2">
          Order Placed Successfully!
        </h2>
        <p className="text-green-700 mb-4">
          Thank you for your purchase, {customerName}!
        </p>
        <p className="text-sm text-green-600">
            Redirecting you back to the menu...
        </p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
        <div className="space-y-4 mb-6 pb-6 border-b">
            <div className="flex justify-between text-gray-600">
                <span>SubTotal</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
            { discount.percentage > 0 && (
                <div className="bg-green-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2 text-green-700 font-semibold">
                        <span className="material-icons text-sm">local_offer</span>
                        <span>{discount.description}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-green-600">You have a discount of {discount.percentage}% </span>
                        <span className="text-lg font-bold text-green-600"> -${discount.amount.toFixed(2)}</span>
                    </div>
                </div>
            )}
            <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>$0.00</span>
            </div>
        </div>
        <div className="flex justify-between items-center mp-6 pb-6 mb-6 border-b">
            <span className="text-xl font-bold text-gray-800">Total</span>
            <div className="text-right">
                {discount.percentage > 0 && (
                    <div className="text-sm text-gray-500 line-through">
                        ${subtotal.toFixed(2)}
                    </div>    
                )}
            <span className="text-2xl font-bold text-orange-600">${total.toFixed(2)}</span>
            </div>
        </div>
        <form onSubmit={handleSubmitOrder} className="space-y-4">
            <div>
                <label htmlFor="customerName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Name:
                </label>
                <input
                    type="text"
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    disabled={isSubmitting}
                    required
                    placeholder="Enter your name"
                />
            </div>
            <button type="submit" disabled={isSubmitting || items.length === 0} className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer">
                {isSubmitting ? (
                    <>
                        <span className="material-icons animate-spin">autorenew</span>
                        Processing...
                    </>
                ) : (
                    <>
                        <span className="material-icons">shopping_bag</span>
                        <span>Place Order</span>
                    </>
                )}
            </button>
        </form>

    </div>
  )
}
