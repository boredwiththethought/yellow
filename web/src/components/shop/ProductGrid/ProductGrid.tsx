import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../api/axios.config";
import type { Product } from "../../../types";
import { CellItem } from "../CellItem/CellItem";
import { ProductSkeleton } from "./ProductSkeleton";

interface ProductGridProps {
  filters?: {
    sizes: string[];
    colors: string[];
    brands: string[];
    priceRange: { min: number; max: number };
    collections: string[];
    tags: string[];
  };
  sortBy?: string;
  searchQuery?: string;
  page: number;
  onPageChange: (page: number) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ filters, sortBy, searchQuery, page, onPageChange }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const params = new URLSearchParams();

        if (filters?.collections?.length) params.append("collection", filters.collections.join(","));
        if (filters?.sizes?.length) params.append("sizes", filters.sizes.join(","));
        if (filters?.colors?.length) params.append("colors", filters.colors.join(","));
        if (filters?.brands?.length) params.append("brands", filters.brands.join(","));
        if (filters?.tags?.length) params.append("tags", filters.tags.join(","));
        if (filters?.priceRange) {
          if (filters.priceRange.min > 0) params.append("minPrice", String(filters.priceRange.min));
          if (filters.priceRange.max < 1000) params.append("maxPrice", String(filters.priceRange.max));
        }
        if (sortBy) params.append("sort", sortBy);
        if (searchQuery) params.append("search", searchQuery);
        params.append("page", String(page));
        params.append("limit", String(limit));

        const response = await api.get<{
          success: boolean;
          count: number;
          total: number;
          page: number;
          pages: number;
          limit: number;
          data: Product[];
        }>("/products", { params: Object.fromEntries(params.entries()) });

        const payload = response.data as any;
        const data = Array.isArray(payload) ? payload : (payload.data ?? []);
        setProducts(data);
        if (!Array.isArray(payload)) {
          setTotal(payload.total ?? data.length);
          setPages(payload.pages ?? 1);
        } else {
          setTotal(data.length);
          setPages(1);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("Products fetch error", err.response?.status, err.response?.data);
        }
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filters, sortBy, searchQuery, page]);

  if (loading) {
    return (
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex items-center justify-between">
          <p className="text-[14px] text-[#8A8A8A]" style={{ fontFamily: "Poppins" }}>
            Loading products…
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <div className="text-center">
          <p className="mb-4 text-red-600" style={{ fontFamily: "Poppins" }}>
            {error}
          </p>
          <button
            onClick={() => onPageChange(1)}
            className="rounded-lg bg-black px-4 py-2 text-white transition-colors hover:bg-gray-800"
            style={{ fontFamily: "Poppins" }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="flex items-center justify-between">
        <p className="text-[14px] text-[#8A8A8A]" style={{ fontFamily: "Poppins" }}>
          Showing {products.length} of {total}
        </p>
        <div className="flex items-center gap-2">
          <button
            className="rounded border px-3 py-1 text-sm disabled:opacity-50"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page <= 1}
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">
            {page} / {pages}
          </span>
          <button
            className="rounded border px-3 py-1 text-sm disabled:opacity-50"
            onClick={() => onPageChange(Math.min(pages, page + 1))}
            disabled={page >= pages}
          >
            Next
          </button>
        </div>
      </div>
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 h-20 w-20 rounded-full bg-gray-100" />
          <p className="mb-2 text-xl text-gray-700" style={{ fontFamily: "Poppins" }}>
            No products found
          </p>
          <p className="text-sm text-gray-500" style={{ fontFamily: "Poppins" }}>
            Try adjusting or clearing your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map(product => (
            <CellItem key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
