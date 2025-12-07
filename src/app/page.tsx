import { ProductGrid } from "@/components/products/ProductGrid";
import productsData from "@/data/products.json"
import { Product } from "@/types/product";

export default function Home() {
  const sandwiches = productsData.sandwiches as Product[];
  const extras = productsData.extras as Product[];
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Discounts 
        </h1>
        <p className="text-gray-600 text-lg">
          If selecting a sandwich, fries, and a soft drink, receive a 20% discount. <br />
          If selecting a sandwich and a soft drink, receive a 15% discount. <br />
          If selecting a sandwich and fries, receive a 10% discount.
        </p>
      </div>
      <ProductGrid products={[...sandwiches, ...extras]} />
    </div>
  );
}
