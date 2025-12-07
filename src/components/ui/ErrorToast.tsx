'use client'

import { useCartStore } from "@/store/useCartStore";

export function ErrorToast() {
    const error = useCartStore((state) => state.error);

    if (!error) return null;

    return (
        <div className="fixed top-20 right-4 z-50 animate-slide-in">
            <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 shadow-lg max-w-md">
                <div className="flex items-start gap-2">
                    <span className="material-icons text-4xl text-red-500">
                        error_outline
                    </span>
                    <div>
                        <h4 className="font-bold text-red-700 mb-1">
                            Cannot add this item more than once.
                        </h4>
                        <p className="text-dm text-red-600">
                            {error}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}