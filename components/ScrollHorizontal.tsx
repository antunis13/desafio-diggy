import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";

export interface Category {
  categoryName: string;
}

interface ScrollAreaHorizontalProps {
  categorias: Category[];
  onSearch: (categoria: Category) => void;
}

export default function ScrollAreaHorizontalDemo({
  categorias,
  onSearch,
}: ScrollAreaHorizontalProps) {
  return (
    <ScrollArea className="w-50 h-[60px] rounded-md border whitespace-nowrap sm:w-64 md:w-64 lg:w-80 xl:w-96 2xl:w-96">
      <div className="flex w-max space-x-4 pt-2">
        {categorias.map((categoria, index) => (
          <Button
            className="w-40 bg-secondary hover:bg-[#8d57bd]"
            key={index}
            onClick={() => onSearch(categoria)}
          >
            {categoria.categoryName}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
