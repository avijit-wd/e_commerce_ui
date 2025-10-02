import ProductInteraction from "@/components/ProductInteraction";
import { Product } from "@/types";
import Image from "next/image";

const product: Product = {
  id: 8,
  name: "Levi’s Classic Denim",
  shortDescription:
    "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  description:
    "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  price: 59.9,
  sizes: ["s", "m", "l"],
  colors: ["blue", "green"],
  images: { blue: "/products/8b.png", green: "/products/8gr.png" },
};

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{ color: string; size: string }>;
}) {
  const { size, color } = await searchParams;
  const selectedSize = (size || product.sizes[0]) as string;
  const selectedColor = (color || product.colors[0]) as string;
  return (
    <div className="flex flex-col gap-4 lg:flex-row md:gap-12 mt-12">
      {/* Image */}
      <div className="w-full lg:w-5/12 relative aspect-[2/3]">
        <Image
          src={product.images[selectedColor]}
          alt={product.name}
          fill
          className="object-contain rounded-md"
        />
      </div>
      {/* Details */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        <h1 className="text-2xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <h2 className="text-2xl font-semibold">${product.price.toFixed(2)}</h2>
        <ProductInteraction
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
        />
        {/* Card info */}
        <div className="flex items-center gap-2 mt-4">
          <Image
            src="/klarna.png"
            alt="klarna"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src="/cards.png"
            alt="cards"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src="/stripe.png"
            alt="stripe"
            width={50}
            height={25}
            className="rounded-md"
          />
        </div>
        {/* Terms & Refund Policy */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <p className="font-medium mb-1">Returns:</p>
              <p>
                30-day return policy. Items must be unworn with original tags.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Terms:</p>
              <p>
                Sale items final. Customer pays return shipping. 5-7 day refund
                processing.
              </p>
            </div>
          </div>
        </div>
        {/* Agreement Text */}
        <div className="mt-4">
          <p className="text-xs text-gray-500">
            By purchasing, you agree to our{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              Terms
            </span>{" "}
            &{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              Refund Policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
