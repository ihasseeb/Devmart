export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  image?: string;
  rating?: number; // backend mein abhi nahi hai, isliye optional — future feature ke liye
  createdAt: string;
  updatedAt: string;
}
