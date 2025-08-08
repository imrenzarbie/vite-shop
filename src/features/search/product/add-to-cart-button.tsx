import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useCartActions } from "../cart/use-cart-actions";
import { useCartQuantities } from "../cart/use-cart-quantities";
import { Product } from "../types/type";

interface AddToCartButtonProps {
    product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const { getQuantity, isInCart } = useCartQuantities();
    const { addToCart, updateQuantity, isAddingToCart, isUpdatingQuantity } =
        useCartActions();

    const currentQuantity = getQuantity(product.id);
    const [inputValue, setInputValue] = useState(currentQuantity.toString());

    // Debounce timer
    useEffect(() => {
        const timer = setTimeout(() => {
            const newQuantity = parseInt(inputValue) || 0;
            if (newQuantity !== currentQuantity && isInCart(product.id)) {
                if (newQuantity <= 0) {
                    updateQuantity({ productId: product.id, quantity: 0 });
                } else {
                    updateQuantity({
                        productId: product.id,
                        quantity: newQuantity,
                    });
                }
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [inputValue, currentQuantity, product.id, updateQuantity, isInCart]);

    // Sync input with actual cart quantity
    useEffect(() => {
        setInputValue(currentQuantity.toString());
    }, [currentQuantity]);

    function handleAddToCart() {
        addToCart({
            productId: product.id,
            product,
            quantity: 1,
        });
    }

    function handleIncrement() {
        const newQuantity = currentQuantity + 1;
        setInputValue(newQuantity.toString());
    }

    function handleDecrement() {
        const newQuantity = Math.max(0, currentQuantity - 1);
        setInputValue(newQuantity.toString());
    }

    function handleInputChange(value: string) {
        // Only allow positive integers
        if (/^\d*$/.test(value)) {
            setInputValue(value);
        }
    }

    if (!isInCart(product.id)) {
        return (
            <Button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full">
                {isAddingToCart ? "Adding..." : "Add to Cart"}
            </Button>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="sm"
                onClick={handleDecrement}
                disabled={isUpdatingQuantity}>
                <Minus className="h-4 w-4" />
            </Button>

            <Input
                type="text"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                className="w-16 text-center"
                disabled={isUpdatingQuantity}
            />

            <Button
                variant="outline"
                size="sm"
                onClick={handleIncrement}
                disabled={isUpdatingQuantity}>
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );
}
