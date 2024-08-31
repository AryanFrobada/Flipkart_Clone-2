// src/dataSource.ts
import { DataSource } from 'typeorm';
import { User } from '@/models/User'; // Adjust the path as needed

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './database.sqlite', // SQLite database file path
  entities: [User],
  synchronize: true, // Automatically create database schema
  logging: true,
});

// Initialize the data source
export const initializeDataSource = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (error) {
    console.error('Error initializing Data Source:', error);
  }
};
