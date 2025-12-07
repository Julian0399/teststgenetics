'use client'
import { Product } from "@/types/product";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    
    const addItem = useCartStore((state) => state.addItem);
    
    const handleAddToCart = () => {
        addItem(product);
        console.log(`Adding ${product.name} to cart`);
    }

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200">
            <div className="relative h-48 bg-gray-200">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="w-full h-full object-cover"
                />
                {!product.available && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white text-lg font-semibold">Out of Stock</span>
                    </div>  
                )}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-600">${product.price.toFixed(2)}</span>
                    <button
                        onClick={handleAddToCart}
                        disabled={!product.available}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}