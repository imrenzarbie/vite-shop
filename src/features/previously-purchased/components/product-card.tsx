import { ProductType } from "../types/product.type";



type ProductCardProps = {
    product: ProductType;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                            {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            {product.category}
                        </p>
                    </div>
                    <span className="text-lg font-bold text-primary">
                        {product.currency} {product.price.toFixed(2)}
                    </span>
                </div>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {product.description}
                </p>
                <div className="mt-3 flex items-center">
                    <div className="flex text-amber-400">
                        {"★".repeat(Math.floor(product.rating))}
                        {"☆".repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">
                        ({product.rating.toFixed(1)})
                    </span>
                </div>
                <div className="mt-3 text-xs text-gray-500">
                    Purchased:{" "}
                    {new Date(product.purchasedAt).toLocaleDateString()}
                </div>
                <div className="mt-4 flex gap-2">
                    <button className="flex-1 bg-primary text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                        Buy Again
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
