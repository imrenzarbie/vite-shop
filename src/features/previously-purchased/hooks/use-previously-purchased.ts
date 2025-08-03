// src/features/purchased/hooks/usePurchasedProducts.ts
import { useMemo } from "react";
import { ProductType } from "../types/product.type";

const usePurchasedProducts = () => {
    const dummyProducts: ProductType[] = useMemo(
        () => [
            {
                id: "1",
                name: "Wireless Bluetooth Earbuds",
                description: "Noise-cancelling with 20h battery life",
                price: 89.99,
                currency: "USD",
                imageUrl:
                    "https://placehold.co/600x400/6366f1/white?text=Earbuds",
                category: "Electronics",
                rating: 4.5,
                purchasedAt: "2025-07-15",
            },
            {
                id: "2",
                name: "Smart Fitness Tracker",
                description: "Heart rate monitor and sleep tracking",
                price: 49.99,
                currency: "USD",
                imageUrl:
                    "https://placehold.co/600x400/8b5cf6/white?text=Fitness",
                category: "Wearables",
                rating: 4.2,
                purchasedAt: "2025-07-10",
            },
            {
                id: "3",
                name: "Portable External SSD 1TB",
                description: "Ultra-fast USB 3.2 transfer speeds",
                price: 129.99,
                currency: "USD",
                imageUrl: "https://placehold.co/600x400/ec4899/white?text=SSD",
                category: "Storage",
                rating: 4.8,
                purchasedAt: "2025-06-28",
            },
            {
                id: "4",
                name: "Ergonomic Office Chair",
                description: "Lumbar support with adjustable height",
                price: 199.99,
                currency: "USD",
                imageUrl:
                    "https://placehold.co/600x400/6366f1/white?text=Chair",
                category: "Furniture",
                rating: 4.6,
                purchasedAt: "2025-06-20",
            },
            {
                id: "5",
                name: "4K Ultra HD Action Camera",
                description: "Waterproof with image stabilization",
                price: 159.99,
                currency: "USD",
                imageUrl:
                    "https://placehold.co/600x400/8b5cf6/white?text=Camera",
                category: "Cameras",
                rating: 4.4,
                purchasedAt: "2025-06-10",
            },
            {
                id: "6",
                name: "Wireless Charging Pad",
                description: "Fast charging for multiple devices",
                price: 29.99,
                currency: "USD",
                imageUrl:
                    "https://placehold.co/600x400/ec4899/white?text=Charger",
                category: "Accessories",
                rating: 4.1,
                purchasedAt: "2025-05-30",
            },
            {
                id: "7",
                name: "Noise Cancelling Headphones",
                description: "Over-ear with 30h battery life",
                price: 199.99,
                currency: "USD",
                imageUrl:
                    "https://placehold.co/600x400/6366f1/white?text=Headphones",
                category: "Audio",
                rating: 4.7,
                purchasedAt: "2025-05-22",
            },
            {
                id: "8",
                name: "Smart Home Hub",
                description: "Voice-controlled with app integration",
                price: 89.99,
                currency: "USD",
                imageUrl: "https://placehold.co/600x400/8b5cf6/white?text=Hub",
                category: "Smart Home",
                rating: 4.3,
                purchasedAt: "2025-05-15",
            },
            {
                id: "9",
                name: "Mechanical Gaming Keyboard",
                description: "RGB backlit with programmable keys",
                price: 79.99,
                currency: "USD",
                imageUrl:
                    "https://placehold.co/600x400/ec4899/white?text=Keyboard",
                category: "Gaming",
                rating: 4.5,
                purchasedAt: "2025-05-05",
            },
            {
                id: "10",
                name: "Stainless Steel Water Bottle",
                description: "Double-walled insulation for 24h",
                price: 24.99,
                currency: "USD",
                imageUrl:
                    "https://placehold.co/600x400/6366f1/white?text=Bottle",
                category: "Lifestyle",
                rating: 4.2,
                purchasedAt: "2025-04-28",
            },
            {
                id: "11",
                name: "Wireless Gaming Mouse",
                description: "High precision sensor with customizable buttons",
                price: 49.99,
                currency: "USD",
                imageUrl:
                    "https://placehold.co/600x400/8b5cf6/white?text=Mouse",
                category: "Gaming",
                rating: 4.4,
                purchasedAt: "2025-04-20",
            },
            {
                id: "12",
                name: "LED Desk Lamp",
                description: "Adjustable brightness with USB ports",
                price: 39.99,
                currency: "USD",
                imageUrl: "https://placehold.co/600x400/ec4899/white?text=Lamp",
                category: "Office",
                rating: 4.0,
                purchasedAt: "2025-04-12",
            },
            {
                id: "13",
                name: "Bluetooth Portable Speaker",
                description: "360° sound with deep bass",
                price: 59.99,
                currency: "USD",
                imageUrl:
                    "https://placehold.co/600x400/6366f1/white?text=Speaker",
                category: "Audio",
                rating: 4.3,
                purchasedAt: "2025-04-05",
            },
            {
                id: "14",
                name: "Electric Kettle",
                description: "Fast boiling with temperature control",
                price: 34.99,
                currency: "USD",
                imageUrl:
                    "https://placehold.co/600x400/8b5cf6/white?text=Kettle",
                category: "Home",
                rating: 4.1,
                purchasedAt: "2025-03-28",
            },
            {
                id: "15",
                name: "Yoga Mat",
                description: "Eco-friendly non-slip surface",
                price: 29.99,
                currency: "USD",
                imageUrl:
                    "https://placehold.co/600x400/ec4899/white?text=Yoga+Mat",
                category: "Fitness",
                rating: 4.5,
                purchasedAt: "2025-03-20",
            },
            {
                id: "16",
                name: "Digital Camera",
                description: "24MP sensor with 4K video",
                price: 399.99,
                currency: "USD",
                imageUrl:
                    "https://placehold.co/600x400/6366f1/white?text=Camera",
                category: "Photography",
                rating: 4.6,
                purchasedAt: "2025-03-12",
            },
            {
                id: "17",
                name: "Backpack Laptop Bag",
                description: "Water-resistant with padded compartment",
                price: 59.99,
                currency: "USD",
                imageUrl:
                    "https://placehold.co/600x400/8b5cf6/white?text=Backpack",
                category: "Accessories",
                rating: 4.2,
                purchasedAt: "2025-03-05",
            },
            {
                id: "18",
                name: "Smart Watch",
                description: "Fitness tracking and notifications",
                price: 129.99,
                currency: "USD",
                imageUrl:
                    "https://placehold.co/600x400/ec4899/white?text=Watch",
                category: "Wearables",
                rating: 4.4,
                purchasedAt: "2025-02-25",
            },
            {
                id: "19",
                name: "Coffee Maker",
                description: "Programmable with thermal carafe",
                price: 79.99,
                currency: "USD",
                imageUrl:
                    "https://placehold.co/600x400/6366f1/white?text=Coffee",
                category: "Kitchen",
                rating: 4.3,
                purchasedAt: "2025-02-18",
            },
            {
                id: "20",
                name: "Wireless Router",
                description: "Wi-Fi 6 with advanced security",
                price: 149.99,
                currency: "USD",
                imageUrl:
                    "https://placehold.co/600x400/8b5cf6/white?text=Router",
                category: "Networking",
                rating: 4.5,
                purchasedAt: "2025-02-10",
            },
        ],
        []
    );

    return { products: dummyProducts };
};

export default usePurchasedProducts;
