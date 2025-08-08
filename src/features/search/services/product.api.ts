import { Product } from "../types/type";

const DUMMY_PRODUCTS: Product[] = Array.from({ length: 30 }, (_, i) => ({
    id: `product-${i + 1}`,
    name: `Product ${i + 1}`,
    description: `This is the description for Product ${
        i + 1
    }. It's an amazing product with great features.`,
    price: Math.floor(Math.random() * 100) + 10,
    imageUrl: `https://picsum.photos/200/200?random=${i + 1}`,
}));

const DELAY_MS = 500;

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
