import { calculateDiscount } from "@/components/lib/discountCalculator";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";

const mockProducts: Product[] = [
  {
    id: "s1",
    name: "Burguer",
    description:
      "Delicious beef burger with fresh lettuce, tomato, and cheese.",
    price: 5.0,
    image: "/images/burguer.webp",
    category: "sandwiches",
    available: true,
    type: "sandwich",
  },
  {
    id: "s2",
    name: "Egg",
    description:
      "Delicious egg sandwich with fresh lettuce, tomato, and cheese.",
    price: 4.5,
    image: "/images/egg.webp",
    category: "sandwiches",
    available: true,
    type: "sandwich",
  },
  {
    id: "s3",
    name: "Bacon",
    description:
      "Delicious bacon sandwich with fresh lettuce, tomato, and cheese.",
    price: 7.0,
    image: "/images/bacon.webp",
    category: "sandwiches",
    available: true,
    type: "sandwich",
  },
  {
    id: "e1",
    name: "Fries",
    description: "Add a serving of fries to your order.",
    price: 2.0,
    image: "/images/fries.webp",
    category: "extras",
    available: true,
    type: "fries",
  },
  {
    id: "e2",
    name: "Soft Drink",
    description: "Add a refreshing soft drink to your order.",
    price: 2.5,
    image: "/images/soft_drink2.webp",
    category: "extras",
    available: true,
    type: "drink",
  },
];

describe("Discount Calculator", () => {
    describe("calculateDiscount", () => {
        test("applies 20% discount for sandwich, fries, and drink combo", () => {
            const CartItems: CartItem[] = [
                { id: mockProducts[0].id, name: mockProducts[0].name, price: mockProducts[0].price, image: mockProducts[0].image, quantity: 1 }, 
                { id: mockProducts[3].id, name: mockProducts[3].name, price: mockProducts[3].price, image: mockProducts[3].image, quantity: 1 }, 
                { id: mockProducts[4].id, name: mockProducts[4].name, price: mockProducts[4].price, image: mockProducts[4].image, quantity: 1 }, 
            ];
            const result = calculateDiscount(CartItems, mockProducts);
            expect(result.percentage).toBe(20);
            expect(result.amount).toBeCloseTo(1.9); 
            expect(result.description).toBe("20% discount for sandwich, fries, and drink combo");
        });
        test("applies 15% discount for sandwich and drink combo", () => {
            const CartItems: CartItem[] = [
                { id: mockProducts[1].id, name: mockProducts[1].name, price: mockProducts[1].price, image: mockProducts[1].image, quantity: 1 }, 
                { id: mockProducts[4].id, name: mockProducts[4].name, price: mockProducts[4].price, image: mockProducts[4].image, quantity: 1 },
            ];
            const result = calculateDiscount(CartItems, mockProducts);
            expect(result.percentage).toBe(15);
            expect(result.amount).toBeCloseTo(1.05); 
            expect(result.description).toBe("15% discount for sandwich and drink combo");
        });
        test("applies 10% discount for sandwich and fries combo", () => {
            const CartItems: CartItem[] = [
                { id: mockProducts[2].id, name: mockProducts[2].name, price: mockProducts[2].price, image: mockProducts[2].image, quantity: 1 }, 
                { id: mockProducts[3].id, name: mockProducts[3].name, price: mockProducts[3].price, image: mockProducts[3].image, quantity: 1 }, 
            ];
            const result = calculateDiscount(CartItems, mockProducts);
            expect(result.percentage).toBe(10);
            expect(result.amount).toBeCloseTo(0.9); 
            expect(result.description).toBe("10% discount for sandwich and fries combo");
        })
    });
});
