import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@imrenzarbie/component-library";
import { Label } from "@radix-ui/react-label";
import { Product } from "./types/product.type";
import { Badge } from "@/components/ui/badge";

const ProductCard = ({
    product,
    quantity,
    onQuantityChange,
}: {
    product: Product;
    quantity: number;
    onQuantityChange: (quantity: number) => void;
}) => {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-square overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <CardHeader className="pt-4 pb-2">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription>{product.category}</CardDescription>
            </CardHeader>

            <CardContent className="pb-2">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-semibold">
                        ${product.price.toFixed(2)}
                    </span>
                    <Badge variant="secondary">{product.category}</Badge>
                </div>

                <div className="flex items-center space-x-2">
                    <Label htmlFor={`qty-${product.id}`} className="sr-only">
                        Quantity
                    </Label>
                    <Input
                        id={`qty-${product.id}`}
                        type="number"
                        min="1"
                        max="10"
                        value={quantity}
                        onChange={(e) =>
                            onQuantityChange(parseInt(e.target.value) || 1)
                        }
                        className="w-20"
                    />
                    <span className="text-sm text-gray-500">items</span>
                </div>
            </CardContent>

            <CardFooter className="pt-0">
                <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() =>
                        console.log(
                            `Added ${quantity} of ${product.name} to cart`
                        )
                    }>
                    Buy Again - ${(product.price * quantity).toFixed(2)}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
