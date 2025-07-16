import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BreadCrumbs from "../components/BreadCrumbs";
import Modal from "react-modal";
import axios from 'axios';
  
// const sampleProducts = [
//   {
//     id: 1,
//     brand: "American Home",
//     model: "AHAC2409RT",
//     price: 9000,
//     hp: "1.0HP",
//     inverterType: "inverter",
//     type: "Window Type",
//     image: "/images/ahac2409rt.png",
//     category: "window",
//   },
//   {
//     id: 2,
//     brand: "Carrier",
//     model: "XPower Gold",
//     price: 15800,
//     hp: "1.5HP",
//     inverterType: "non-inverter",
//     type: "Split Type",
//     image: "/images/xpower-gold.png",
//     category: "split",
//   },

//   ...Array.from({ length: 9}, (_, i) => ({
//     id: i + 3,
//     brand: "Sample Brand",
//     model: `Model ${i + 3}`,
//     hp: `${1.5 + i * 0.5}HP`,
//     type: i % 2 === 0 ? "Split Type" : "Window Type",
//     price: 12000 + i * 1000,
//     image: null,
//     category: i % 2 === 0 ? "split" : "window",
//     inverterType: i % 2 === 0 ? "inverter" : "non-inverter"
//   })),
// ];

Modal.setAppElement('#root');

const Catalog = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [selectedProduct, setselectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    type: "all",
    brand: "any",
    horsepower: "any",
    inverter: "all"
  });
  const [sortBy, setSortBy] = useState("default");
  const [itemList, setItemList] = useState([]);

  
  useEffect(()=>{
    axios.get("http://localhost/im-2-project/api/items")
    .then((response)=>{
      const updatedProducts = response.data
      .map((product) => ({
        ...product,
        image_path: `http://localhost/im-2-project/${product.image_path.replace(/^(\.\.\/)+/, '')}`
      }))
      .filter(product => product.is_removed !== 1);
      setItemList(updatedProducts);
    })
    .catch((e)=>{
      console.log(e);
    })
  }, [])

  const openModal = (product) => {
    setselectedProduct(product);
    setmodalIsOpen(true);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleModalRequestClick = () => {
    handleCloseModal();
    navigate(`/order-form?service=Retail&item_id=${selectedProduct.item_id}`, {
      state: { 
        selectedProduct: selectedProduct
      }
    });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleRequestClick = (prod, e) => {
    e.stopPropagation();
    navigate(`/order-form?service=Retail&item_id=${prod.item_id}`, {
    state: { 
      selectedProduct: prod
    }
    });
  };



  const handleCloseModal = () => {
    setmodalIsOpen(false);
    setselectedProduct(null);
  };

  // Filter and sort products
  const filteredAndSortedProducts = itemList
    .filter(product => {
      if (filters.type !== "all" && !product.type.toLowerCase().includes(filters.type)) {
        return false;
      }
      
      if (filters.brand !== "any" && product.brand.toLowerCase() !== filters.brand) {
        return false;
      }
 
      if (filters.hp !== "any" && product.hp !== filters.hp) {
        return false;
      }
      
      if (filters.inverter !== "all" && product.inverterType !== filters.inverter) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.brand.localeCompare(b.brand);
        default:
          return 0;
      }
    });

  return (
    <>
      <div className="bg-white min-h-screen">
        <Navbar />
        <BreadCrumbs crumb="Catalog" title="Explore available Units" />

        <div className="flex flex-row px-28 gap-4 py-10">
          {/* Product Filter Sidebar (HTML only, no logic) */}
          <div className="w-60 space-y-8">
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
                  <div>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="type" 
                        value="all"
                        checked={filters.type === "all"}
                        onChange={(e) => handleFilterChange("type", e.target.value)}
                        className="sr-only" 
                      />
                      <span className="text-[16px] font-carme text-black hover:text-cbvt-blue transition-colors">
                        All Types
                      </span>
                    </label>
                    <div className="w-48 h-px bg-cbvt-sky mt-2"></div>
                  </div>
                  <div>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="type" 
                        value="window"
                        checked={filters.type === "window"}
                        onChange={(e) => handleFilterChange("type", e.target.value)}
                        className="sr-only" 
                      />
                      <span className="text-[16px] font-carme text-black hover:text-cbvt-blue transition-colors">
                        Window Type
                      </span>
                    </label>
                    <div className="w-48 h-px bg-cbvt-sky mt-2"></div>
                  </div>
                  <div>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="type" 
                        value="split"
                        checked={filters.type === "split"}
                        onChange={(e) => handleFilterChange("type", e.target.value)}
                        className="sr-only" 
                      />
                      <span className="text-[16px] font-carme text-black hover:text-cbvt-blue transition-colors">
                        Split Type
                      </span>
                    </label>
                    <div className="w-48 h-px bg-cbvt-sky mt-2"></div>
                  </div>
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
                    onChange={(e) => handleFilterChange("brand", e.target.value)}
                    className="w-48 h-10 bg-gray-100 rounded-full px-4 pr-10 text-[16px] font-carme text-gray-500 appearance-none cursor-pointer border-2 border-transparent focus:border-cbvt-sky focus:outline-none transition-colors"
                  >
                    <option value="any">Any Brand</option>
                    <option value="american home">American Home</option>
                    <option value="carrier">Carrier</option>
                    <option value="sample brand">Sample Brand</option>
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none w-18">
                    <span className="text-gray-500 text-xs">▼</span>
                  </div>
                </div>
              </div>

              {/* HP Filter */}
              <div className="mb-8">
                <h3 className="text-[24px] font-alegreya-sans-sc font-bold text-cbvt-navy mb-4">
                  HP
                </h3>
                <div className="relative">
                  <select 
                    value={filters.hp}
                    onChange={(e) => handleFilterChange("hp", e.target.value)}
                    className="w-48 h-10 bg-gray-100 rounded-full px-4 pr-10 text-[16px] font-carme text-gray-500 appearance-none cursor-pointer border-2 border-transparent focus:border-cbvt-sky focus:outline-none transition-colors"
                  >
                    <option value="any">Any HP</option>
                    <option value="1.0HP">1.0HP</option>
                    <option value="1.5HP">1.5HP</option>
                    <option value="2.0HP">2.0HP</option>
                    <option value="2.5HP">2.5HP</option>
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none w-18">
                    <span className="text-gray-500 text-xs">▼</span>
                  </div>
                </div>
              </div>

              {/* Inverter Filter */}
              <div>
                <h3 className="text-[24px] font-alegreya-sans-sc font-bold text-cbvt-navy mb-4">
                  Inverter
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="inverter" 
                        value="all"
                        checked={filters.inverter === "all"}
                        onChange={(e) => handleFilterChange("inverter", e.target.value)}
                        className="sr-only" 
                      />
                      <span className="text-[16px] font-carme text-black hover:text-cbvt-blue transition-colors">
                        All
                      </span>
                    </label>
                    <div className="w-48 h-px bg-cbvt-sky mt-2"></div>
                  </div>
                  <div>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="inverter" 
                        value="inverter"
                        checked={filters.inverter === "inverter"}
                        onChange={(e) => handleFilterChange("inverter", e.target.value)}
                        className="sr-only" 
                      />
                      <span className="text-[16px] font-carme text-black hover:text-cbvt-blue transition-colors">
                        Inverter
                      </span>
                    </label>
                    <div className="w-48 h-px bg-cbvt-sky mt-2"></div>
                  </div>
                  <div>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="inverter" 
                        value="non-inverter"
                        checked={filters.inverter === "non-inverter"}
                        onChange={(e) => handleFilterChange("inverter", e.target.value)}
                        className="sr-only" 
                      />
                      <span className="text-[16px] font-carme text-black hover:text-cbvt-blue transition-colors">
                        Non-inverter
                      </span>
                    </label>
                    <div className="w-48 h-px bg-cbvt-sky mt-2"></div>
                  </div>
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
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-48 h-12 bg-gray-100 rounded-full px-4 pr-10 text-[16px] font-carme text-gray-600 appearance-none cursor-pointer border-2 border-transparent focus:border-cbvt-sky focus:outline-none transition-colors"
                >
                  <option value="default">Default Sorting</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none w-38 flex justify-end pr-4">
                  <span className="text-gray-500 text-xs">▼</span>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-4 p-2 gap-6">
              {filteredAndSortedProducts.length > 0 ? (
                filteredAndSortedProducts.map((prod) => (
                  <div
                    key={prod.item_id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
                    onClick={() => openModal(prod)}
                  >
                    <div className="h-32 bg-gray-100 flex items-center justify-center">
                      {prod.image_path ? (
                        <img
                          src={prod.image_path}
                          alt={`${prod.brand} ${prod.model}`}
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <span className="text-gray-400 text-center px-4">
                          {prod.image || "{item.image}"}
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="text-[14px] font-alegreya-sans-sc font-bold text-cbvt-navy capitalize mb-2">
                        {prod.brand} {prod.model}
                      </h3>

                      <p className="text-[10px] font-carme text-cbvt-light-blue capitalize mb-3">
                        {prod.hp} {prod.type} Air Conditioner
                      </p>

                      <div className="flex items-center justify-between">
                        <p className="text-[18px] font-alegreya-sans-sc font-bold text-cbvt-blue capitalize">
                          Php {prod.price.toLocaleString()}
                        </p>

                        <button
                          className="bg-cbvt-navy text-white px-4 py-1 rounded-full text-[10px] font-carme hover:bg-opacity-90 transition-all capitalize"
                          onClick={(e)=>{handleRequestClick(prod, e)}}
                        >
                          request
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-4 flex flex-col items-center justify-center py-16">
                  <h3 className="text-xl font-alegreya-sans-sc font-bold text-gray-600 mb-2">
                    No Products Available
                  </h3>
                  <p className="text-gray-500 text-center">
                    No products match your current filter criteria.<br />
                    Try adjusting your filters to see more results.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal for Product Details */}
        <Modal 
          isOpen={modalIsOpen} 
          onRequestClose={() => setmodalIsOpen(false)} 
          shouldCloseOnOverlayClick={false}
          className="fixed inset-0 flex items-center justify-center p-4 z-50 border-none"
        >
          <div className="max-w-5xl mx-auto bg-white rounded-[20px] border-2 p-8 flex flex-row items-center gap-10 shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setmodalIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none z-10"
            >
              ×
            </button>

            {/* Image */}
            <div className="flex-shrink-0 w-full md:w-[300px]">
              <img
                src={selectedProduct?.image_path || "/path/to/image.png"}
                alt={`${selectedProduct?.brand || ""} ${selectedProduct?.model || ""}`}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold font-alegreya-sans-sc text-cbvt-navy mb-2 pr-14 break-words">
                {selectedProduct?.brand} {selectedProduct?.model}
              </h2>
              <p className="text-lg font-alegreya-sans-sc text-gray-600 mb-6">PHP {selectedProduct?.price?.toLocaleString?.() ?? selectedProduct?.price}</p>

              <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm md:text-base mb-8">
                <div>
                  <p className="text-cbvt-light-blue font-bold uppercase">Brand</p>
                  <p className="text-cbvt-navy">{selectedProduct?.brand}</p>
                </div>
                <div>
                  <p className="text-cbvt-light-blue font-bold uppercase">Horsepower</p>
                  <p className="text-cbvt-navy">{selectedProduct?.horsepower}</p>
                </div>
                <div>
                  <p className="text-cbvt-light-blue font-bold uppercase">Model</p>
                  <p className="text-cbvt-navy">{selectedProduct?.model}</p>
                </div>
                <div>
                  <p className="text-cbvt-light-blue font-bold uppercase">Inverter</p>
                  <p className="text-cbvt-navy">{selectedProduct?.inverter === "YES" ? "Yes" : "No"}</p>
                </div>
                <div>
                  <p className="text-cbvt-light-blue font-bold uppercase">Type</p>
                  <p className="text-cbvt-navy">{selectedProduct?.type}</p>
                </div>
              </div>
              <button 
                onClick={handleModalRequestClick}
                className="bg-cbvt-navy text-white px-10 py-2 rounded-full text-lg font-carme transition-colors cursor-pointer capitalize"
              >
                request
              </button>
            </div>
          </div>
        </Modal>
        <Footer />
      </div>
    </>
  );
};


export default Catalog;
