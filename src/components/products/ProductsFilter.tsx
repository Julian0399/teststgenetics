'use client'

import { ProductCategory } from "@/types/product"

interface ProductFilterProps {
    currentFilter: ProductCategory | 'all';
    onFilterChange: (filter: ProductCategory | 'all') => void;
    productCount: number;
}

export function ProductsFilter({ currentFilter, onFilterChange, productCount }: ProductFilterProps) {
    const filters = [
        {id: 'all', label:'All Products'},
        {id: 'sandwiches', label:'Sandwiches'},
        {id: 'extras', label:'Extras'},
    ] as const

    return (
        <div className="mb-8">
            <div className="flex justify-center gap-4 mb-4">
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => onFilterChange(filter.id)}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                            currentFilter === filter.id
                                ? 'bg-orange-500 text-white shadow-lg scale-105'
                                : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                        }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
            <p className="text-center text-gray-600">
                Mostrando {productCount} producto(s)
            </p>
        </div>
    )
}