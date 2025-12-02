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
      <section className="flex flex-col grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 place-items-center m-10 p-4">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
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
      <footer className="fixed w-full bottom-0 flex justify-between items-center p-4 bg-white border shadow-[0_-4px_6px_rgba(0,0,0,0.1)]">
        <div className="flex grid grid-cols-1">
          <Label>Total da compra</Label>
          <span>R$ {calculateTotal()}</span>
        </div>

        <div>
          <Button
            variant="ghost"
            className="mr-4 cursor-pointer"
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
            <Button disabled>Cart is empty</Button>
          ) : (
            <Button className="cursor-pointer">Efetuar a compra</Button>
          )}
        </div>
      </footer>
    </>
  );
}
