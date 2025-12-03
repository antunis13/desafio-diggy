import { Category } from "./category";

export interface ScrollAreaHorizontalProps {
  categorias: Category[];
  onSearch: (categoria: Category) => void;
}
