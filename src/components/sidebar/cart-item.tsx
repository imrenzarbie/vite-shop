import { CartItem } from "./types/cart-item.type";

const CartItemComponent = ({ item }: { item: CartItem }) => {
    return (
        <li key={item.id} className="flex items-center justify-between">
            <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                </p>
            </div>
            <p className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
            </p>
        </li>
    );
};

export default CartItemComponent;
