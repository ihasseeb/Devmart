import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { ProductQueryParams } from '../types/product.types';

// @route GET /api/mysql-products?category=Electronics&minPrice=500&maxPrice=2000&search=mouse&sortBy=price_asc&page=1&limit=10
export const getFilteredProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      search,
      sortBy,
      page = '1',
      limit = '10',
    }: ProductQueryParams = req.query;

    // "where" object dynamically banate hain — sirf jo filters aaye hon wahi add honge
    const where: any = {};

    if (category) {
      where.category = category;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    if (search) {
      where.name = { contains: search };
    }

    // Sorting decide karo
    let orderBy: any = { createdAt: 'desc' }; // default: newest first
    if (sortBy === 'price_asc') orderBy = { price: 'asc' };
    if (sortBy === 'price_desc') orderBy = { price: 'desc' };

    // Pagination calculate karo
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limitNum,
      }),
      prisma.product.count({ where }),
    ]);

    res.status(200).json({
      products,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalCount / limitNum),
        totalItems: totalCount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};