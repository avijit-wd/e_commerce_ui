import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="hidden sm:flex items-center gap-2 rounded-md ring-1 ring-gray-200 px-2 py-1 shadow-md">
      <Search className="h-4 w-4 text-gray-500" />
      <input
        type="text"
        id="search"
        placeholder="Search"
        className="text-sm focus:outline-none"
      />
    </div>
  );
}
