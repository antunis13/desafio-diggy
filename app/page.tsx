"use client";

import { useState } from "react";

import ProductCard from "@/components/ProductCard";
import Toolbar from "@/components/Toolbar";

import { Category } from "@/types/category";
import { Product } from "@/types/products";
import { CartItem } from "@/types/cart";

import categorias from "@/data/products.json";

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
    setSearchByName([]);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchByName([]);
  };

  const handleInputChange = (value: string) => {
    setInputName(value);
  };

  const performSearch = () => {
    const allProducts = categorias.flatMap((categoria) => categoria.products);
    const foundProducts = allProducts.filter((product) =>
      normalize(product.name).includes(normalize(inputName))
    );
    setSearchByName(foundProducts);
    setSelectedCategory(null);
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
          <Toolbar
            categoryButtons={categoryButtons}
            onCategorySelect={searchByCategory}
            onClearFilters={clearFilters}
            inputName={inputName}
            onInputChange={handleInputChange}
            onSearch={performSearch}
          />

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
          <Toolbar
            categoryButtons={categoryButtons}
            onCategorySelect={searchByCategory}
            onClearFilters={clearFilters}
            inputName={inputName}
            onInputChange={handleInputChange}
            onSearch={performSearch}
          />
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
