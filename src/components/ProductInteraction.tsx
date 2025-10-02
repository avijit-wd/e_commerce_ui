"use client";

import useCartStore from "@/store/cartStore";
import { Product } from "@/types";
import { ArrowRight, Minus, Plus, ShoppingCart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  product: Product;
  selectedSize: string;
  selectedColor: string;
};

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 10;

export default function ProductInteraction({
  product,
  selectedSize,
  selectedColor,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { addToCart } = useCartStore();

  const [selection, setSelection] = useState({
    size: selectedSize,
    color: selectedColor,
  });
  const [quantity, setQuantity] = useState<number>(MIN_QUANTITY);

  useEffect(() => {
    setSelection({ size: selectedSize, color: selectedColor });
  }, [selectedSize, selectedColor]);

  const formattedPrice = useMemo(
    () => (product.price * quantity).toFixed(2),
    [product.price, quantity]
  );

  const updateSearchParams = (nextSize: string, nextColor: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("size", nextSize);
    params.set("color", nextColor);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSizeSelect = (value: string) => {
    const nextSelection = { size: value, color: selection.color };
    setSelection(nextSelection);
    updateSearchParams(nextSelection.size, nextSelection.color);
  };

  const handleColorSelect = (value: string) => {
    const nextSelection = { size: selection.size, color: value };
    setSelection(nextSelection);
    updateSearchParams(nextSelection.size, nextSelection.color);
  };

  const adjustQuantity = (delta: number) => {
    setQuantity((prev) =>
      Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, prev + delta))
    );
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedSize: selection.size,
      selectedColor: selection.color,
      quantity,
    });
    toast.success("Product added to cart");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart?step=1", { scroll: false });
  };

  return (
    <div className="flex flex-col gap-6 mt-4">
      {/* Size selector */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">Select size</span>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => {
            const isActive = selection.size === size;
            return (
              <button
                key={size}
                className={`px-3 py-1 rounded-md border text-sm uppercase transition ${
                  isActive
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
                onClick={() => handleSizeSelect(size)}
                aria-pressed={isActive}
                aria-label={`Select size ${size.toUpperCase()}`}
                type="button"
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color selector */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">Choose color</span>
        <div className="flex items-center gap-3">
          {product.colors.map((color) => {
            const isActive = selection.color === color;
            return (
              <button
                key={color}
                className={`relative w-8 h-8 rounded-full border transition ${
                  isActive ? "border-gray-900" : "border-gray-200"
                }`}
                onClick={() => handleColorSelect(color)}
                aria-pressed={isActive}
                aria-label={`Select color ${color}`}
                type="button"
              >
                <span
                  className="absolute inset-1 rounded-full"
                  style={{ backgroundColor: color }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Quantity</span>
        <div className="flex items-center gap-3 border border-gray-200 rounded-full px-3 py-1">
          <button
            type="button"
            onClick={() => adjustQuantity(-1)}
            className="p-1 text-gray-600 disabled:text-gray-300"
            disabled={quantity === MIN_QUANTITY}
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-6 text-center text-sm font-medium">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => adjustQuantity(1)}
            className="p-1 text-gray-600 disabled:text-gray-300"
            disabled={quantity === MAX_QUANTITY}
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <span className="text-sm text-gray-500">
          Total:{" "}
          <span className="font-semibold text-gray-800">${formattedPrice}</span>
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-md bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 transition"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4 h-4" />
          Add to cart
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-md border border-gray-900 text-gray-900 px-4 py-2 text-sm font-medium hover:bg-gray-100 transition"
          onClick={handleBuyNow}
        >
          Buy now
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Purchase info */}
      <div className="grid gap-2 text-xs text-gray-500">
        <p>✨ Free standard shipping on orders over $75.</p>
        <p>🔄 30-day returns on unworn items with original tags.</p>
        <p>🔒 Secure checkout powered by leading payment providers.</p>
      </div>
    </div>
  );
}
