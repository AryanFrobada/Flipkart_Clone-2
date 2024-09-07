'use client';
import React, { useEffect, useState } from 'react';
import { getCartByUserId, removeFromCart, updateItemQuantity, checkoutCart } from '../../services/operations/cartAPI';
import { fetchProductById } from '../../services/operations/productAPI';
import { useToast } from '../../hooks/use-toast';

const CartPage = () => {
  const {toast} = useToast();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const cartResponse = await getCartByUserId();

        const detailedCartItems = await Promise.all(
          cartResponse.data.items.map(async (cartItem) => {
            const productDetails = await fetchProductById(cartItem.productId);
            return {
              ...cartItem,
              productDetails,
            };
          })
        );

        setCartItems(detailedCartItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart and product details:', error);
        setLoading(false);
      }
    };

    fetchCartDetails();
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.productDetails.price * item.quantity;
    }, 0);
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      await updateItemQuantity("1", productId, newQuantity);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        )
      );
      toast({
        title: "Product Quantity Updated Successfully",
      });
    } catch (error) {
      console.error('Error updating item quantity:', error);
      toast({
        title: "Error updating Item Quantity !!",
        description: error,
      });
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart("1", productId);
      setCartItems(cartItems.filter((item) => item.productId !== productId));
      toast({
        title: "Product Removed From Cart !!",
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast({
        title: "Error Removing Item from Cart !!",
        description: "Please Try Again",
      });
    }
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const response = await checkoutCart("1");
      toast({
        title: "Order placed successfully!",
      });
      // Optionally, you can clear the cart after successful checkout
      setCartItems([]);
    } catch (error) {
      console.error("Error during checkout:", error);
      toast({
        title: "Checkout Failed !!",
        description: "Please Try Again",
      });
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return  <div className="flex h-full w-full justify-center items-center">
              <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            </div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <h2 className="text-4xl font-bold mb-6">My Cart ({cartItems.length} Items)</h2>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow-lg">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center border-b border-gray-200 py-6">
                  <img
                    src={item.productDetails.thumbnail}
                    alt={item.productDetails.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="ml-6 flex-1">
                    <h4 className="text-lg font-semibold text-gray-800">{item.productDetails.title}</h4>
                    <p className="text-gray-500">Price: ${item.productDetails.price}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-gray-600">Qty:</span>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        className="ml-2 border rounded w-16 p-1"
                        onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 ml-auto text-sm font-medium"
                    onClick={() => handleRemoveItem(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-lg flex justify-center items-center">Your cart is empty!</p>
            )}
          </div>

          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-xl font-bold mb-4 text-gray-800">Price Details</h4>
            <div className="flex justify-between text-gray-700 py-3 border-b">
              <span>Price ({cartItems.length} items)</span>
              <span>${calculateTotalPrice()}</span>
            </div>
            <div className="flex justify-between text-gray-700 py-3 border-b">
              <span>Delivery Charges</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-gray-800 py-4 border-t mt-4">
              <span>Total Amount</span>
              <span>${calculateTotalPrice()}</span>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg mt-6 text-lg font-medium"
              onClick={handleCheckout}
              disabled={checkoutLoading}
            >
              {checkoutLoading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
