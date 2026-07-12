// test-connection.ts
import dotenv from 'dotenv';
dotenv.config();

import { prisma } from './src/config/prisma';

async function test() {
    try {
        const users = await prisma.user.findMany();
        console.log('✅ Connected! Users:', users);
    } catch (error) {
        console.error('❌ Failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

test();