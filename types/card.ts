import type { Product } from "./products";

export interface ProductCardProps extends Product {
  quantity?: number;
  isHomePage: boolean;
  onAdd?: (
    id: string,
    name: string,
    img: string,
    desc: string,
    price: number,
    quantity?: number
  ) => void;
  onDelete?: (id: string) => void;
}
