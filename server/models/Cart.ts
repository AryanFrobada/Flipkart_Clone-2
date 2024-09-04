import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './User';
import { CartItem } from './CartItem'; // Make sure the import path is correct

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.carts)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany(() => CartItem, cartItem => cartItem.cart, { cascade: true })
  items?: CartItem[];
}
