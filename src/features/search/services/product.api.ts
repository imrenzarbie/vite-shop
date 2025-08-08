import { Product } from "../types/type";

const PRODUCT_NAMES = [
    "iPhone 15 Pro Max",
    "Samsung Galaxy S24 Ultra",
    "MacBook Pro 16-inch",
    "Dell XPS 13 Laptop",
    "Sony WH-1000XM5 Headphones",
    "AirPods Pro 2nd Gen",
    "iPad Air 5th Generation",
    "Surface Pro 9",
    "Nintendo Switch OLED",
    "PlayStation 5 Console",
    "Xbox Series X",
    "Canon EOS R5 Camera",
    "GoPro Hero 12 Black",
    "Apple Watch Series 9",
    "Samsung Galaxy Watch 6",
    "Fitbit Charge 6",
    "Kindle Paperwhite",
    "Echo Dot 5th Gen",
    "Google Nest Hub Max",
    "Tesla Model Y Charger",
    "Logitech MX Master 3S Mouse",
    "Mechanical Gaming Keyboard",
    "LG OLED 65-inch TV",
    "Sony Bravia 55-inch TV",
    "Bose QuietComfort Earbuds",
    "JBL Flip 6 Speaker",
    "Dyson V15 Vacuum",
    "Instant Pot Pro 8-Quart",
    "KitchenAid Stand Mixer",
    "Vitamix Professional Blender",
];

const DUMMY_PRODUCTS: Product[] = Array.from({ length: 30 }, (_, i) => ({
    id: `product-${i + 1}`,
    name: PRODUCT_NAMES[i],
    description: `Experience the best-in-class ${PRODUCT_NAMES[i]} with cutting-edge technology and premium build quality. Perfect for both professional and personal use.`,
    price: Math.floor(Math.random() * 500) + 50,
    imageUrl: `https://picsum.photos/200/200?random=${i + 1}`,
}));

const DELAY_MS = 0;

function delay(ms: number = DELAY_MS): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface ProductSearchParams {
    page: number;
    limit: number;
    search?: string;
}

export interface ProductSearchResponse {
    products: Product[];
    totalProducts: number;
    totalPages: number;
    currentPage: number;
}

export async function fetchProducts(
    params: ProductSearchParams
): Promise<ProductSearchResponse> {
    await delay();

    const { page, limit, search } = params;
    let filteredProducts = DUMMY_PRODUCTS;

    if (search) {
        filteredProducts = DUMMY_PRODUCTS.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / limit);
    const startIndex = (page - 1) * limit;
    const products = filteredProducts.slice(startIndex, startIndex + limit);

    return {
        products,
        totalProducts,
        totalPages,
        currentPage: page,
    };
}
