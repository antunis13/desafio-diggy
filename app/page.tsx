"use client";

import ProductCard from "@/components/ProductCard";
import categorias from "@/data/products.json";
export default function Home() {
  const addProducts = (
    id: string,
    name: string,
    img: string,
    desc: string,
    price: number
  ) => {
    const cartProduct = {
      id: id,
      name: name,
      image: img,
      description: desc,
      price: price,
    };

    const stored = localStorage.getItem("cart");
    const cart = stored ? JSON.parse(stored) : [];

    const existingProduct = cart.find((item: any) => item.id === id);
    if (!existingProduct) {
      cart.push(cartProduct);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
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
