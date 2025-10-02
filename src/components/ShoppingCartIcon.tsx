"use client";

import useCartStore from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function ShoppingCartIcon() {
  const { cart, hasHydrated } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const itemCount = useMemo(() => {
    if (!hasHydrated) {
      return 0;
    }

    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart, hasHydrated]);

  const showBadge = isMounted && hasHydrated && itemCount > 0;

  return (
    <Link suppressHydrationWarning href="/cart" className="relative">
      <ShoppingCart className="h-4 w-4 text-gray-600" />
      {showBadge && (
        <span className="absolute -top-3 -right-3 bg-amber-400 text-gray-600 rounded-full w-4 h-4 flex justify-center items-center text-sm font-medium">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
