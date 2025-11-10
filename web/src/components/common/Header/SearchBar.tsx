import { useState } from "react";
import { SearchIcon, CloseIcon } from "../../../vector";

export const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <>
      {/* Desktop Search */}
      <div className="relative hidden md:block">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-64 rounded-full border border-gray-300 px-4 py-2 pr-4 pl-10 transition-colors focus:border-black focus:outline-none"
          />
          <SearchIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute top-1/2 right-3 -translate-y-1/2"
            >
              <CloseIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </form>
      </div>

      {/* Mobile Search Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full p-2 transition-colors hover:bg-gray-100 md:hidden"
      >
        <SearchIcon className="h-6 w-6" />
      </button>

      {/* Mobile Search Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white p-4 md:hidden">
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  autoFocus
                  className="w-full rounded-full border border-gray-300 px-4 py-3 pl-12 focus:border-black focus:outline-none"
                />
                <SearchIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>
            </form>
            <button onClick={() => setIsOpen(false)} className="rounded-full p-2 hover:bg-gray-100">
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
