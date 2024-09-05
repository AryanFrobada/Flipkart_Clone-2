import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Cart } from './Cart';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id!: number; // Unique identifier for the cart item record

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart!: Cart;

  @Column()
  productId!: number; // ID of the product from DummyJSON API

  @Column()
  quantity!: number; // Number of units of the product in the cart
}
