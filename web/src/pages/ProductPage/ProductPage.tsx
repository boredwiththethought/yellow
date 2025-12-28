import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios.config";
import type { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { Header } from "../../components/common/Header";
import Footer from "../../components/common/Footer/Footer";
import Deals from "../../components/home/Deals";
import MainProduct from "../../components/home/MainProduct";

const useCountdown = (deadlineISO?: string) => {
  const [remain, setRemain] = useState<number>(() => {
    return deadlineISO ? Math.max(0, new Date(deadlineISO).getTime() - Date.now()) : 0;
  });
  useEffect(() => {
    if (!deadlineISO) return;
    const id = setInterval(() => {
      setRemain(Math.max(0, new Date(deadlineISO).getTime() - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [deadlineISO]);
  const parts = useMemo(() => {
    const s = Math.floor(remain / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return { d, h, m, s: sec };
  }, [remain]);
  return parts;
};

const Dot = ({
  color,
  active,
  onClick,
  label
}: {
  color: string;
  active: boolean;
  onClick: () => void;
  label: string;
}) => (
  <button
    aria-label={label}
    onClick={onClick}
    className={`size-7 rounded-full border transition-all ${active ? "border-white ring-2 ring-black" : "border-gray-300"}`}
    style={{
      backgroundColor: color.toLowerCase(),
      borderColor: color.toLowerCase() === "white" ? "#e5e7eb" : undefined
    }}
  />
);

interface ProductPageProps {
  onAddToCart?: () => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ onAddToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [qty, setQty] = useState<number>(1);

  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchOne = async () => {
      try {
        setLoading(true);
        const res = await api.get<{ success: boolean; data: Product }>(`/products/${id}`);
        setProduct(res.data.data);
      } catch (e) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchOne();
  }, [id]);

  const deadline = useMemo(() => {
    const dt = new Date();
    dt.setDate(dt.getDate() + 3);
    return dt.toISOString();
  }, []);
  const t = useCountdown(deadline);

  const p = product;
  const inWishlist = p ? isInWishlist(p._id) : false;
  const canSubmit = p ? (p.sizes?.length ? !!size : true) && (p.colors?.length ? !!color : true) : false;

  const toggleWishlist = () => {
    if (!p) return;
    if (inWishlist) removeFromWishlist(p._id);
    else addToWishlist(p);
  };

  const handleAddToCart = () => {
    if (!p || !canSubmit) return;
    addToCart(p, size || undefined, color || undefined, qty);
    onAddToCart?.();
  };

  if (loading) return <div className="container mx-auto px-4 py-16">Loading…</div>;
  if (error || !product) return <div className="container mx-auto px-4 py-16">{error ?? "Not found"}</div>;

  return (
    <>
      <Header />
      <div className="bg-white">
        <div className="container mx-auto px-4 py-4 sm:py-8">
          {/* Breadcrumb */}
          <div className="mb-4 text-xs text-gray-500 sm:mb-6 sm:text-sm" style={{ fontFamily: "Poppins" }}>
            <Link to="/shop" className="hover:underline">
              Shop
            </Link>{" "}
            / <span className="truncate">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-10 lg:grid-cols-2">
            {/* Gallery - Mobile optimized */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[80px_1fr] sm:gap-4">
              {/* Thumbnails - horizontal on mobile, vertical on desktop */}
              <div
                className="order-2 flex gap-2 overflow-x-auto pb-2 sm:order-1 sm:flex-col sm:gap-3 sm:overflow-visible sm:pb-0"
                role="tablist"
                aria-label="Product images"
              >
                {product.images.slice(0, 6).map((img, i) => (
                  <button
                    key={img + i}
                    onClick={() => setActiveIdx(i)}
                    role="tab"
                    aria-selected={i === activeIdx}
                    aria-label={`Image ${i + 1}`}
                    className={`shrink-0 overflow-hidden rounded-lg border transition-all ${i === activeIdx ? "border-black ring-2 ring-black/20" : "border-gray-200"}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className="h-16 w-16 object-cover sm:h-20 sm:w-20"
                    />
                  </button>
                ))}
              </div>
              {/* Main image */}
              <div className="order-1 sm:order-2">
                <SwipeImage
                  src={product.images[activeIdx]}
                  alt={product.name}
                  count={product.images.length}
                  index={activeIdx}
                  onPrev={() => setActiveIdx(i => (i - 1 + product.images.length) % product.images.length)}
                  onNext={() => setActiveIdx(i => (i + 1) % product.images.length)}
                />
              </div>
            </div>

            {/* Info Panel */}
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Header with brand, name, rating */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p
                    className="text-[10px] tracking-widest text-gray-500 uppercase sm:text-xs"
                    style={{ fontFamily: "Poppins" }}
                  >
                    {product.brand}
                  </p>
                  <h1 className="mt-1 text-xl font-semibold sm:text-2xl md:text-3xl" style={{ fontFamily: "Volkhov" }}>
                    {product.name}
                  </h1>
                  <div
                    className="mt-2 flex flex-wrap items-center gap-1 text-xs text-gray-600 sm:gap-2 sm:text-sm"
                    style={{ fontFamily: "Poppins" }}
                  >
                    <span>⭐ {product.rating.toFixed(1)}</span>
                    <span>·</span>
                    <span>{product.reviews.toLocaleString()} reviews</span>
                    <span className="hidden sm:inline">·</span>
                    <span className="hidden text-red-600 sm:inline">
                      {Math.floor(Math.random() * 24) + 5} people viewing
                    </span>
                  </div>
                </div>
                <button
                  onClick={toggleWishlist}
                  aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-xl transition sm:h-12 sm:w-12 sm:text-2xl ${
                    inWishlist
                      ? "border-red-500 bg-red-50 text-red-600 hover:bg-red-100"
                      : "border-gray-300 bg-white text-gray-400 hover:border-red-300 hover:text-red-500"
                  }`}
                >
                  {inWishlist ? "♥" : "♡"}
                </button>
              </div>{" "}
              {/* Price + discount */}
              <div className="flex flex-wrap items-end gap-2 sm:gap-3">
                <div className="text-2xl font-semibold sm:text-3xl" style={{ fontFamily: "Poppins" }}>
                  ${product.price.toFixed(2)}
                </div>
                {product.price && (
                  <>
                    <div className="text-base text-gray-400 line-through sm:text-lg">
                      ${(product.price * 1.33).toFixed(2)}
                    </div>
                    <div className="rounded-md bg-red-500 px-2 py-1 text-[10px] font-semibold text-white sm:text-xs">
                      Save 33%
                    </div>
                  </>
                )}
              </div>
              {/* Timer + stock */}
              <div className="flex flex-col gap-3 rounded-lg border border-gray-200 p-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:p-4">
                <div className="text-xs sm:text-sm" style={{ fontFamily: "Poppins" }}>
                  Hurry up! Sale ends in
                </div>
                <div className="flex items-center gap-1 text-center sm:gap-2" aria-live="polite">
                  {(["d", "h", "m", "s"] as const).map(k => (
                    <div key={k} className="min-w-10 rounded-md bg-red-50 p-1.5 sm:min-w-14 sm:p-2">
                      <div className="text-base font-semibold text-red-600 sm:text-xl">
                        {t[k].toString().padStart(2, "0")}
                      </div>
                      <div className="text-[8px] tracking-wide text-red-700 uppercase sm:text-[10px]">{k}</div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-600 sm:ml-auto sm:text-sm">
                  {product.inStock ? `Only ${Math.floor(Math.random() * 9) + 1} items left` : "Out of stock"}
                </div>
              </div>
              {/* Size */}
              {product.sizes?.length > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-gray-600" style={{ fontFamily: "Poppins" }}>
                    Size
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(s => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`rounded-md border px-3 py-2 text-sm transition ${size === s ? "border-black bg-black text-white" : "border-gray-300 bg-white"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* Color */}
              {product.colors?.length > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-gray-600" style={{ fontFamily: "Poppins" }}>
                    Color
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.slice(0, 6).map(c => (
                      <Dot key={c} label={c} color={c} active={color === c} onClick={() => setColor(c)} />
                    ))}
                  </div>
                </div>
              )}
              {/* Quantity + CTA */}
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <div className="flex items-center justify-center rounded-md border border-gray-300 sm:justify-start">
                  <button className="px-3 py-2 text-lg" onClick={() => setQty(q => Math.max(1, q - 1))}>
                    −
                  </button>
                  <input
                    className="w-12 border-x border-gray-300 py-2 text-center"
                    value={qty}
                    onChange={e => setQty(Math.max(1, Number(e.target.value) || 1))}
                  />
                  <button className="px-3 py-2 text-lg" onClick={() => setQty(q => q + 1)}>
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!canSubmit}
                  className="w-full rounded-md bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50 sm:w-auto sm:flex-1 sm:px-8"
                >
                  Add to Cart
                </button>
                <button
                  onClick={toggleWishlist}
                  className={`flex w-full items-center justify-center gap-2 rounded-md border px-4 py-3 text-sm font-semibold transition sm:w-auto sm:px-6 ${
                    inWishlist ? "border-red-500 bg-red-50 text-red-600" : "border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg sm:text-xl">{inWishlist ? "♥" : "♡"}</span>
                  <span>{inWishlist ? "In Wishlist" : "Wishlist"}</span>
                </button>
              </div>
              {/* Compare / Ask / Share */}
              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                <button className="underline">Compare</button>
                <button className="underline">Ask a question</button>
                <button className="underline">Share</button>
              </div>
              {/* Delivery & Returns */}
              <div className="rounded-lg border border-gray-200 p-4 text-sm text-gray-700">
                <p>
                  Estimated Delivery: <strong>Jul 30 – Aug 03</strong>
                </p>
                <p>Free Shipping & Returns: On all orders over $75</p>
              </div>
              {/* Secure payment */}
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="mb-2 text-sm font-semibold">Guarantee safe & secure checkout</div>
                <div className="flex flex-wrap items-center gap-3 opacity-80">
                  <img src="/images/logos/visa.svg" alt="Visa" className="h-6" />
                  <img src="/images/logos/mastercard.svg" alt="MasterCard" className="h-6" />
                  <img src="/images/logos/paypal.svg" alt="PayPal" className="h-6" />
                  <img src="/images/logos/amex.svg" alt="AmEx" className="h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <MainProduct />
        <Deals />
        <Footer />
      </div>
    </>
  );
};

export default ProductPage;

const SwipeImage: React.FC<{
  src: string;
  alt: string;
  index: number;
  count: number;
  onPrev: () => void;
  onNext: () => void;
}> = ({ src, alt, onPrev, onNext }) => {
  const [startX, setStartX] = React.useState<number | null>(null);
  const threshold = 40;
  return (
    <div
      className="overflow-hidden rounded-2xl bg-gray-50 shadow-sm"
      onTouchStart={e => setStartX(e.touches[0].clientX)}
      onTouchEnd={e => {
        if (startX == null) return;
        const dx = (e.changedTouches?.[0]?.clientX ?? startX) - startX;
        if (dx > threshold) onPrev();
        else if (dx < -threshold) onNext();
        setStartX(null);
      }}
    >
      <img src={src} alt={alt} className="aspect-square h-auto w-full object-cover" />
    </div>
  );
};
