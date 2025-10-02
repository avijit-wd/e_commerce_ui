import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { Bell, Home } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 p-4 flex justify-between items-center">
      {/* Left */}
      <Link href="/" className="flex items-center">
        <Image
          src={"/logo.png"}
          alt="TrendShop"
          width={36}
          height={36}
          className="w-6 h-6 md:w-9 md:h-9"
        />
        <p className="hidden md:block text-sm font-medium tracking-wider">
          TrendShop
        </p>
      </Link>
      {/* Right */}
      <div className="flex items-center gap-6">
        <SearchBar />
        <Link href="/">
          <Home className="h-4 w-4 text-gray-600" />
        </Link>

        <Bell className="h-4 w-4 text-gray-600" />
        <ShoppingCartIcon />
        <Link href="/login">Sign In </Link>
      </div>
    </nav>
  );
}
