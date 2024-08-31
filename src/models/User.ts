// src/models/User.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
  verifyTokenExpiry!: Date;
}
