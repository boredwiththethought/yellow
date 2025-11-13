import React from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "../../components/common/Header";
import MainProduct from "../../components/home/MainProduct";
import SocialContacts from "../../components/home/SocialContacts";
import Footer from "../../components/common/Footer/Footer";
import { Filters } from "../../components/shop/Filters/Filters";
import { ProductGrid } from "../../components/shop/ProductGrid/ProductGrid";

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = React.useState<string>(searchParams.get("sort") || "");
  const [page, setPage] = React.useState<number>(Number(searchParams.get("page") || 1));
  const [searchQuery] = React.useState<string>("");

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
      <div className="container mx-auto mt-20 flex w-full flex-col gap-[50px] px-4 pb-[100px]">
        <div className="flex flex-col items-center gap-5">
          <h1
            style={{ fontFamily: "Volkhov" }}
            className="text-center align-middle text-[42px] leading-8 font-normal tracking-normal capitalize"
          >
            Fashion
          </h1>
          <div className="flex items-center gap-3.5">
            <span
              style={{ fontFamily: "Jost" }}
              className="text-center align-middle text-[15px] leading-[22.5px] font-normal tracking-normal"
            >
              Home
            </span>
            <img src="../../../public/images/shop/SVG.svg" alt="" />
            <span
              style={{ fontFamily: "Jost" }}
              className="text-center align-middle text-[15px] leading-[22.5px] font-normal tracking-normal"
            >
              Fashion
            </span>
          </div>
          <div className="mt-4 flex w-full items-center justify-end gap-2">
            <label className="text-sm text-gray-600" htmlFor="sortBy">
              Sort by
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={e => {
                setSortBy(e.target.value);
                setPage(1);
              }}
              className="rounded border px-3 py-2 text-sm"
            >
              <option value="">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>
     
        <div className="flex items-start gap-8">
          <div ref={leftRef}>
            <Filters onFilterChange={handleFilterChange} />
          </div>
        
          <div
            id="right-products-pane"
            className="relative min-h-0 flex-1 overflow-y-auto"
            style={rightHeight ? { height: `${rightHeight}px` } : undefined}
          >
            <div className="pointer-events-none absolute inset-y-0 right-0 w-3 bg-linear-to-l from-white/70 to-transparent" />
            <div className="flex flex-col gap-8 pr-2">
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
      <MainProduct />
      <SocialContacts />
      <Footer />
    </>
  );
};

export default ShopPage;
