export interface CreateProductDTO {
    name: string;
    price: number;
    description: string;
    category: string;
    stock: number;
    image?: string;
}

export interface UpdateProductDTO {
    name?: string;
    price?: number;
    description?: string;
    category?: string;
    stock?: number;
    image?: string;
}

export interface ProductQueryParams {
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
    sortBy?: 'price_asc' | 'price_desc' | 'newest';
    page?: string;
    limit?: string;
}