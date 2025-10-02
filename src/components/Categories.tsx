"use client";

import {
  Grid3X3,
  Shirt,
  Footprints,
  Watch,
  ShoppingBag,
  Flower2,
  Shield,
  Hand,
} from "lucide-react";
import { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Category {
  name: string;
  icon: ReactNode;
  slug: string;
}

const categories: Category[] = [
  {
    name: "All",
    icon: <Grid3X3 className="h-4 w-4" />,
    slug: "all",
  },
  {
    name: "T-Shirt",
    icon: <Shirt className="h-4 w-4" />,
    slug: "t-shirt",
  },
  {
    name: "Shoes",
    icon: <Footprints className="h-4 w-4" />,
    slug: "shoes",
  },
  {
    name: "Accessories",
    icon: <Watch className="h-4 w-4" />,
    slug: "accessories",
  },
  {
    name: "Bags",
    icon: <ShoppingBag className="h-4 w-4" />,
    slug: "bags",
  },
  {
    name: "Dresses",
    icon: <Flower2 className="h-4 w-4" />,
    slug: "dresses",
  },
  {
    name: "Jackets",
    icon: <Shield className="h-4 w-4" />,
    slug: "jackets",
  },
  {
    name: "Gloves",
    icon: <Hand className="h-4 w-4" />,
    slug: "gloves",
  },
];

export default function Categories() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category");
  console.log(selectedCategory);

  const handleChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value || "all");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 bg-gray-100 p-2 rounded-lg mb-4 text-sm">
      {categories.map((category) => (
        <div
          className={`flex items-center justify-center gap-2 cursor-pointer px-2 py-1 rounded-md ${
            category.slug === selectedCategory ? "bg-white" : "text-gray-500"
          }`}
          key={category.name}
          onClick={() => handleChange(category.slug)}
        >
          {category.icon}
          {category.name}
        </div>
      ))}
    </div>
  );
}
