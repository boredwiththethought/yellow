import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "../../../vector";
import { useClickOutside } from "../../../hooks/useClickOutside";
import type { SubMenuItem } from "../../../types/navigation.types";

interface DropdownProps {
  label: string;
  items: SubMenuItem[];
}

export const Dropdown = ({ label, items }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="flex items-center gap-1 py-2 text-gray-700 transition-colors hover:text-black"
      >
        <span className="font-medium">{label}</span>
        <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 z-50 mt-2 w-56 rounded-lg border border-gray-100 bg-white py-2 shadow-lg"
          onMouseLeave={() => setIsOpen(false)}
        >
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 transition-colors hover:bg-gray-50"
            >
              <div className="font-medium text-gray-900">{item.label}</div>
              {item.description && <div className="mt-1 text-sm text-gray-500">{item.description}</div>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
