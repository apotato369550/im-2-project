import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import { Plus, Search, Filter} from "lucide-react";
import { ItemCard } from '../../components/ItemCard';
import axios from 'axios';

const InventoryPage = () => {
  const [activeItem, setActiveItem] = useState("Inventory");
  const [searchQuery, setSearchQuery] = useState("");
  const [itemData, setItemData] = useState([])
  
  useEffect(() => {
    console.log("Works");
    const userData = JSON.parse(localStorage.getItem("user_data"));
    console.log(userData);
    axios
      .get("http://localhost/im-2-project/api/items", {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      })
      .then((response) => {
        console.log("Data from API");
        console.log(response);

        console.log("Data from API:", response.data);

        const formattedItems = response.data.map((item) => ({
          item_id: item.item_id,
          supplier_id: item.supplier_id,
          manager_id: item.manager_id,
          model: item.model || "Unnamed Model",
          image_path: `/inventory/${
            item.image_path?.split("/").pop() || "default.jpg"
          }`,
          type: item.type || "Unknown",
          inverter: item.inverter?.toLowerCase() === "yes",
          horsepower: parseFloat(item.horsepower) || 0,
          brand: item.brand || "Unknown",
          is_removed: item.is_removed === 1,
        }));

        console.log("Formatted items:", formattedItems);

        setItemData(formattedItems)

        // You can store it in a state variable if you want to render it
        // setItems(formattedItems);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  const filteredAssignments = itemData.filter(
    (item) =>
      item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.inverter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.is_removed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activeItem={activeItem}
        onItemChange={setActiveItem}
        onLogout={handleLogout}
      />

      {/* Main Content */}

      <div className="flex-1 flex flex-col pb-8">
        {/* Header Section */}
        <div className="p-8 pb-0">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold font-alegreya-sans-sc text-cbvt-navy">
                {activeItem}
              </h1>
              <p className="text-cbvt-dark-gray mb-6">
                Manage product inventory.
              </p>
            </div>
            <button className="flex items-center bg-cbvt-navy h-[40px] px-4 rounded-2xl text-white mr-10 ">
              <Plus className="h-3 w-3 mr-2" />
              <span className="text-xs">Create Item</span>
            </button>
          </div>

          <div className="flex flex-row">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative bg-white border border-gray-200 rounded-3xl h-[38px] w-full max-w-[382px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search inventory..."
                  className="w-full h-full pl-10 pr-4 rounded-3xl focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="h-[38px] w-[101px] bg-white border border-gray-200 ml-[17px] rounded-3xl p-1 flex items-center">
              <Filter className="h-3 w-3 ml-3 text-gray-500" />
              <p className="text-gray-500 ml-2">Filter</p>
            </div>
          </div>
        </div>

        {/* Assignments Grid */}

        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex flex-col">
            {/* List Header */}
            <div className="hidden md:grid grid-cols-12 gap-2 px-5 py-2 bg-gray-100 font-medium text-cbvt-dark-gray">
              <div className="col-span-3">Item</div>
              <div className="col-span-2">Brand/Type</div>
              <div className="col-span-3">Model</div>
              <div className="col-span-2">HP</div>
              <div className="col-span-1">Inverter</div>
              <div className="col-span-1">Actions</div>
            </div>

            {/* List Items */}
            {itemData.map((item) => (
              <ItemCard
                key={item.item_id}
                item_id={item.item_id}
                supplier_id={item.supplier_id}
                model={item.model}
                manager_id={item.manager_id}
                price={item.price}
                image_path={item.image_path}
                type={item.type}
                inverter={item.inverter}
                horsepower={item.horsepower}
                brand={item.brand}
                is_removed={item.is_removed}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;