// src/features/buy-again/types/buy-again.types.ts
export interface Product {
    id: string;
    description: string;
    imageUrl: string;
    isBencoBrand: boolean;
    isOnSpecial: boolean;
    lastPurchasedIso?: string; // ISO-8601 timestamp
    isFavorite?: boolean; // explicit flag instead of overloading lastPurchased
    price: number; // demo; consider priceCents: number in prod
}
