import ScrollAreaHorizontal from "./ScrollHorizontal";

import { ToolbarProps } from "@/types/toollbar";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Search, X } from "lucide-react";

export default function Toolbar({
  categoryButtons,
  onCategorySelect,
  onClearFilters,
  inputName,
  onInputChange,
  onSearch,
}: ToolbarProps) {
  return (
    <div
      className="fixed top-14 left-1/2 -translate-x-1/2
            flex justify-center items-center
            p-1 bg-white border rounded-lg shadow-lg"
    >
      <ScrollAreaHorizontal
        categorias={categoryButtons}
        onSearch={onCategorySelect}
      />

      <Button
        className="m-4 cursor-pointer"
        variant="ghost"
        onClick={onClearFilters}
      >
        <X />
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="border rounded-lg p-2 ml-2 mr-4 bg-slate-400 hover:bg-slate-500 cursor-pointer">
            <Search />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle hidden />
          <DialogHeader>Busca por nome</DialogHeader>

          <Input
            type="text"
            placeholder="Smoothie Sumer Vibes"
            value={inputName}
            onChange={(e) => onInputChange(e.target.value)}
          />

          <DialogClose asChild>
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={onSearch}
            >
              Pesquisar
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
