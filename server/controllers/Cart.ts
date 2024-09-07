import { Request, Response } from 'express';
import { getDataSource } from '../config/dataSource';
import { Cart } from '../models/Cart';
import { CartItem } from '../models/CartItem';
import { User } from '../models/User';

// Function to get or create a cart for a user
export const getCartByUserId = async (req: Request, res: Response) => {
  const dataSource = getDataSource();
  const cartRepository = dataSource.getRepository(Cart);
  const userRepository = dataSource.getRepository(User);
  try{
    const {userId} = req.body;
    const user = await userRepository.findOneBy({ id: userId });

    // Ensure the User Exists
    if(!user){
      return res.status(400).json({
        success: false,
        message: "Cannot find User or Fetch User Details !!",
      });
    }

    // Find or create a cart for the user
    let cart = await cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items'],
    });

    if (!cart) {
      cart = new Cart();
      cart.user = user;
      cart.items = [];
      await cartRepository.save(cart);
    }

    return res.status(200).json({
      success: true,
      message: "Cart of User Fetched Successfully",
      data: cart,
    });
  } catch(err){
    console.log("Internal Server Error while fetching Cart of User !!", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error while fetching Cart of User !!",
    });
  }
};

// Function to add an item to a user's cart
export const addToCart = async (req: Request, res: Response) => {
  const dataSource = getDataSource();
  const cartRepository = dataSource.getRepository(Cart);
  const cartItemRepository = dataSource.getRepository(CartItem);
  const userRepository = dataSource.getRepository(User);

  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'User ID, Product ID, and Quantity are required',
      });
    }

    const parsedQuantity = parseInt(quantity, 10); // Parse quantity to an integer

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be a valid positive number',
      });
    }

    const user = await userRepository.findOneBy({ id: userId });

    // Ensure the User Exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `Cannot find user with ID ${userId}`,
      });
    }

    // Find or create a cart for the user
    let cart = await cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items'],
    });

    if (!cart) {
      cart = new Cart();
      cart.user = user;
      cart.items = [];
      await cartRepository.save(cart);
    }

    // Check if the item already exists in the cart
    let cartItem = await cartItemRepository.findOne({
      where: { cart: { id: cart.id }, productId: productId },
    });

    if (cartItem) {
      // Update quantity if item already exists
      cartItem.quantity += parsedQuantity;
      await cartItemRepository.save(cartItem);
    } else {
      // Create a new cart item
      cartItem = new CartItem();
      cartItem.cart = cart;
      cartItem.productId = productId;
      cartItem.quantity = parsedQuantity;
      await cartItemRepository.save(cartItem);
    }

    return res.status(200).json({
      success: true,
      message: 'Item added to cart successfully',
      data: cart, // Return the updated cart details under 'data'
    });
  } catch (err) {
    console.error('Internal Server Error while adding item to cart:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error while adding item to cart',
    });
  }
};



export const removeItemFromCart = async (req: Request, res: Response) => {
  const dataSource = getDataSource();
  const cartRepository = dataSource.getRepository(Cart);
  const cartItemRepository = dataSource.getRepository(CartItem);
  const userRepository = dataSource.getRepository(User);

  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: 'User ID and Product ID are required',
      });
    }

    const user = await userRepository.findOneBy({ id: userId });

    // Ensure the User Exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `Cannot find user with ID ${userId}`,
      });
    }

    // Find the cart for the user
    const cart = await cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items'],
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found for the user',
      });
    }

    // Find the cart item to remove
    const cartItem = await cartItemRepository.findOne({
      where: { cart: { id: cart.id }, productId: productId },
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: `Product ID ${productId} not found in the cart`,
      });
    }

    // Remove the cart item
    await cartItemRepository.remove(cartItem);

    return res.status(200).json({
      success: true,
      message: 'Item removed from cart successfully',
      data: cart, // Return the updated cart details under 'data'
    });
  } catch (err) {
    console.error('Internal Server Error while removing item from cart:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error while removing item from cart',
    });
  }
};



export const updateItemQuantity = async (req: Request, res: Response) => {
  const dataSource = getDataSource();
  const cartRepository = dataSource.getRepository(Cart);
  const cartItemRepository = dataSource.getRepository(CartItem);

  try {
    const { userId, productId, quantity } = req.body;

    // Ensure the quantity is a positive number
    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1.',
      });
    }

    // Find the user's cart
    const cart = await cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items'],
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for the user.",
      });
    }

    // Find the cart item to update
    const cartItem = await cartItemRepository.findOne({
      where: { cart: { id: cart.id }, productId },
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart.",
      });
    }

    // Update the quantity
    cartItem.quantity = quantity;
    await cartItemRepository.save(cartItem);

    return res.status(200).json({
      success: true,
      message: "Cart item quantity updated successfully.",
      data: cartItem,
    });
  } catch (err) {
    console.error("Error updating item quantity in cart:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating cart item quantity.",
    });
  }
};



export const clearCart = async (req: Request, res: Response) => {
  const dataSource = getDataSource();
  const cartRepository = dataSource.getRepository(Cart);
  const cartItemRepository = dataSource.getRepository(CartItem);

  try {
    const { userId } = req.body;

    // Find the user's cart
    const cart = await cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items'],
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for the user.",
      });
    }

    // Clear the cart items
    await cartItemRepository.delete({ cart: { id: cart.id } });

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully.",
    });
  } catch (err) {
    console.error("Error clearing cart:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error while clearing cart.",
    });
  }
};



// Function to handle cart checkout (simple version)
export const checkoutCart = async (req: Request, res: Response) => {
  const dataSource = getDataSource();
  const cartRepository = dataSource.getRepository(Cart);
  const cartItemRepository = dataSource.getRepository(CartItem);

  try {
    const { userId } = req.body;

    // Find the user's cart
    const cart = await cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items'],
    });

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot checkout an empty cart.",
      });
    }

    // Placeholder for payment processing
    // Add your payment gateway integration here (e.g., Stripe, PayPal)

    // Simulate successful checkout by clearing the cart
    await cartItemRepository.delete({ cart: { id: cart.id } });

    return res.status(200).json({
      success: true,
      message: "Checkout successful. Cart has been cleared.",
    });
  } catch (err) {
    console.error("Error during cart checkout:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error during checkout.",
    });
  }
};