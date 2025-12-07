export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'sandwiches' | 'extras';
  available: boolean;
}

export type ProductCategory = Product['category'];