'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // To get category and id from route
import { fetchProductById } from '../../../../services/operations/productAPI'; // Adjust the import path
import { addToCart } from '../../../../services/operations/cartAPI';
import { useToast } from '../../../../hooks/use-toast';

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

export default function ProductPage() {
  const {toast} = useToast();
  const { category, id } = useParams(); // Get category and product ID from URL
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1); // Quantity state
  const [userId, setUserId] = useState('1'); // Assume you get the user ID from context/auth
  

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await fetchProductById(id.toString());
        setProduct(productData); // Assuming your API returns product details
      } catch (err) {
        console.error('Error fetching product details', err);
      }
    };

    if (id) {
      getProduct();
    }
  }, [id]);


  const handleAddToCart = async () => {
    try {
      if (!userId) {
        alert('You need to log in to add items to the cart.');
        return;
      }

      const response = await addToCart(userId, id.toString(), quantity.toString());

      if (response.success) {
        toast({
          title: "Product added to cart successfully",
        });
      } else {
        toast({
          title: "Failed to add to cart !!",
          description: `${response.message}`,
        });
      }
    } catch (err) {
      console.error('Error adding item to cart:', err);
      alert('There was an issue adding this item to your cart.');
    }
  };

  if (!product) {
    return <div className="flex w-full h-full justify-center items-center">
              <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            </div>
  }

  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Product Image */}
        <div className="w-full md:w-1/2">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-auto rounded-lg border border-gray-200 object-cover"
          />
        </div>
        
        {/* Right Side: Product Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-500 text-lg mb-1">Brand: {product.brand}</p>

            {/* Product Rating */}
            <div className="flex items-center mb-3">
              <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-semibold">
                {product.rating} ★
              </span>
              <span className="text-gray-600 ml-3 text-sm">({product.rating} Ratings)</span>
            </div>

            {/* Price and Discount */}
            <div className="flex items-center mb-4">
              <p className="text-3xl font-bold text-gray-800">
                ${product.price}
              </p>
              <p className="text-lg font-semibold text-green-600 ml-4">
                {product.discountPercentage}% Off
              </p>
            </div>

            {/* Product Description */}
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">Product Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Available Bank Offers */}
            <div className="bg-gray-50 p-4 rounded-lg border mb-4">
              <h2 className="font-semibold text-lg mb-2">Available Bank Offers</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>
                  <span className="font-semibold">Bank Offer</span>: 5% Unlimited Cashback on Flipkart Axis Bank Credit Card <span className="text-blue-500">T&C</span>
                </li>
                <li>
                  <span className="font-semibold">Bank Offer</span>: ₹2000 Off On All Banks Credit and Debit Card Transactions. <span className="text-blue-500">T&C</span>
                </li>
                <li>
                  <span className="font-semibold">Bank Offer</span>: ₹2000 Off On HDFC Bank Debit Card Transactions. <span className="text-blue-500">T&C</span>
                </li>
                <li>
                  <span className="font-semibold">Special Price</span>: Get extra ₹5500 off (price inclusive of cashback/coupon)
                </li>
              </ul>
            </div>
          </div>

          {/* Buttons: Add to Cart and Buy Now */}
          <div className="flex gap-4 mt-5 ml-10 justify-start">
            <button onClick={handleAddToCart} className="bg-yellow-500 text-white text-lg px-7 py-2.5 rounded-lg font-semibold hover:bg-yellow-600 transition">
              Add to Cart
            </button>
            <button className="bg-orange-500 text-white text-lg px-7 py-2.5 rounded-lg font-semibold hover:bg-orange-600 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
