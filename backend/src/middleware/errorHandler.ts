import { Request, Response, NextFunction } from 'express';

// 404 handler — jab koi route hi match na ho
export const notFound = (req: Request, res: Response, next: NextFunction): void => {
    res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

// Global error handler — koi bhi unexpected error yahan catch hoga
export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong on the server',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
};