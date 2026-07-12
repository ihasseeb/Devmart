import dotenv from 'dotenv';
dotenv.config();

import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/client';

const dbUrl = new URL(process.env.DATABASE_URL as string);

const adapter = new PrismaMariaDb({
    host: dbUrl.hostname,
    port: Number(dbUrl.port),
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.slice(1),
    connectionLimit: 3,
    connectTimeout: 30000,
    ssl: { rejectUnauthorized: false }, // try this
});

export const prisma = new PrismaClient({ adapter });