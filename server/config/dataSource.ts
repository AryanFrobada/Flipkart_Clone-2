// server/dbConfig/dataSource.ts
import { DataSource } from 'typeorm';
import { User } from '../models/User'; 
import { Cart } from '../models/Cart';
import { CartItem } from '../models/CartItem';

let dataSource: DataSource;

export const connect = async () => {
  if (dataSource) {
    return;
  }

  dataSource = new DataSource({
    type: 'sqlite',
    database: './database.sqlite', // Ensure the path is correct
    entities: [User, Cart, CartItem],
    // entities: [User],
    synchronize: true, // Be careful with this in production; it auto-updates the schema
    logging: true,     // Enable this for debugging, disable in production
  });

  await dataSource.initialize();
};

export const getDataSource = () => {
  if (!dataSource) {
    throw new Error('DataSource not initialized. Call connect() first.');
  }
  return dataSource;
};
