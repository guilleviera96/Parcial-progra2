import dotenv from 'dotenv';
import { defineConfig } from '@prisma/client'
dotenv.config();

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
    provider: 'mysql',
  },
})