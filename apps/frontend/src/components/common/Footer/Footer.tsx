import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo & Description */}
          <div>
            <Link to="/" className="mb-4 block text-2xl font-bold text-black">
              FASCO
            </Link>
            <p className="mb-4 text-sm text-gray-600">
              Your one-stop fashion destination for the latest trends and styles.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-4 font-semibold text-black">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-sm text-gray-600 hover:text-black">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop/women" className="text-sm text-gray-600 hover:text-black">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/shop/men" className="text-sm text-gray-600 hover:text-black">
                  Men
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="mb-4 font-semibold text-black">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-black">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-black">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-gray-600 hover:text-black">
                  Shipping
                </Link>
              </li>
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="mb-4 font-semibold text-black">Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-black">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-black">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-black">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-gray-600">Copyright © {new Date().getFullYear()} FASCO. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
