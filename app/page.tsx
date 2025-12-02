"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import ScrollAreaHorizontal, { Category } from "@/components/ScrollHorizontal";

import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

import categorias from "@/data/products.json";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

interface CartItem {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  image: string;
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchByName, setSearchByName] = useState<Product | undefined>(
    undefined
  );
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

  return (
    <>
      <section className="fixed right-0 top-20 flex justify-between items-center p-2">
        <ScrollAreaHorizontal
          categorias={categoryButtons}
          onSearch={searchByCategory}
        />

        <Button
          className="m-4"
          variant="ghost"
          onClick={() => {
            setSelectedCategory(null);
            setSearchByName(undefined);
          }}
        >
          <X />
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="border rounded-lg p-2 ml-4">
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

            <Button
              variant="outline"
              onClick={() => {
                const category = categorias.find((categoria) =>
                  categoria.products.some(
                    (product) => product.name === inputName
                  )
                );
                const foundProduct = category?.products.find(
                  (product) => product.name === inputName
                );

                setSearchByName(foundProduct);
              }}
            >
              Pesquisar
            </Button>
          </DialogContent>
        </Dialog>
      </section>

      {searchByName ? (
        <section className="flex flex-col grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 place-items-center m-12 p-4">
          <ProductCard
            key={searchByName.id}
            id={searchByName.id}
            name={searchByName.name}
            description={searchByName.description}
            image={searchByName.image}
            priceCents={searchByName.priceCents}
            isHomePage={true}
            onAdd={addProducts}
          />
        </section>
      ) : (
        <section className="flex flex-col grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 place-items-center m-12 p-4">
          {categorias
            .filter(
              (categoria) =>
                !selectedCategory || categoria.categoryName === selectedCategory
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
        </section>
      )}
    </>
  );
}
