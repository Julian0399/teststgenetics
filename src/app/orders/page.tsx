'use client'

import { OrderCard } from "@/components/orders/OrderCard"
import { useOrderStore } from "@/store/useOrderStore"
import Link from "next/link"

export default function OrdersPage() {
    const orders = useOrderStore((state) => state.orders)
    if(orders.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-md mx-auto text-center">
                    <span className="material-icons text-9xl text-gray-300 mb-4">receipt_long</span>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">No orders found.</h1>
                    <p className="text-gray-600 mb-8">You haven't placed any orders yet!</p>
                    <Link href="/" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                        <span className="material-icons">restaurant</span>
                        View Menu
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <div>
                    <h1 className="text-4xl font-bold">Orders History</h1>
                    <p className="text-gray-600 mt-2">Review your past orders and their details.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            </div>
        </div>
    )
}