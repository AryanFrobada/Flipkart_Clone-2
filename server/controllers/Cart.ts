import { Request, Response } from 'express';
import { getDataSource } from '../config/dataSource';
import { Cart } from '../models/Cart';
import { CartItem } from '../models/CartItem';
import { Product } from '../models/Product';
import { User } from '../models/User';

export const addItemToCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body;

    const dataSource = getDataSource();
    const cartRepository = dataSource.getRepository(Cart);
    const cartItemRepository = dataSource.getRepository(CartItem);
    const productRepository = dataSource.getRepository(Product);
    const userRepository = dataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let cart = await cartRepository.findOne({ where: { user: user } });
    if (!cart) {
      cart = new Cart();
      cart.user = user;
      await cartRepository.save(cart);
    }

    const product = await productRepository.findOneBy({ id: productId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingCartItem = await cartItemRepository.findOne({ where: { cart: cart, product: product } });
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await cartItemRepository.save(existingCartItem);
    } else {
      const cartItem = new CartItem();
      cartItem.cart = cart;
      cartItem.product = product;
      cartItem.quantity = quantity;
      await cartItemRepository.save(cartItem);
    }

    res.status(201).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};