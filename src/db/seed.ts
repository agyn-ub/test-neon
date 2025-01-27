import { db } from './index';
import { products } from './schema';
import { sql } from 'drizzle-orm';
import * as dotenv from 'dotenv';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

// Load environment variables from .env file
dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create a new pool with SSL config
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Create a new db instance
const database = drizzle(pool);

async function seed() {
  try {
    // Insert new data
    await database.insert(products).values([
      {
        name: 'Laptop',
        description: 'High-performance laptop for professionals',
        price: sql`999.99`,
        stock: 10,
      },
      {
        name: 'Smartphone',
        description: 'Latest model with advanced features',
        price: sql`699.99`,
        stock: 15,
      },
      {
        name: 'Headphones',
        description: 'Wireless noise-canceling headphones',
        price: sql`199.99`,
        stock: 20,
      },
    ]);
    
    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await pool.end(); // Close the connection pool
  }
}

seed(); 