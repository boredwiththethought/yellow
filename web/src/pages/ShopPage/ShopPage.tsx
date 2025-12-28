import React from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "../../components/common/Header";
import MainProduct from "../../components/home/MainProduct";
import SocialContacts from "../../components/home/SocialContacts";
import Footer from "../../components/common/Footer/Footer";
import { Filters } from "../../components/shop/Filters/Filters";
import { ProductGrid } from "../../components/shop/ProductGrid/ProductGrid";
import { CloseIcon } from "../../vector";

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = React.useState<string>(searchParams.get("sort") || "");
  const [page, setPage] = React.useState<number>(Number(searchParams.get("page") || 1));
  const [searchQuery] = React.useState<string>("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);

  // Transform filter format from Filters component to ProductGrid format
  const [productFilters, setProductFilters] = React.useState({
    sizes: [] as string[],
    colors: [] as string[],
    brands: [] as string[],
    priceRange: { min: 0, max: 1000 },
    collections: [] as string[],
    tags: [] as string[]
  });

  const handleFilterChange = (filters: any) => {
    const selectedSizes = filters.sizes?.filter((s: any) => s.checked).map((s: any) => s.label) || [];
    const selectedColors = filters.colors?.filter((c: any) => c.checked).map((c: any) => c.label) || [];
    const selectedBrands = filters.brands?.filter((b: any) => b.checked).map((b: any) => b.label) || [];
    const selectedCollections =
      filters.collections?.filter((c: any) => c.checked).map((c: any) => c.label.toLowerCase().replace(/ /g, "-")) ||
      [];
    const selectedTags = filters.tags?.filter((t: any) => t.checked).map((t: any) => t.label) || [];

    const checkedPrices = filters.prices?.filter((p: any) => p.checked) || [];
    let minPrice = 0;
    let maxPrice = 1000;

    if (checkedPrices.length > 0) {
      minPrice = Math.min(...checkedPrices.map((p: any) => p.min));
      maxPrice = Math.max(...checkedPrices.map((p: any) => p.max));
    }

    const newFilters = {
      sizes: selectedSizes,
      colors: selectedColors,
      brands: selectedBrands,
      priceRange: { min: minPrice, max: maxPrice },
      collections: selectedCollections,
      tags: selectedTags
    };

    setProductFilters(newFilters);

    const params = new URLSearchParams(searchParams);
    if (selectedCollections.length > 0) {
      params.set("collection", selectedCollections.join(","));
    }
    if (selectedSizes.length > 0) {
      params.set("sizes", selectedSizes.join(","));
    }
    if (selectedColors.length > 0) {
      params.set("colors", selectedColors.join(","));
    }
    if (selectedBrands.length > 0) {
      params.set("brands", selectedBrands.join(","));
    }
    if (selectedTags.length > 0) {
      params.set("tags", selectedTags.join(","));
    }

    if (sortBy) params.set("sort", sortBy);
    params.set("page", String(page));
    setSearchParams(params, { replace: true });
  };

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (sortBy) params.set("sort", sortBy);
    else params.delete("sort");
    params.set("page", String(page));
    setSearchParams(params, { replace: true });
  }, [sortBy, page]);

  const leftRef = React.useRef<HTMLDivElement | null>(null);
  const [rightHeight, setRightHeight] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    const update = () => {
      const h = leftRef.current?.getBoundingClientRect().height;
      if (h && h > 0) setRightHeight(Math.round(h));
    };
    update();
    let ro: ResizeObserver | null = null;
    if (leftRef.current && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(update);
      ro.observe(leftRef.current);
    }
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      if (ro && leftRef.current) ro.unobserve(leftRef.current);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto mt-8 flex w-full flex-col gap-6 px-4 pb-16 sm:mt-12 sm:gap-8 md:mt-20 md:gap-[50px] md:pb-[100px]">
        {/* Page Header */}
        <div className="flex flex-col items-center gap-3 sm:gap-5">
          <h1
            style={{ fontFamily: "Volkhov" }}
            className="text-center text-2xl font-normal capitalize sm:text-3xl md:text-[42px]"
          >
            Fashion
          </h1>
          <div className="flex items-center gap-2 sm:gap-3.5">
            <span style={{ fontFamily: "Jost" }} className="text-center text-xs font-normal sm:text-[15px]">
              Home
            </span>
            <img src="/images/shop/SVG.svg" alt="" className="h-3 w-3 sm:h-auto sm:w-auto" />
            <span style={{ fontFamily: "Jost" }} className="text-center text-xs font-normal sm:text-[15px]">
              Fashion
            </span>
          </div>

          {/* Sort and Filter Controls */}
          <div className="mt-4 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 lg:hidden"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filters
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 sm:ml-auto">
              <label className="text-xs text-gray-600 sm:text-sm" htmlFor="sortBy">
                Sort by
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={e => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="flex-1 rounded border px-3 py-2 text-xs sm:flex-none sm:text-sm"
              >
                <option value="">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex items-start gap-6 lg:gap-8">
          {/* Desktop Filters */}
          <div ref={leftRef} className="hidden lg:block">
            <Filters onFilterChange={handleFilterChange} />
          </div>

          {/* Product Grid */}
          <div
            id="right-products-pane"
            className="relative min-h-0 flex-1 overflow-y-auto"
            style={rightHeight && window.innerWidth >= 1024 ? { height: `${rightHeight}px` } : undefined}
          >
            <div className="pointer-events-none absolute inset-y-0 right-0 w-3 bg-linear-to-l from-white/70 to-transparent" />
            <div className="flex flex-col gap-6 pr-2 sm:gap-8">
              <ProductGrid
                key={`${sortBy}-${page}`}
                filters={productFilters}
                sortBy={sortBy}
                searchQuery={searchQuery}
                page={page}
                onPageChange={p => setPage(p)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-full max-w-sm overflow-y-auto bg-white shadow-xl lg:hidden">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-full p-2 transition-colors hover:bg-gray-100"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              <Filters onFilterChange={handleFilterChange} />
            </div>
          </div>
        </>
      )}

      <MainProduct />
      <SocialContacts />
      <Footer />
    </>
  );
};

export default ShopPage;
