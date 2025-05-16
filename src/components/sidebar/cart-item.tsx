import { CartItem } from "./types/cart-item.type";
import { useState } from "react";

interface CartItemComponentProps {
    item: CartItem;
    onQuantityChange: (itemId: string, newQuantity: number) => void;
}

const CartItemComponent = ({
    item,
    onQuantityChange,
}: CartItemComponentProps) => {
    const [quantity, setQuantity] = useState(item.quantity);

    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange(item.id, newQuantity);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onQuantityChange(item.id, newQuantity);
        }
    };

    return (
        <li key={item.id} className="flex items-center justify-between">
            <div>
                <p className="font-medium">{item.name}</p>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleDecrement}
                        className="px-2 py-1 bg-gray-200 rounded-md">
                        -
                    </button>
                    <span>{quantity}</span>
                    <button
                        onClick={handleIncrement}
                        className="px-2 py-1 bg-gray-200 rounded-md">
                        +
                    </button>
                </div>
            </div>
            <p className="font-medium">${(item.price * quantity).toFixed(2)}</p>
        </li>
    );
};

export default CartItemComponent;
