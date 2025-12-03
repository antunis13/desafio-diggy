"use client";

import { useState } from "react";

import ProductCard from "@/components/ProductCard";
import ScrollAreaHorizontal from "@/components/ScrollHorizontal";

import { Category } from "@/types/category";
import { Product } from "@/types/products";
import { CartItem } from "@/types/cart";

import { Search, X } from "lucide-react";

import categorias from "@/data/products.json";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchByName, setSearchByName] = useState<Product[]>([]);
  const [inputName, setInputName] = useState<string>("");

  const categoryButtons = categorias;

  const addProducts = (
    id: string,
    name: string,
    img: string,
    desc: string,
    price: number,
    quantity?: number
  ) => {
    const qty = quantity ?? 1;
    const cartProduct: CartItem = {
      id,
      name,
      image: img,
      description: desc,
      price,
      quantity: qty,
    };

    const stored = localStorage.getItem("cart");
    const cart: CartItem[] = stored ? JSON.parse(stored) : [];

    const existingProduct = cart.find((item) => item.id === id);

    let updatedCart: CartItem[];

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + cartProduct.quantity }
          : item
      );
    } else {
      updatedCart = [...cart, cartProduct];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const searchByCategory = (categoria: Category) => {
    setSelectedCategory(categoria.categoryName);
  };

  function normalize(text: string) {
    return text
      .toLowerCase()
      .normalize("NFD") // separa acentos
      .replace(/[\u0300-\u036f]/g, "") // remove acentos
      .replace(/\s+/g, " ") // troca múltiplos espaços por um só
      .trim();
  }

  return (
    <>
      {searchByName.length > 0 ? (
        <section className="flex flex-col gap-4 place-items-center m-12 p-4">
          <div
            className="fixed top-14 left-1/2 -translate-x-1/2
                  flex justify-center items-center
                  p-1 bg-white border rounded-lg shadow-lg"
          >
            <ScrollAreaHorizontal
              categorias={categoryButtons}
              onSearch={searchByCategory}
            />

            <Button
              className="m-4 cursor-pointer"
              variant="ghost"
              onClick={() => {
                setSelectedCategory(null);
                setSearchByName([]);
              }}
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
                  onChange={(e) => setInputName(e.target.value)}
                />

                <DialogClose asChild>
                  <Button
                    className="cursor-pointer"
                    variant="outline"
                    onClick={() => {
                      const allProducts = categorias.flatMap(
                        (categoria) => categoria.products
                      );
                      const foundProducts = allProducts.filter((product) =>
                        normalize(product.name).includes(normalize(inputName))
                      );

                      setSearchByName(foundProducts);
                    }}
                  >
                    Pesquisar
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>

          {searchByName.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              image={product.image}
              priceCents={product.priceCents}
              isHomePage={true}
              onAdd={addProducts}
            />
          ))}
        </section>
      ) : (
        <section className="flex flex-col gap-4 place-items-center m-12 p-4">
          <div
            className="fixed top-14 left-1/2 -translate-x-1/2
                  flex justify-center items-center
                  p-1 bg-white border rounded-lg shadow-lg"
          >
            <ScrollAreaHorizontal
              categorias={categoryButtons}
              onSearch={searchByCategory}
            />

            <Button
              className="m-4 cursor-pointer"
              variant="ghost"
              onClick={() => {
                setSelectedCategory(null);
                setSearchByName([]);
              }}
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
                  onChange={(e) => setInputName(e.target.value)}
                />
                <DialogClose asChild>
                  <Button
                    className="cursor-pointer"
                    variant="outline"
                    onClick={() => {
                      const allProducts = categorias.flatMap(
                        (categoria) => categoria.products
                      );
                      const foundProducts = allProducts.filter((product) =>
                        normalize(product.name).includes(normalize(inputName))
                      );

                      setSearchByName(foundProducts);
                    }}
                  >
                    Pesquisar
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
          <div className="mt-8">
            {categorias
              .filter(
                (categoria) =>
                  !selectedCategory ||
                  categoria.categoryName === selectedCategory
              )
              .map((categoria) =>
                categoria.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    image={product.image}
                    priceCents={product.priceCents}
                    isHomePage={true}
                    onAdd={addProducts}
                  />
                ))
              )}
          </div>
        </section>
      )}
    </>
  );
}
