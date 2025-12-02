"use client";

import ProductCard from "@/components/ProductCard";
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

  return (
    <section className="flex flex-col grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 place-items-center m-10 p-4">
      {categorias.map((categoria) =>
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
  );
}
