import { Cart, CartItem, Product } from "../types/type";

const CART_SESSION_KEY = "shopping-cart";
const DELAY_MS = 300; // Simulate network delay

// Simulate API delay
function delay(ms: number = DELAY_MS): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Get cart from session storage
function getCartFromSession(): Cart {
    const cartData = sessionStorage.getItem(CART_SESSION_KEY);
    if (!cartData) {
        return {
            id: "session-cart",
            items: [],
            totalItems: 0,
            totalPrice: 0,
        };
    }
    return JSON.parse(cartData);
}

// Save cart to session storage
function saveCartToSession(cart: Cart): void {
    sessionStorage.setItem(CART_SESSION_KEY, JSON.stringify(cart));
}

// Calculate cart totals
function calculateCartTotals(items: CartItem[]): {
    totalItems: number;
    totalPrice: number;
} {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    return { totalItems, totalPrice };
}

export async function fetchCart(): Promise<Cart> {
    await delay();
    return getCartFromSession();
}

export async function addToCart(
    productId: string,
    product: Product,
    quantity: number = 1
): Promise<Cart> {
    await delay();

    const cart = getCartFromSession();
    const existingItemIndex = cart.items.findIndex(
        (item) => item.productId === productId
    );

    if (existingItemIndex >= 0) {
        cart.items[existingItemIndex].quantity += quantity;
    } else {
        cart.items.push({
            productId,
            quantity,
            product,
        });
    }

    const totals = calculateCartTotals(cart.items);
    cart.totalItems = totals.totalItems;
    cart.totalPrice = totals.totalPrice;

    saveCartToSession(cart);
    return cart;
}

export async function updateCartQuantity(
    productId: string,
    quantity: number
): Promise<Cart> {
    await delay();

    const cart = getCartFromSession();
    const itemIndex = cart.items.findIndex(
        (item) => item.productId === productId
    );

    if (itemIndex >= 0) {
        if (quantity <= 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].quantity = quantity;
        }
    }

    const totals = calculateCartTotals(cart.items);
    cart.totalItems = totals.totalItems;
    cart.totalPrice = totals.totalPrice;

    saveCartToSession(cart);
    return cart;
}

export async function removeFromCart(productId: string): Promise<Cart> {
    await delay();

    const cart = getCartFromSession();
    cart.items = cart.items.filter((item) => item.productId !== productId);

    const totals = calculateCartTotals(cart.items);
    cart.totalItems = totals.totalItems;
    cart.totalPrice = totals.totalPrice;

    saveCartToSession(cart);
    return cart;
}
