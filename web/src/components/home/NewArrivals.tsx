import React from "react";
import { useNavigate } from "react-router-dom";
import "./NewArrivals.css";

export interface GridItem {
  id: number;
  name: string;
  subName: string;
  review: string;
  rating?: number;
  price: string;
  soldOut?: boolean;
}

const categoryData: Record<string, GridItem[]> = {
  gridMensFashion: [
    { id: 1, name: "Casual Shirt", subName: "Levis", rating: 4.5, review: "(3.2k) Customer Reviews", price: "$85.00" },
    {
      id: 2,
      name: "Denim Jacket",
      subName: "Wrangler",
      rating: 5,
      review: "(5.1k) Customer Reviews",
      price: "$125.00"
    },
    { id: 3, name: "Wool Sweater", subName: "H&M", rating: 4, review: "(2.8k) Customer Reviews", price: "$75.50" },
    { id: 4, name: "Corduroy Shirt", subName: "Gap", rating: 4.2, review: "(1.1k) Customer Reviews", price: "$69.00" },
    { id: 5, name: "Casual Chinos", subName: "Uniqlo", rating: 4.4, review: "(900) Customer Reviews", price: "$49.00" },
    {
      id: 6,
      name: "Lightweight Hoodie",
      subName: "Nike",
      rating: 4.6,
      review: "(2.3k) Customer Reviews",
      price: "$79.00"
    }
  ],
  gridWomensFashion: [
    { id: 1, name: "Shiny Dress", subName: "Al Karam", rating: 5, review: "(4.1k) Customer Reviews", price: "$95.50" },
    { id: 2, name: "Long Dress", subName: "Al Karam", rating: 5, review: "(4.1k) Customer Reviews", price: "$95.50" },
    { id: 3, name: "Full Sweater", subName: "Al Karam", rating: 5, review: "(4.1k) Customer Reviews", price: "$95.50" },
    { id: 4, name: "Floral Midi", subName: "Zara", rating: 4.5, review: "(1.9k) Customer Reviews", price: "$79.00" },
    { id: 5, name: "Silk Blouse", subName: "COS", rating: 4.7, review: "(2.2k) Customer Reviews", price: "$68.00" },
    { id: 6, name: "Pleated Skirt", subName: "Mango", rating: 4.3, review: "(1.4k) Customer Reviews", price: "$59.00" }
  ],
  gridWomenAccessories: [
    {
      id: 1,
      name: "Leather Handbag",
      subName: "Michael Kors",
      rating: 5,
      review: "(5.3k) Customer Reviews",
      price: "$145.00"
    },
    {
      id: 2,
      name: "Gold Necklace",
      subName: "Pandora",
      rating: 4.5,
      review: "(2.9k) Customer Reviews",
      price: "$89.00"
    },
    { id: 3, name: "Silk Scarf", subName: "Hermès", rating: 5, review: "(3.7k) Customer Reviews", price: "$120.00" },
    {
      id: 4,
      name: "Aviator Sunglasses",
      subName: "Ray-Ban",
      rating: 4.4,
      review: "(1.2k) Customer Reviews",
      price: "$129.00"
    },
    {
      id: 5,
      name: "Beaded Bracelet",
      subName: "Tiffany",
      rating: 4.2,
      review: "(900) Customer Reviews",
      price: "$49.00"
    },
    {
      id: 6,
      name: "Evening Clutch",
      subName: "Kate Spade",
      rating: 4.6,
      review: "(1.7k) Customer Reviews",
      price: "$99.00"
    }
  ],
  gridMensAccessories: [
    { id: 1, name: "Leather Belt", subName: "Gucci", rating: 5, review: "(4.5k) Customer Reviews", price: "$125.00" },
    { id: 2, name: "Classic Watch", subName: "Rolex", rating: 5, review: "(7.2k) Customer Reviews", price: "$350.00" },
    {
      id: 3,
      name: "Leather Wallet",
      subName: "Louis Vuitton",
      rating: 4.5,
      review: "(5.1k) Customer Reviews",
      price: "$95.00"
    },
    {
      id: 4,
      name: "Cufflinks Set",
      subName: "Tiffany",
      rating: 4.3,
      review: "(800) Customer Reviews",
      price: "$69.00"
    },
    { id: 5, name: "Sunglasses", subName: "Persol", rating: 4.6, review: "(1.3k) Customer Reviews", price: "$149.00" },
    { id: 6, name: "Pocket Square", subName: "Hermès", rating: 4.1, review: "(460) Customer Reviews", price: "$39.00" }
  ],
  gridDiscountDeals: [
    { id: 1, name: "Summer Dress", subName: "Zara", rating: 4.5, review: "(3.8k) Customer Reviews", price: "$45.00" },
    { id: 2, name: "Cotton T-Shirt", subName: "H&M", rating: 4, review: "(5.5k) Customer Reviews", price: "$25.00" },
    { id: 3, name: "Denim Jeans", subName: "Levis", rating: 5, review: "(6.7k) Customer Reviews", price: "$55.00" },
    { id: 4, name: "Sneaker Sale", subName: "Adidas", rating: 4.6, review: "(2.1k) Customer Reviews", price: "$69.00" },
    { id: 5, name: "Graphic Tee", subName: "Uniqlo", rating: 4.2, review: "(1.9k) Customer Reviews", price: "$19.00" },
    {
      id: 6,
      name: "Shorts Clearance",
      subName: "Forever21",
      rating: 4.0,
      review: "(700) Customer Reviews",
      price: "$15.00"
    }
  ]
};

const imageSets: Record<string, string[]> = {
  gridMensFashion: [
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=60", // Casual Shirt
    "https://images.unsplash.com/photo-1551028719-2ca1b8e4e5f2?auto=format&fit=crop&w=800&q=60", // Denim Jacket
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=60", // Wool Sweater
    "https://images.unsplash.com/photo-1602810319428-019690571b5b?auto=format&fit=crop&w=800&q=60", // Corduroy Shirt
    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=60", // Casual Chinos
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=60" // Lightweight Hoodie
  ],
  gridWomensFashion: [
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=60", // Shiny Dress
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=60", // Long Dress
    "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=60", // Full Sweater
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=60", // Floral Midi
    "https://images.unsplash.com/photo-1564257577149-47f1cc08c6d6?auto=format&fit=crop&w=800&q=60", // Silk Blouse
    "https://images.unsplash.com/photo-1583846832232-c120d3023e1c?auto=format&fit=crop&w=800&q=60" // Pleated Skirt
  ],
  gridWomenAccessories: [
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=60", // Leather Handbag
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=60", // Gold Necklace
    "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=60", // Silk Scarf
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=60", // Aviator Sunglasses
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=60", // Beaded Bracelet
    "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=60" // Evening Clutch
  ],
  gridMensAccessories: [
    "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=60", // Leather Belt
    "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=60", // Classic Watch
    "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=60", // Leather Wallet
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=60", // Cufflinks Set
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=60", // Sunglasses
    "https://images.unsplash.com/photo-1621186403033-8cffaef1e104?auto=format&fit=crop&w=800&q=60" // Pocket Square
  ],
  gridDiscountDeals: [
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=60", // Summer Dress
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=60", // Cotton T-Shirt
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=60", // Denim Jeans
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=60", // Sneaker Sale
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=60", // Graphic Tee
    "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=60" // Shorts Clearance
  ]
};

const FALLBACK = "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=60";

export default function NewArrivals() {
  const navigate = useNavigate();
  const [active, setActive] = React.useState<string>("gridMensFashion");

  const handleCategory = (key: string) => setActive(key);

  const items = categoryData[active] || [];

  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 12px" }}>
      <header style={{ textAlign: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 36, color: "#484848", fontFamily: "Volkhov" }}>New Arrivals</h2>
        <p style={{ color: "#8A8A8A", fontFamily: "Poppins" }}>Hand-picked trending items — updated weekly for you.</p>
      </header>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
        <button
          onClick={() => handleCategory("gridMensFashion")}
          style={{
            padding: "8px 16px",
            borderRadius: 999,
            background: active === "gridMensFashion" ? "#000" : "#FAFAFA",
            color: active === "gridMensFashion" ? "#fff" : "#8A8A8A"
          }}
        >
          Men's Fashion
        </button>
        <button
          onClick={() => handleCategory("gridWomensFashion")}
          style={{
            padding: "8px 16px",
            borderRadius: 999,
            background: active === "gridWomensFashion" ? "#000" : "#FAFAFA",
            color: active === "gridWomensFashion" ? "#fff" : "#8A8A8A"
          }}
        >
          Women's Fashion
        </button>
        <button
          onClick={() => handleCategory("gridWomenAccessories")}
          style={{
            padding: "8px 16px",
            borderRadius: 999,
            background: active === "gridWomenAccessories" ? "#000" : "#FAFAFA",
            color: active === "gridWomenAccessories" ? "#fff" : "#8A8A8A"
          }}
        >
          Women's Accessories
        </button>
        <button
          onClick={() => handleCategory("gridMensAccessories")}
          style={{
            padding: "8px 16px",
            borderRadius: 999,
            background: active === "gridMensAccessories" ? "#000" : "#FAFAFA",
            color: active === "gridMensAccessories" ? "#fff" : "#8A8A8A"
          }}
        >
          Men's Accessories
        </button>
        <button
          onClick={() => handleCategory("gridDiscountDeals")}
          style={{
            padding: "8px 16px",
            borderRadius: 999,
            background: active === "gridDiscountDeals" ? "#000" : "#FAFAFA",
            color: active === "gridDiscountDeals" ? "#fff" : "#8A8A8A"
          }}
        >
          Discount Deals
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {items.map((it, i) => {
        
          const set = imageSets[active];
          const src = set && set.length > 0 ? set[i % set.length] : FALLBACK;
          return (
            <article key={it.id} onClick={() => navigate("/shop?collection=new-arrivals")} className="na-card">
              <div className="na-img-wrapper" style={{ position: "relative" }}>
                <img
                  src={src}
                  onError={e => ((e.currentTarget as HTMLImageElement).src = FALLBACK)}
                  alt={it.name}
                  className="na-img"
                  style={{ width: "100%", height: 300, objectFit: "cover" }}
                />
                <div
                  className="na-badge"
                  style={{
                    position: "absolute",
                    left: 8,
                    top: 8,
                    background: "rgba(255,255,255,0.9)",
                    padding: "6px 10px",
                    borderRadius: 999,
                    fontSize: 12
                  }}
                >
                  {it.subName}
                </div>
              </div>
              <div style={{ padding: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{it.name}</div>
                  <div style={{ color: "#666" }}>{it.rating?.toFixed(1) ?? "0.0"}</div>
                </div>
                <div style={{ marginTop: 8, color: "#7A7A7A", fontSize: 13 }}>{it.review}</div>
                <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{it.price}</div>
                  {it.soldOut !== undefined && (
                    <div style={{ color: it.soldOut === false ? "#D97706" : "#059669" }}>
                      {it.soldOut === false ? "Almost Sold Out" : "In Stock"}
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div style={{ textAlign: "center", marginTop: 24 }}>
        <button
          onClick={() => navigate("/shop")}
          className="na-view-more-btn"
          style={{ padding: "10px 24px", borderRadius: 8, background: "#000", color: "#fff", cursor: "pointer" }}
        >
          View More
        </button>
      </div>
    </section>
  );
}
