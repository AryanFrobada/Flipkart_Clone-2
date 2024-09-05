'use client';

import { useEffect, useState } from "react";
import { fetchProductsOfCategories } from "../../../services/operations/productAPI";

export default function CategoryPage() {
    const [products, setProducts] = useState<any[]>([]);

    const path = window.location.pathname; // "/category/smartphones"
    const segments = path.split('/');
    const categoryname = segments[segments.length - 1]; // Extract category name
    console.log("CategoryName: ", categoryname);

    useEffect(() => {
        const getProductsByCategory = async () => {
            try {
                if (categoryname) { // Check if categoryname is available
                    const productData = await fetchProductsOfCategories(categoryname.toString());

                    if (Array.isArray(productData)) {
                        // Get the top 4 products
                        setProducts(productData);
                    } else {
                        console.error("Unexpected response format", productData);
                    }
                }
            } catch (err) {
                console.error("Error fetching products by category", err);
            }
        };

        getProductsByCategory();
    }, [categoryname]);

    return (
        <div className="my-12 px-8 bg-gray-100 py-3 w-[95vw] max-w-screen-xl mx-auto">
            <h2 className="text-xl font-bold mb-6">Best Deals on {categoryname}</h2>
            <div className="space-y-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="flex bg-white cursor-pointer shadow-lg rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        {/* Image Section */}
                        <div className="p-4 h-56 w-auto flex-shrink-0">
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                style={{ objectFit: 'cover' }}
                                className="w-full h-full rounded-lg"
                            />
                        </div>

                        {/* Title, Brand, and Description Section */}
                        <div className="w-1/3 p-4">
                            <h3 className="text-xl font-semibold mb-1">{product.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                            <p className="text-sm text-gray-700">{product.description}</p>
                        </div>

                        {/* Rating, Price, and Additional Details Section */}
                        <div className="w-1/3 p-4 flex flex-col gap-y-5">
                            <div className="text-lg font-bold text-gray-700">
                                {product.rating} ⭐
                            </div>
                            <div className="flex flex-col mb-4">
                                <p className="text-lg font-bold text-gray-700 mb-1">$ {product.price}</p>
                                <p className="text-sm text-red-500 mb-1">{product.discountPercentage}% off</p>
                                <p className="text-sm text-gray-500 mb-1">Free Delivery</p>
                                <p className="text-sm text-gray-500">Save Extra with Combo Offers</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
