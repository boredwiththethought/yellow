import { Link } from "react-router-dom";
import type { Product } from "../../../types";
import { useWishlist } from "../../../context/WishlistContext";
import { HeartIcon } from "../../../vector/icons/HeartIcon";
import "./CellItem.css";

interface CellItemProps {
  product: Product;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <svg
          key={star}
          className="h-4 w-4"
          fill={star <= Math.floor(rating) ? "#FFC107" : star - 0.5 <= rating ? "url(#half)" : "#E0E0E0"}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#FFC107" />
              <stop offset="50%" stopColor="#E0E0E0" />
            </linearGradient>
          </defs>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export const CellItem = ({ product }: CellItemProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product._id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link to={`/product/${product._id}`} className="cell-item">
   
      <div className="cell-image-container">
        <img src={product.images[0]} alt={product.name} className="cell-image cell-image-main" />
        {product.images[1] && (
          <img src={product.images[1]} alt={`${product.name} alternate`} className="cell-image cell-image-hover" />
        )}

     
        <button
          onClick={handleToggleWishlist}
          className={`cell-wishlist-btn ${inWishlist ? "active" : ""}`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <HeartIcon filled={inWishlist} />
        </button>

      
        {!product.inStock && <div className="cell-stock-badge out-of-stock">Out of Stock</div>}
      </div>

   
      <div className="cell-info">
        <div className="cell-info-header">
          <div className="cell-title-group">
            <h4 className="cell-title">{product.name}</h4>
            <p className="cell-brand">{product.brand}</p>
          </div>
          <StarRating rating={product.rating} />
        </div>

        <p className="cell-reviews">({product.reviews.toLocaleString()}) Customer Reviews</p>

        <div className="cell-footer">
          <span className="cell-price">${product.price.toFixed(2)}</span>
          <div className="flex items-center gap-2">
            {product.inStock && <span className="cell-stock-badge in-stock">In Stock</span>}
          </div>
        </div>

     
        {product.tags && product.tags.length > 0 && (
          <div className="cell-tags">
            {product.tags.slice(0, 3).map(tag => (
              <span key={tag} className="cell-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};
