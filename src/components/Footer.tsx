import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="mt-16 flex flex-col gap-8 md:gap-0 items-center md:flex-row md:items-start md:justify-between bg-gray-800 p-8 rounded-md">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <Link href="/" className="flex items-center">
          <Image
            src={"/logo.png"}
            alt="TrendShop"
            width={36}
            height={36}
            className="w-6 h-6 md:w-9 md:h-9"
          />
          <p className="hidden md:block text-sm text-white font-medium tracking-wider">
            TrendShop
          </p>
        </Link>

        <p className="text-sm text-gray-400">@2025 TrendShop</p>
        <p className="text-sm text-gray-400">All rights reserved</p>
      </div>

      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href="/">Homepage</Link>
        <Link href="/">Contact</Link>
        <Link href="/">Terms of service</Link>
        <Link href="/">Privacy policy</Link>
      </div>

      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href="/">All Products</Link>
        <Link href="/">New Arrivals</Link>
        <Link href="/">Best Seller</Link>
        <Link href="/">Sale</Link>
      </div>

      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href="/">About</Link>
        <Link href="/">Contact</Link>
        <Link href="/">Blog</Link>
        <Link href="/">Affiliate Programme</Link>
      </div>
    </div>
  );
}
