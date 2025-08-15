import productsData from "./products.json";
import { PurchasedProduct } from "../utils/product-grouping-util";

// Mock API service - in a real app this would be an actual API call
export const fetchPurchasedProducts = async (): Promise<PurchasedProduct[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real app, this would fetch from an endpoint like:
    // return fetch('/api/purchased-products').then(res => res.json());

    // For demo, return all products as purchased
    // const response = await fetch(productsData);
    return productsData;
};
