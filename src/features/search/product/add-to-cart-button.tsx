import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash } from "lucide-react";
import { useCartActions } from "../cart/use-cart-actions";
import { useCartQuantities } from "../cart/use-cart-quantities";
import { Product } from "../types/type";

interface AddToCartButtonProps {
    product: Product;
    variant?: "default" | "compact";
}

const stringToNumber = (
    value: any | null | undefined,
    options?: { min?: number; max?: number }
) => {
    let strValue: string;
    if (value === null || value === undefined) {
        strValue = "";
    } else {
        strValue = String(value);
    }

    const cleaned = strValue.replace(/[^0-9-]/g, "");

    if (cleaned === "") {
        return 0;
    }

    let finalStr = cleaned;
    if (cleaned.startsWith("-")) {
        finalStr = `-${cleaned.slice(1).replace(/-/g, "")}`;
    } else {
        finalStr = cleaned.replace(/-/g, "");
    }

    if (finalStr === "-") {
        return 0;
    }

    let result = parseInt(finalStr, 10);

    if (!isFinite(result)) {
        return 0;
    }

    if (options?.min !== undefined) {
        result = Math.max(options.min, result);
    }
    if (options?.max !== undefined) {
        result = Math.min(options.max, result);
    }

    return result;
};

const AddToCartButton = ({
    product,
    variant = "default",
}: AddToCartButtonProps) => {
    const { getQuantity, isInCart } = useCartQuantities();
    const { addToCart, updateQuantityImmediate, removeFromCart } =
        useCartActions();

    const currentQuantity = getQuantity(product.id);
    const [inputValue, setInputValue] = useState(currentQuantity.toString());

    // Sync input value with cart quantity when it changes
    useEffect(() => {
        setInputValue(currentQuantity.toString());
    }, [currentQuantity]);

    const handleAddToCart = (newQty: number) => {
        if (newQty > 0) {
            addToCart({
                productId: product.id,
                product,
                quantity: newQty,
            });
        }
    };

    const handleIncrement = () => {
        const newQuantity = currentQuantity + 1;
        updateQuantityImmediate({
            productId: product.id,
            quantity: newQuantity,
        });
    };

    const handleDecrement = () => {
        const newQuantity = Math.max(0, currentQuantity - 1);
        if (newQuantity === 0) {
            removeFromCart(product.id);
        } else {
            updateQuantityImmediate({
                productId: product.id,
                quantity: newQuantity,
            });
        }
    };

    const handleInputChange = (value: string) => {
        // Only update the input field, don't trigger API calls
        if (/^\d*$/.test(value)) {
            setInputValue(value);
        }
    };

    // Handle blur or enter key to commit the change
    const handleInputCommit = () => {
        const newQuantity = stringToNumber(inputValue, { min: 0 });
        if (newQuantity !== currentQuantity) {
            if (newQuantity === 0) {
                removeFromCart(product.id);
            } else {
                updateQuantityImmediate({
                    productId: product.id,
                    quantity: newQuantity,
                });
            }
        }
    };

    if (!isInCart(product.id)) {
        return (
            <Button
                onClick={() => handleAddToCart(1)}
                className={
                    variant === "compact" ? "h-8 px-3 text-sm" : "w-full"
                }
                size={variant === "compact" ? "sm" : "default"}>
                Add to Cart
            </Button>
        );
    }

    const buttonSize = variant === "compact" ? "sm" : "sm";
    const inputWidth = variant === "compact" ? "w-12" : "w-16";

    return (
        <div className="flex items-center gap-1">
            <Button
                variant="outline"
                size={buttonSize}
                onClick={handleDecrement}>
                {currentQuantity === 1 ? (
                    <Trash className="h-3 w-3" />
                ) : (
                    <Minus className="h-3 w-3" />
                )}
            </Button>

            <Input
                type="text"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                onBlur={handleInputCommit}
                onKeyDown={(e) => e.key === "Enter" && handleInputCommit()}
                className={`${inputWidth} text-center h-8`}
            />

            <Button
                variant="outline"
                size={buttonSize}
                onClick={handleIncrement}>
                <Plus className="h-3 w-3" />
            </Button>
        </div>
    );
};

export default AddToCartButton;
