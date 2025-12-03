import type { Product } from "./products";

export interface ProductCart extends Product {
  price: number;
  quantity: number;
}

export interface CartItem {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
}
