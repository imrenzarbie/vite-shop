import { Button } from "../ui/button";

const CartSummary = ({ totalAmount }: { totalAmount: number }) => {
    return (
        <div className="mt-6 border-t pt-6">
            <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
            </div>
            <Button type="submit" className="mt-4 w-full">
                Checkout
            </Button>
        </div>
    );
};

export default CartSummary;
