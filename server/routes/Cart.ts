// const express = require("express");
// const router = express.Router();

const {
  getCartByUserId,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearCart,
  checkoutCart,
} = require("../controllers/Cart") // Adjust the path based on your project structure


// Get or create a cart for a user
router.get('/', getCartByUserId); // Fetch the cart of the authenticated user (requires userId in req.body)

// Add an item to the user's cart
router.post('/add', addItemToCart); // Adds an item to the cart

// Remove an item from the user's cart
router.delete('/remove', removeItemFromCart); // Removes an item from the cart

// Update the quantity of an item in the cart
router.put('/update', updateItemQuantity); // Updates the quantity of an item in the cart

// Clear all items from the cart
router.delete('/clear', clearCart); // Clears the cart

// Checkout the cart
router.post('/checkout', checkoutCart); // Checks out the cart

module.exports = router;