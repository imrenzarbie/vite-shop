// src/features/buy-again/types/buy-again.types.ts
export interface Product {
    id: string;
    description: string;
    imageUrl: string;
    isBencoBrand: boolean;
    isOnSpecial: boolean;
    lastPurchased?: string; // undefined == favorite
    price: number;
}
