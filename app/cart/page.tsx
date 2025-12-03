"use client";

import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

export default function Cart() {
  const [cart, setCart] = useState<Product[]>([]);

  interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    quantity: number;
  }

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(saved);
  }, []);

  const deleteProduct = (id: string) => {
    const updatedCart = cart.filter((item: Product) => item.id !== id);

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + (item.price / 100) * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <>
      <section className="flex flex-col grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 place-items-center m-10 p-4 sm:pb-20 md:pb-16 lg:pb-14">
        {cart.length === 0 ? (
          <p>Seu carrinho está vazio</p>
        ) : (
          cart.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              image={item.image}
              priceCents={item.price}
              isHomePage={false}
              onDelete={deleteProduct}
              quantity={item.quantity}
            />
          ))
        )}
      </section>
      <footer className="fixed w-full bottom-0 flex flex-col sm:flex-row justify-between sm:items-center p-3 sm:p-4 bg-white border shadow-[0_-4px_6px_rgba(0,0,0,0.1)] gap-2 sm:gap-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
          <div className="flex flex-col">
            <Label className="text-sm sm:text-base">Total da compra</Label>
            <span className="text-lg sm:text-xl font-semibold">
              R$ {calculateTotal()}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:items-center">
          <Button
            variant="ghost"
            className="text-sm sm:text-base cursor-pointer order-2 sm:order-1 sm:mr-4"
            onClick={() => {
              localStorage.clear();
              const cleanedCart = JSON.parse(
                localStorage.getItem("cart") || "[]"
              );
              setCart(cleanedCart);
            }}
          >
            Limpar
          </Button>
          {cart.length === 0 ? (
            <Button
              disabled
              className="bg-slate-400 text-sm sm:text-base order-1 sm:order-2"
            >
              Carrinho vazio
            </Button>
          ) : (
            <Button className="cursor-pointer bg-secondary hover:bg-[#8d57bd] text-sm sm:text-base order-1 sm:order-2">
              Efetuar a compra
            </Button>
          )}
        </div>
      </footer>
    </>
  );
}
