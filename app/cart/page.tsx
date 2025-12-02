"use client";

import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";

export default function Cart() {
  const [cart, setCart] = useState<Product[]>([]);

  interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
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

  return (
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
          />
        ))
      )}
    </section>
  );
}
