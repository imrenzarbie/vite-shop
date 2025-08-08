import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddToCartButton } from "./add-to-cart-button";
import { Product } from "../../components/product-card";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-3"
                />
                <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col justify-between">
                <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-3">
                        {product.description}
                    </p>
                    <p className="text-xl font-bold text-green-600">
                        \( \${product.price.toFixed(2)} \)
                    </p>
                </div>

                <AddToCartButton product={product} />
            </CardContent>
        </Card>
    );
}
