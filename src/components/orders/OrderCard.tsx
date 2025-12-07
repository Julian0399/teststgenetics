import { Order } from "@/types/cart";
import Image from "next/image";

interface OrderCardProps {
    order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
    const orderDate = new Date(order.date);
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex justify-between items-start mb-4 pb-4 border-b">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600">Customer: <span className="font-semibold">{order.customerName}</span></p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">
                        {orderDate.toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                        {orderDate.toLocaleTimeString()}
                    </p>
                </div>
            </div>
            <div className="space-y-3 mb-4">
                {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                        <div className="relative w-12 h-12 shrink-0">
                            <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" className="rounded" />
                        </div>
                        <div className="grow">
                            <p className="text-sm font-medium text-gray-800">{item.name}</p>
                            <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-700">
                            ${(item.price * item.quantity).toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>
            <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal:</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                </div>

                {order.discount.percentage > 0 && (
                    <div className="flex justify-between text-sm text-green-600 font-semibold">
                        <span>Discount ({order.discount.percentage}%):</span>
                        <span>-${order.discount.amount.toFixed(2)}</span>
                    </div>
                )}
                <div className="flex justify-between text-lg font-bold text-orange-600 pt-2 border-t">
                    <span>Total:</span>
                    <span>${order.total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}