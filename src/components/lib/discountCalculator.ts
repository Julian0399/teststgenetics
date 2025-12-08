import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";


export interface DiscountResult {
    percentage: number;
    amount: number;
    description: string;
}

export function calculateDiscount( items: CartItem[], allPructs: Product[] ): DiscountResult {

    const types = items.map(item => {
        const product = allPructs.find(p => p.id === item.id);
        return product?.type;
    })

    const hasSandwich = types.includes('sandwich');
    const hasFries = types.includes('fries');
    const hasDrink = types.includes('drink');

    const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    if (hasSandwich && hasFries && hasDrink) {
        return {
            percentage: 20,
            amount: subtotal * 0.20,
            description: '20% discount for sandwich, fries, and drink combo'
        }
    } else if (hasSandwich && hasDrink) {
        return {
            percentage: 15,
            amount: subtotal * 0.15,
            description: '15% discount for sandwich and drink combo'
        }
    } else if (hasSandwich && hasFries) {
        return {
            percentage: 10,
            amount: subtotal * 0.10,
            description: '10% discount for sandwich and fries combo'
        }
    }
    return {
        percentage: 0,
        amount: 0,
        description: 'No discount'
    };
}

export function validateItemType(items: CartItem[], newProduct: Product, allProducts: Product[]): { valid: boolean; error?: string } {
    const existingItem = items.find(item => item.id === newProduct.id)

    const productType = newProduct.type;

    const hasType = items.some(item => {
        const product = allProducts.find(p => p.id === item.id);
        return product?.type === productType;
    });

    if (hasType && !existingItem) {
        const typeNames = {
            sandwich: 'sandwich',
            fries: 'fries',
            drink: 'soft drink'
        }
        return { valid: false, error: `You can only add one ${typeNames[productType as keyof typeof typeNames]} to the cart.` };
    }

    if(existingItem) {
        return { valid: false, error: `This item is already in the cart and cannot be added again.` };
    }
    return { valid: true };
}