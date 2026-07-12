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
