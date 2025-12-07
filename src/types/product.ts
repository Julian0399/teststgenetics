export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'sandwiches' | 'extras';
  available: boolean;
  type?: 'sandwich' | 'fries' | 'drink';
}

export type ProductCategory = Product['category'];
export type ProductType = Product['type'];