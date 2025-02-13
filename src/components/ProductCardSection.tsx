'use client';
import { useEffect, useState } from "react";
import { fetchProductsOfCategories } from "../services/operations/productAPI";
import { useRouter } from "next/navigation";

// Define TypeScript type for products if using TypeScript
interface ProductCardSectionProps {
  category: string;
}

export default function Section({category}: ProductCardSectionProps) {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const getProductsByCategory = async () => {
      setLoading(true);
      try {
        const productData = await fetchProductsOfCategories(category);
        // const res = productData.data;

        if (Array.isArray(productData)) {
            const filteredProducts = productData.slice(0,4);
            setProducts(filteredProducts);
        } else {
          console.error("Unexpected response format", productData);
        }
      } catch (err) {
        console.error("Error Fetching categories of product", err);
      }
      setLoading(false);
    };
    getProductsByCategory();
  }, []);

  return (
    <div className="my-12 px-8 bg-white py-3 w-[95vw] max-w-screen-xl mx-auto">
      {/* Section Heading */}
      <h2 className="text-xl font-bold mb-6">{`Best Deals on ${category}...`}</h2>
      {/* Product Cards */}
      {
        loading ? 
        (
          <div className="flex w-full justify-center items-center">
            <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : 
        (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {products.map((product, index) => (
              <div
                onClick={() => {
                  const cleanCategory = product.category.replace(/[{}]/g, ""); // Removes { and } if present
                  router.push(`/category/${cleanCategory}`);
                }}
                key={index} // Use a unique identifier for the key
                className="bg-white shadow-lg cursor-pointer rounded-lg border border-gray-200 p-1 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-full h-auto">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{product.title}</h3>
                  <p className="text-lg font-bold text-gray-700">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}
