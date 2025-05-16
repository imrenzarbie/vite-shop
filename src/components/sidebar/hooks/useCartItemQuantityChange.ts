const useCartItemQuantityChange = () => {
    const handleCartItemQuantityChange = (
        prodNum: string,
        quantity: number
    ) => {
        console.log(`prodNum : `, prodNum);
        console.log("quantity: ", quantity);
    };

    return { handleCartItemQuantityChange };
};

export default useCartItemQuantityChange;
