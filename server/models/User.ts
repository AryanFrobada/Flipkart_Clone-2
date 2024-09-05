// server/models/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cart } from './Cart';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string; // Store hashed passwords, not plain text

  @Column({ default: false })
  isVerified?: boolean; // New field with default value

  @Column({ nullable: true })
  verifyToken?: string;

  @Column({ type: 'datetime', nullable: true })
  verifyTokenExpiry?: Date; // Make optional if it can be null

  @OneToMany(() => Cart, (cart) => cart.user)
  carts?: Cart[]; // Relationship to Cart entities
}
