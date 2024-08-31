import { DataSource } from 'typeorm';
import { User } from '@/models/User';

// Create a singleton instance for DataSource
let dataSource: DataSource;

export const connect = async () => {
  if (dataSource) {
    // If dataSource is already initialized, do not reinitialize
    return;
  }

  dataSource = new DataSource({
    type: 'sqlite',
    database: './database.sqlite', // Path to your SQLite database file
    entities: [User],
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
