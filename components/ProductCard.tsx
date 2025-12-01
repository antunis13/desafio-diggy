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
  name: string;
  description: string;
  priceCents: number;
  image: string;
}

export default function ProductCard({
  name,
  image,
  description,
  priceCents,
}: Product) {
  const price = (priceCents / 100).toFixed(2);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <CardDescription className="mt-4 mb-2">{description}</CardDescription>
        <p>R$ {price}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
