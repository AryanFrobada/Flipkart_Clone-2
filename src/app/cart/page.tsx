import React from 'react';
import Link from 'next/link';

const CartPage = () => {
  // Placeholder data simulating the cart
  const cartItems = [
    {
      id: 1,
      productName: "Product 1",
      productImage: "https://via.placeholder.com/150",
      price: 500,
      quantity: 2,
    },
    {
      id: 2,
      productName: "Product 2",
      productImage: "https://via.placeholder.com/150",
      price: 1000,
      quantity: 1,
    },
  ];

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <h2 className="text-4xl font-bold mb-6">My Cart ({cartItems.length} Items)</h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Cart Items */}
          <div className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow-lg">
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <div key={item.id} className="flex items-center border-b border-gray-200 py-6">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="ml-6 flex-1">
                    <h4 className="text-lg font-semibold text-gray-800">{item.productName}</h4>
                    <p className="text-gray-500">Price: ₹{item.price}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-gray-600">Qty:</span>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        className="ml-2 border rounded w-16 p-1 focus:outline-none focus:ring focus:border-blue-300"
                        // On change handler for updating quantity
                      />
                    </div>
                  </div>
                  <button className="text-red-500 hover:text-red-700 ml-auto text-sm font-medium">
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-lg flex justify-center items-center">Your cart is empty!</p>
            )}
          </div>

          {/* Right: Price Summary */}
          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-xl font-bold mb-4 text-gray-800">Price Details</h4>
            <div className="flex justify-between text-gray-700 py-3 border-b">
              <span>Price ({cartItems.length} items)</span>
              <span>₹{calculateTotalPrice()}</span>
            </div>
            <div className="flex justify-between text-gray-700 py-3 border-b">
              <span>Delivery Charges</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-gray-800 py-4 border-t mt-4">
              <span>Total Amount</span>
              <span>₹{calculateTotalPrice()}</span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg mt-6 text-lg font-medium">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
