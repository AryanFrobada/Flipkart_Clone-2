import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { CartItem } from './CartItem';
import { User } from './User';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number; // Unique identifier for each cart

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items?: CartItem[]; // Relationship to CartItem entities

  @ManyToOne(() => User, (user) => user.carts)
  user!: User; // Relationship to User entity
}
