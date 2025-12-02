"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  image: string;
}

interface ProductCardProps extends Product {
  isHomePage: boolean;
  onAdd?: (
    id: string,
    name: string,
    img: string,
    desc: string,
    price: number
  ) => void;
  onDelete?: (id: string) => void;
}

export default function ProductCard({
  id,
  name,
  image,
  description,
  priceCents,
  isHomePage = true,
  onAdd,
  onDelete,
}: ProductCardProps) {
  const price = (priceCents / 100).toFixed(2);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <p className="hidden"> {id}</p>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <CardDescription className="mt-4 mb-2">{description}</CardDescription>
        <p>R$ {price}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        {isHomePage ? (
          <Button
            onClick={() => onAdd?.(id, name, image, description, priceCents)}
          >
            Add to Cart
          </Button>
        ) : (
          <Button onClick={() => onDelete?.(id)}>Remove item</Button>
        )}
      </CardFooter>
    </Card>
  );
}
