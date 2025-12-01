import ProductCard from "@/components/ProductCard";
import categorias from "@/data/products.json";
export default function Home() {
  return (
    <section className="flex flex-col grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 place-items-center m-10 p-4">
      {categorias.map((categoria) =>
        categoria.products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            description={product.description}
            image={product.image}
            priceCents={product.priceCents}
          />
        ))
      )}
    </section>
  );
}
