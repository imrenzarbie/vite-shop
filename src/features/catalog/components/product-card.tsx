import { ShoppingCart } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
    CardFooter,
} from "../../../components/ui/card";
import { useEffect } from "react";

export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
}

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
    useEffect(() => {
        console.log(`product : `, product.id);
    });

    return (
        <Card className="flex h-full flex-col overflow-hidden">
            <CardHeader className="p-0">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="aspect-video w-full object-cover" // Or aspect-[4/3] or other ratios
                />
            </CardHeader>
            <CardContent className="flex-1 p-4 sm:p-6">
                <CardTitle className="mb-1 text-lg">{product.name}</CardTitle>
                <CardDescription className="mb-2 line-clamp-3 text-sm">
                    {product.description}
                </CardDescription>
                <p className="text-xl font-semibold">
                    ${product.price.toFixed(2)}
                </p>
            </CardContent>
            <CardFooter className="p-4 sm:p-6 pt-0">
                <Button className="w-full" onClick={() => onAddToCart(product)}>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
