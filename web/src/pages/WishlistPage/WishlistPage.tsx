import { Header } from "../../components/common/Header";
import Footer from "../../components/common/Footer/Footer";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./WishlistPage.css";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product, product.sizes[0], product.colors[0]);
  };

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <svg
            key={star}
            className="h-4 w-4"
            fill={star <= Math.floor(rating) ? "#FFC107" : "#E0E0E0"}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="wishlist-page">
        <div className="wishlist-container">

          <div className="wishlist-header">
            <h1 className="wishlist-title">My Wishlist</h1>
            <p className="wishlist-subtitle">
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
            </p>
          </div>

          {wishlist.length === 0 ? (
            <div className="wishlist-empty">
              <div className="wishlist-empty-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69365 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69365 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61V4.61Z" />
                </svg>
              </div>
              <h2 className="wishlist-empty-title">Your wishlist is empty</h2>
              <p className="wishlist-empty-text">Save your favorite items here and buy them later</p>
              <Link to="/shop" className="wishlist-empty-button">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="wishlist-grid">
              {wishlist.map(product => (
                <div key={product._id} className="wishlist-card">
                  <div className="wishlist-card-image-container">
                    <img src={product.images[0]} alt={product.name} className="wishlist-card-image" />
                    <button
                      onClick={() => removeFromWishlist(product._id)}
                      className="wishlist-card-remove"
                      aria-label="Remove from wishlist"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="wishlist-card-content">
                    <div className="wishlist-card-header">
                      <div>
                        <h3 className="wishlist-card-title">{product.name}</h3>
                        <p className="wishlist-card-brand">{product.brand}</p>
                      </div>
                      <StarRating rating={product.rating} />
                    </div>

                    <p className="wishlist-card-reviews">({product.reviews.toLocaleString()}) Reviews</p>

                    <div className="wishlist-card-tags">
                      {product.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="wishlist-card-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="wishlist-card-footer">
                      <span className="wishlist-card-price">${product.price.toFixed(2)}</span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="wishlist-card-add-cart"
                        disabled={!product.inStock}
                      >
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishlistPage;
