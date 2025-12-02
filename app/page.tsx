"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import ScrollAreaHorizontal, { Category } from "@/components/ScrollHorizontal";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

import categorias from "@/data/products.json";

interface CartItem {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const categoryButtons = categorias;

  return (
    <>
      <section className="fixed right-0 top-20 flex justify-between items-center p-2 bg-white">
        {
          <ScrollAreaHorizontal
            categorias={categoryButtons}
            onSearch={searchByCategory}
          />
        }
        <Button
          className="border rounded-lg p-2 ml-4"
          onClick={() => setSelectedCategory(null)}
        >
          <Search />
        </Button>
      </section>

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
    </>
  );
}
