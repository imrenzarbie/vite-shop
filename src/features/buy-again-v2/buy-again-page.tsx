import { Button } from "@imrenzarbie/component-library";
import { Label } from "@radix-ui/react-label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@radix-ui/react-select";
import { useState } from "react";
import { Product } from "./types/product.type";
import ProductCard from "./product-card";

const BuyAgainPageV2 = () => {
    // Sample data - in real app this would come from API
    const [products] = useState<Product[]>([
        {
            id: "p1",
            name: "Wireless Bluetooth Headphones",
            price: 89.99,
            image: "/images/headphones.jpg",
            quantity: 1,
            category: "Electronics",
        },
        {
            id: "p2",
            name: "Organic Cotton T-Shirt",
            price: 24.99,
            image: "/images/tshirt.jpg",
            quantity: 2,
            category: "Clothing",
        },
        {
            id: "p3",
            name: "Stainless Steel Water Bottle",
            price: 19.99,
            image: "/images/bottle.jpg",
            quantity: 1,
            category: "Home & Kitchen",
        },
    ]);

    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const handleQuantityChange = (productId: string, newQuantity: number) => {
        setQuantities((prev) => ({
            ...prev,
            [productId]: newQuantity,
        }));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Buy Again</h1>
                <p className="text-gray-600 mt-2">
                    Quickly reorder your favorite products
                </p>

                {/* Filter Options */}
                <div className="flex flex-wrap gap-4 mt-6">
                    <div className="w-full md:w-64">
                        <Label htmlFor="category">Filter by Category</Label>
                        <Select defaultValue="all">
                            <SelectTrigger id="category">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Categories
                                </SelectItem>
                                <SelectItem value="electronics">
                                    Electronics
                                </SelectItem>
                                <SelectItem value="clothing">
                                    Clothing
                                </SelectItem>
                                <SelectItem value="home">
                                    Home & Kitchen
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-full md:w-64">
                        <Label htmlFor="sort">Sort By</Label>
                        <Select defaultValue="recent">
                            <SelectTrigger id="sort">
                                <SelectValue placeholder="Recently Purchased" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="recent">
                                    Recently Purchased
                                </SelectItem>
                                <SelectItem value="price-low">
                                    Price: Low to High
                                </SelectItem>
                                <SelectItem value="price-high">
                                    Price: High to Low
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        quantity={quantities[product.id] || product.quantity}
                        onQuantityChange={(newQty) =>
                            handleQuantityChange(product.id, newQty)
                        }
                    />
                ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end space-x-4">
                <Button variant="outline" size="lg">
                    Clear Selection
                </Button>
                <Button size="lg">
                    Add Selected to Cart (
                    {Object.values(quantities).reduce((a, b) => a + b, 0)})
                </Button>
            </div>
        </div>
    );
};

export default BuyAgainPageV2;
