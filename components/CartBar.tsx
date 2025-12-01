import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartBar() {
  return (
    <>
      <div className="sticky top-0 flex justify-between items-center mb-5 p-4 bg-[#e64872]">
        <Link href="/">
          <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-white">
            Menu Diggy
          </h1>
        </Link>

        <Link href="/cart">
          <ShoppingCart className="text-white" />
        </Link>
      </div>
    </>
  );
}
