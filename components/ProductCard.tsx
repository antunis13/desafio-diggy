"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  image: string;
  quantity?: number;
}

interface ProductCardProps extends Product {
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

export default function ProductCard({
  id,
  name,
  image,
  description,
  priceCents,
  quantity,
  isHomePage = true,
  onAdd,
  onDelete,
}: ProductCardProps) {
  const [counter, setCounter] = useState<number>(1);
  const [opeDialog, setOpenDialog] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<string>(
    ((priceCents / 100) * 1).toFixed(2)
  );

  const price = (priceCents / 100).toFixed(2);

  return (
    <Card className="w-full max-w-md mt-4">
      <CardHeader>
        <p className="hidden"> {id}</p>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover border rounded-md"
        />
        <CardDescription className="mt-4 mb-2">{description}</CardDescription>
        <p>R$ {price}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        {isHomePage ? (
          <Dialog open={opeDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button
                className="cursor-pointer bg-secondary hover:bg-[#8d57bd]"
                onClick={() => setOpenDialog(true)}
              >
                Adicionar
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle className="hidden" />
                Quantos items deseja adicionar ?
              </DialogHeader>
              <div className="flex justify-center items-center gap-4 py-4">
                <Button
                  className="cursor-pointer bg-slate-400 hover:bg-slate-500"
                  onClick={() => {
                    if (counter > 1) {
                      const newCounter = counter - 1;
                      setCounter(newCounter);
                      setTotalPrice(
                        ((priceCents / 100) * newCounter).toFixed(2)
                      );
                    }
                  }}
                >
                  -
                </Button>
                <span className="text-lg font-semibold min-w-[2rem] text-center">
                  {counter}
                </span>
                <Button
                  className="cursor-pointer bg-slate-400 hover:bg-slate-500"
                  onClick={() => {
                    const newCounter = counter + 1;
                    setCounter(newCounter);
                    setTotalPrice(((priceCents / 100) * newCounter).toFixed(2));
                  }}
                >
                  +
                </Button>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    className="cursor-pointer"
                    type="button"
                    variant="outline"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  className="cursor-pointer bg-secondary hover:bg-[#8d57bd]"
                  onClick={() => {
                    onAdd?.(id, name, image, description, priceCents, counter);
                    setCounter(1);
                    setTotalPrice(((priceCents / 100) * 1).toFixed(2));
                    setOpenDialog(false);
                    toast.success("Adicionado ao carrinho");
                  }}
                >
                  Adicionar ao carrinho - R$ {totalPrice}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <div>
            <span className="flex mb-4">Quantidade: {quantity}</span>
            <Button
              className="cursor-pointer bg-secondary hover:bg-[#8d57bd]"
              onClick={() => onDelete?.(id)}
            >
              Remover item
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
