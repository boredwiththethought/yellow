import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDownIcon } from "../../../vector/icons";
import type {
  filterSize,
  filterColors,
  filterPrice,
  filterBrands,
  filterCollections,
  filterTags
} from "../../shop/CellItem";
import { initialFilters } from "../../shop/CellItem";
import "./Filters.css";

interface FiltersProps {
  onFilterChange?: (filters: any) => void;
}

export const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [searchParams] = useSearchParams();
  const [sizes, setSizes] = React.useState<filterSize[]>(initialFilters.sizes);
  const [colors, setColors] = React.useState<filterColors[]>(initialFilters.colors);
  const [prices, setPrices] = React.useState<filterPrice[]>(initialFilters.price);
  const [brands, setBrands] = React.useState<filterBrands[]>(initialFilters.brands);
  const [collections, setCollections] = React.useState<filterCollections[]>(initialFilters.collections);
  const [tags, setTags] = React.useState<filterTags[]>(initialFilters.tags);

  const [openSections, setOpenSections] = React.useState({
    size: true,
    color: true,
    price: true,
    brand: true,
    collection: true,
    tags: true
  });


  useEffect(() => {
    const collectionParam = searchParams.get("collection");
    if (collectionParam) {
  
      const newCollections = collections.map(col =>
        col.label.toLowerCase().replace(/ /g, "-") === collectionParam.toLowerCase() ? { ...col, checked: true } : col
      );
      setCollections(newCollections);
      notifyFilterChange({ sizes, colors, prices, brands, collections: newCollections, tags });
    }
  }, [searchParams]);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSizeChange = (id: number) => {
    const newSizes = sizes.map(size => (size.id === id ? { ...size, checked: !size.checked } : size));
    setSizes(newSizes);
    notifyFilterChange({ sizes: newSizes, colors, prices, brands, collections, tags });
  };

  const handleColorChange = (id: number) => {
    const newColors = colors.map(color => (color.id === id ? { ...color, checked: !color.checked } : color));
    setColors(newColors);
    notifyFilterChange({ sizes, colors: newColors, prices, brands, collections, tags });
  };

  const handlePriceChange = (id: number) => {
    const newPrices = prices.map(price => (price.id === id ? { ...price, checked: !price.checked } : price));
    setPrices(newPrices);
    notifyFilterChange({ sizes, colors, prices: newPrices, brands, collections, tags });
  };

  const handleBrandChange = (id: number) => {
    const newBrands = brands.map(brand => (brand.id === id ? { ...brand, checked: !brand.checked } : brand));
    setBrands(newBrands);
    notifyFilterChange({ sizes, colors, prices, brands: newBrands, collections, tags });
  };

  const handleCollectionChange = (id: number) => {
    const newCollections = collections.map(collection =>
      collection.id === id ? { ...collection, checked: !collection.checked } : collection
    );
    setCollections(newCollections);
    notifyFilterChange({ sizes, colors, prices, brands, collections: newCollections, tags });
  };

  const handleTagChange = (id: number) => {
    const newTags = tags.map(tag => (tag.id === id ? { ...tag, checked: !tag.checked } : tag));
    setTags(newTags);
    notifyFilterChange({ sizes, colors, prices, brands, collections, tags: newTags });
  };

  const notifyFilterChange = (filters: any) => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };

  const resetFilters = () => {
    setSizes(initialFilters.sizes);
    setColors(initialFilters.colors);
    setPrices(initialFilters.price);
    setBrands(initialFilters.brands);
    setCollections(initialFilters.collections);
    setTags(initialFilters.tags);
    notifyFilterChange({
      sizes: initialFilters.sizes,
      colors: initialFilters.colors,
      prices: initialFilters.price,
      brands: initialFilters.brands,
      collections: initialFilters.collections,
      tags: initialFilters.tags
    });
  };

  return (
    <div className="filters-container">
      <div className="filters-header">
        <h3 className="filters-title">Filters</h3>
        <button onClick={resetFilters} className="filters-reset">
          Reset All
        </button>
      </div>

    
      <div className="filter-section">
        <button onClick={() => toggleSection("size")} className="filter-section-header">
          <span className="filter-section-title">Size</span>
          <ChevronDownIcon className={`filter-chevron ${openSections.size ? "open" : ""}`} />
        </button>
        <div className={`filter-content ${openSections.size ? "open" : ""}`}>
          <div className="flex flex-wrap gap-2">
            {sizes.map(size => (
              <button
                key={size.id}
                onClick={() => handleSizeChange(size.id)}
                className={`rounded-md border px-3 py-1 text-sm transition ${
                  size.checked ? "border-black bg-black text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                aria-pressed={size.checked}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
      </div>

   
      <div className="filter-section">
        <button onClick={() => toggleSection("color")} className="filter-section-header">
          <span className="filter-section-title">Colors</span>
          <ChevronDownIcon className={`filter-chevron ${openSections.color ? "open" : ""}`} />
        </button>
        <div className={`filter-content ${openSections.color ? "open" : ""}`}>
          <div className="filter-color-grid">
            {colors.map(color => (
              <div
                key={color.id}
                onClick={() => handleColorChange(color.id)}
                className={`filter-color-swatch ${color.checked ? "checked" : ""}`}
                style={{ backgroundColor: color.colorCode }}
                title={color.label}
              />
            ))}
          </div>
        </div>
      </div>

  
      <div className="filter-section">
        <button onClick={() => toggleSection("price")} className="filter-section-header">
          <span className="filter-section-title">Price</span>
          <ChevronDownIcon className={`filter-chevron ${openSections.price ? "open" : ""}`} />
        </button>
        <div className={`filter-content ${openSections.price ? "open" : ""}`}>
          <div className="filter-checkbox-list">
            {prices.map(price => (
              <label key={price.id} className="filter-checkbox-item">
                <input
                  type="checkbox"
                  checked={price.checked}
                  onChange={() => handlePriceChange(price.id)}
                  className="filter-checkbox"
                />
                <span className="filter-checkbox-label">{price.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

   
      <div className="filter-section">
        <button onClick={() => toggleSection("brand")} className="filter-section-header">
          <span className="filter-section-title">Brands</span>
          <ChevronDownIcon className={`filter-chevron ${openSections.brand ? "open" : ""}`} />
        </button>
        <div className={`filter-content ${openSections.brand ? "open" : ""}`}>
          <div className="filter-checkbox-list">
            {brands.map(brand => (
              <label key={brand.id} className="filter-checkbox-item">
                <input
                  type="checkbox"
                  checked={brand.checked}
                  onChange={() => handleBrandChange(brand.id)}
                  className="filter-checkbox"
                />
                <span className="filter-checkbox-label">{brand.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

 
      <div className="filter-section">
        <button onClick={() => toggleSection("collection")} className="filter-section-header">
          <span className="filter-section-title">Collections</span>
          <ChevronDownIcon className={`filter-chevron ${openSections.collection ? "open" : ""}`} />
        </button>
        <div className={`filter-content ${openSections.collection ? "open" : ""}`}>
          <div className="filter-checkbox-list">
            {collections.map(collection => (
              <label key={collection.id} className="filter-checkbox-item">
                <input
                  type="checkbox"
                  checked={collection.checked}
                  onChange={() => handleCollectionChange(collection.id)}
                  className="filter-checkbox"
                />
                <span className="filter-checkbox-label">{collection.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

 
      <div className="filter-section">
        <button onClick={() => toggleSection("tags")} className="filter-section-header">
          <span className="filter-section-title">Tags</span>
          <ChevronDownIcon className={`filter-chevron ${openSections.tags ? "open" : ""}`} />
        </button>
        <div className={`filter-content ${openSections.tags ? "open" : ""}`}>
          <div className="filter-tags-grid">
            {tags.map(tag => (
              <button
                key={tag.id}
                onClick={() => handleTagChange(tag.id)}
                className={`filter-tag ${tag.checked ? "checked" : ""}`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
