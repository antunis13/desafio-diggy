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
    <ScrollArea className="w-96 h-[60px] rounded-md border whitespace-nowrap">
      <div className="flex gap-2 p-4">
        {categorias.map((categoria, index) => (
          <Button
            className="w-40"
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
