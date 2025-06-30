import { useState } from "react";
import { Link } from "react-router-dom";

// Sample product data
const sampleProducts = [
  {
    id: 1,
    brand: "American Home",
    model: "AHAC2409RT",
    hp: "1.0HP",
    type: "Window Type",
    price: 9000,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1d1e14f4f544df8151f1779317eaa4651264dd5c?width=364",
    category: "window",
    inverterType: "non-inverter",
  },
  // Add placeholder products
  ...Array.from({ length: 7 }, (_, i) => ({
    id: i + 2,
    brand: "Sample Brand",
    model: `Model ${i + 2}`,
    hp: "1.5HP",
    type: "Split Type",
    price: 12000 + i * 1000,
    image: null,
    category: "split",
    inverterType: i % 2 === 0 ? "inverter" : "non-inverter",
  })),
];

export default function Catalog() {
  const [filters, setFilters] = useState({
    type: "all",
    brand: "any",
    inverter: "all",
  });
  const [sortBy, setSortBy] = useState("default");

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <h1 className="text-lg md:text-2xl lg:text-[41px] font-khand font-bold text-cbvt-navy capitalize">
              Cebu Best Value Trading
            </h1>
          </Link>
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/about"
              className="text-[21px] font-alegreya-sans-sc text-cbvt-navy capitalize hover:text-cbvt-blue transition-colors"
            >
              about
            </Link>
            <Link
              to="#contact"
              className="text-[21px] font-alegreya-sans-sc text-cbvt-navy capitalize hover:text-cbvt-blue transition-colors"
            >
              Contact us
            </Link>
            <span className="text-[21px] font-alegreya-sans-sc text-cbvt-navy capitalize">
              catalog
            </span>
            <Link
              to="/login"
              className="bg-cbvt-navy text-white px-6 py-2 rounded-full text-[21px] font-alegreya-sans-sc capitalize hover:bg-opacity-90 transition-all inline-block"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="lg:hidden p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-8 py-4">
        <p className="text-[16px] font-carme text-black capitalize">
          <Link to="/" className="text-black">
            home
          </Link>{" "}
          / <span className="text-cbvt-blue">Catalog</span>
        </p>
      </div>

      {/* Page Title */}
      <div className="container mx-auto px-4 md:px-8 mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-[64px] font-alegreya-sans-sc font-bold text-cbvt-navy capitalize">
          Explore available Units
        </h1>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Filter Sidebar */}
          <div className="lg:w-80 space-y-8">
            <div>
              <h2 className="text-[30px] font-alegreya-sans-sc font-bold text-cbvt-navy mb-6">
                Product Filter
              </h2>

              {/* Type Filter */}
              <div className="mb-8">
                <h3 className="text-[24px] font-alegreya-sans-sc font-bold text-cbvt-navy mb-4">
                  Type
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Portable", value: "portable" },
                    { label: "Window Type", value: "window" },
                    { label: "Split Type", value: "split" },
                  ].map((option) => (
                    <div key={option.value}>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value={option.value}
                          checked={filters.type === option.value}
                          onChange={(e) =>
                            handleFilterChange("type", e.target.value)
                          }
                          className="sr-only"
                        />
                        <span className="text-[16px] font-carme text-black hover:text-cbvt-blue transition-colors">
                          {option.label}
                        </span>
                      </label>
                      <div className="w-48 h-px bg-cbvt-sky mt-2"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-8">
                <h3 className="text-[24px] font-alegreya-sans-sc font-bold text-cbvt-navy mb-4">
                  Brand
                </h3>
                <div className="relative">
                  <select
                    value={filters.brand}
                    onChange={(e) =>
                      handleFilterChange("brand", e.target.value)
                    }
                    className="w-48 h-10 bg-gray-100 rounded-full px-4 text-[16px] font-carme text-black appearance-none cursor-pointer"
                  >
                    <option value="any">Any Brand</option>
                    <option value="american-home">American Home</option>
                    <option value="lg">LG</option>
                    <option value="samsung">Samsung</option>
                    <option value="daikin">Daikin</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <span className="text-[16px] text-gray-500">v</span>
                  </div>
                </div>
              </div>

              {/* Inverter Filter */}
              <div>
                <h3 className="text-[24px] font-alegreya-sans-sc font-bold text-cbvt-navy mb-4">
                  inverter
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Inverter", value: "inverter" },
                    { label: "Non-inverter", value: "non-inverter" },
                  ].map((option) => (
                    <div key={option.value}>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="inverter"
                          value={option.value}
                          checked={filters.inverter === option.value}
                          onChange={(e) =>
                            handleFilterChange("inverter", e.target.value)
                          }
                          className="sr-only"
                        />
                        <span className="text-[16px] font-carme text-black hover:text-cbvt-blue transition-colors">
                          {option.label}
                        </span>
                      </label>
                      <div className="w-48 h-px bg-cbvt-sky mt-2"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Dropdown */}
            <div className="flex justify-end mb-6">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-48 h-12 bg-gray-100 rounded-full px-4 text-[16px] font-carme text-gray-600 appearance-none cursor-pointer"
                >
                  <option value="default">Default Sorting</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <span className="text-[16px] text-gray-500">v</span>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {sampleProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="h-32 bg-gray-100 flex items-center justify-center">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={`${product.brand} ${product.model}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-400 text-center px-4">
                        {product.image || "{item.image}"}
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-[14px] font-alegreya-sans-sc font-bold text-cbvt-navy capitalize mb-2">
                      {product.brand} {product.model}
                    </h3>

                    <p className="text-[10px] font-carme text-cbvt-light-blue capitalize mb-3">
                      {product.hp} {product.type} Air Conditioner
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-[18px] font-alegreya-sans-sc font-bold text-cbvt-blue capitalize">
                        Php {product.price.toLocaleString()}
                      </p>

                      <button className="bg-cbvt-navy text-white px-4 py-1 rounded-full text-[10px] font-carme hover:bg-opacity-90 transition-all">
                        request
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-cbvt-navy py-4 mt-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <p className="text-[19px] font-carme text-cbvt-light">
            © 2025 Cebu Best Value Trading. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
