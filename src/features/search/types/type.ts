export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

export interface CartItem {
    productId: string;
    quantity: number;
    product: Product;
}

export interface Cart {
    id: string;
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}

export interface CartActionPayload {
    productId: string;
    quantity?: number;
}
