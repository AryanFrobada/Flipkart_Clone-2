'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { searchProducts } from '../../services/operations/productAPI'; // Adjust the import path

// Define the Product type
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  brand: string;
  images: string[];
  category: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const queryParam = searchParams.get('q');

    if (queryParam) {
      setQuery(queryParam);
      const fetchSearchResults = async () => {
        try {
          setLoading(true);
          const searchResults = await searchProducts(queryParam);
          setProducts(searchResults);
        } catch (err) {
          console.error('Error fetching search results', err);
          setError('An error occurred while fetching search results.');
        } finally {
          setLoading(false);
        }
      };

      fetchSearchResults();
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  return (
    <div className="max-w-7xl mx-auto my-12 px-4 py-8 bg-gray-100 w-[95vw]">
      <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {products.map((product) => (
            <div onClick={() => {
                const cleanCategory = product.category.replace(/[{}]/g, ""); // Clean the category name
                router.push(`/product/${cleanCategory}/${product.id}`); // Redirect to dynamic route
              }} key={product.id} className="bg-white cursor-pointer shadow-lg rounded-lg border border-gray-200 p-4">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-auto h-auto object-cover rounded-lg"
              />
              <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
              <p className="text-gray-600 mt-1">Brand: {product.brand}</p>
              <p className="text-gray-800 font-bold mt-1">${product.price}</p>
              <p className="text-green-600 mt-1">{product.discountPercentage}% Off</p>
            </div>
          ))}
        </div>
      ) : (
        <div>No products found for "{query}"</div>
      )}
    </div>
  );
}
