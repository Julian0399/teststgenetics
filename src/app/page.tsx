"use client";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductsFilter } from "@/components/products/ProductsFilter";
import productsData from "@/data/products.json";
import { Product, ProductCategory } from "@/types/product";
import { useEffect, useState } from "react";

export default function Home() {
  const [filter, setFilter] = useState<ProductCategory | "all">("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const allProducts = [
        ...productsData.sandwiches,
        ...productsData.extras,
      ] as Product[];

      setProducts(allProducts);
      setIsLoading(false);
    }
    fetchProducts();
  }, []);
  
  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((product) => product.category === filter);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4"> We have great discounts!</h1>
        <p className="text-gray-600 text-lg">
          If selecting a sandwich, fries, and a soft drink, receive a 20%
          discount. <br />
          If selecting a sandwich and a soft drink, receive a 15% discount. <br />
          If selecting a sandwich and fries, receive a 10% discount.
        </p>
      </div>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <span className="material-icons text-6xl text-gray-300 animate-spin mb-4">
            autorenew
          </span>
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      ) : ( 
        <>
          <ProductsFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            productCount={filteredProducts.length}
          />
          <ProductGrid products={filteredProducts} />
        </>
      )}
    </div>

  );
}
