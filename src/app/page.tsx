"use client";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductsFilter } from "@/components/products/ProductsFilter";
import productsData from "@/data/products.json";
import { Product, ProductCategory } from "@/types/product";
import { useState } from "react";

export default function Home() {
  const [filter, setFilter] = useState<ProductCategory | "all">("all");
  const allProducts = [
    ...productsData.sandwiches,
    ...productsData.extras,
  ] as Product[];
  const filteredProducts =
    filter === "all"
      ? allProducts
      : allProducts.filter((product) => product.category === filter);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Discounts</h1>
        <p className="text-gray-600 text-lg">
          If selecting a sandwich, fries, and a soft drink, receive a 20%
          discount. <br />
          If selecting a sandwich and a soft drink, receive a 15% discount.{" "}
          <br />
          If selecting a sandwich and fries, receive a 10% discount.
        </p>
      </div>
      <ProductsFilter
        currentFilter={filter}
        onFilterChange={setFilter}
        productCount={filteredProducts.length}
      />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
