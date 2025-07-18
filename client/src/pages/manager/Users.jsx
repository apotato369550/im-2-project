import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Plus, Search, Filter } from "lucide-react";
import { CustomerCard } from "../../components/CustomerCard";
import SortingDropdown from '../../components/SortingDropdown';
import axios from "axios";

const UsersPage = () => {
  const [activeItem, setActiveItem] = useState("Users");
  
  // Search and filter states (following TasksPage pattern)
  const [customerData, setCustomerData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [output, setOutput] = useState([]);
  const [sortOption, setSortOption] = useState('default');


   useEffect(() => {
    console.log("Works");
    const userData = JSON.parse(localStorage.getItem("user_data"));
    console.log(userData);
    axios
      .get("http://localhost/im-2-project/api/users/fetch-list", {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      })
      .then((response) => {
        console.log(response);
        /*
        format of data from api:
        [
          {
              "image_path": null
              "order_count": 0
              "total_spent": "0.000"
              "user_email": "miggycarumba912@gmail.com"
              "user_full_name": "Jose Carumba"
              "user_id": 12
              "user_type": "worker"
              "is_removed": 0
          }
        ]

        format i want it turned into:
        [
          {
            Name: "Jan Aloyon",
            DateJoined: "2/14/2023",
            Address: "Cebu City",
            Email: "jhen.aloyon@gmail.com",
            Orders: 5,
            TotalSpent: "₱27",
            is_removed: 0,
          },
      ]
        */
        console.log("Raw API data:", response.data);

        // Convert API response to your desired format
        const formattedData = response.data.map((user) => ({
          CustomerID: user.user_id,
          Name: user.user_full_name,
          DateJoined: "2/14/2023", // <-- placeholder or use real value if available
          Address: "Cebu City", // <-- placeholder or add this to your backend
          Email: user.user_email,
          Orders: user.order_count,
          TotalSpent: `₱${parseFloat(user.total_spent).toFixed(2)}`,
          is_removed: user.is_removed || 0, // Add is_removed field
        }));

        console.log("Formatted data:", formattedData);
        setCustomerData(formattedData);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);
 

  // Filter out soft-deleted customers (following TasksPage pattern)kd
  const activeCustomers = customerData.filter(customer => customer.is_removed === 0);

  // Initialize output with active customers
  useEffect(() => {
    setOutput(activeCustomers);
  }, [activeCustomers]);

  // Combined search and sort functionality (following TasksPage pattern)
  useEffect(() => {
    let results = activeCustomers.filter(customer =>
      customer.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.Address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    results = sortData(results, sortOption);
    setOutput(results);
  }, [searchQuery, sortOption, activeCustomers]);

  // Sorting function (following TasksPage pattern)
  const sortData = (data, option) => {
    const sorted = [...data];
    switch(option) {
      case 'name-asc':
        return sorted.sort((a, b) => a.Name.localeCompare(b.Name));
      case 'name-desc':
        return sorted.sort((a, b) => b.Name.localeCompare(a.Name));
      default:
        return data;
    }
  };

 

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
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Section */}
        <div className="p-8 pb-0">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold font-alegreya-sans-sc text-cbvt-navy">
                {activeItem}
              </h1>
              <p className="text-cbvt-dark-gray mb-6">
                Manage customer information.
              </p>
            </div>
            <button className="flex items-center bg-cbvt-navy h-[40px] px-4 rounded-2xl text-white mr-10 ">
              <Plus className="h-3 w-3 mr-2" />
              <span className="text-xs">Add New User</span>
            </button>
          </div>

          <div className="flex flex-row">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative bg-white border border-gray-200 rounded-3xl h-[38px] w-full max-w-[382px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full h-full pl-10 pr-4 rounded-3xl focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Sort Dropdown (replacing the simple Filter button) */}
            <SortingDropdown 
              onSortChange={(sortValue) => setSortOption(sortValue)}
            />
          </div>
        </div>

        {/* Customers Grid */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="grid grid-cols-3 gap-5 mt-5">
            {output.map((customer) => (
              <CustomerCard
                key={customer.CustomerID} //Name, Address, DateJoined, Email, Orders, TotalSpent
                Name={customer.Name}
                Address={customer.Address}
                DateJoined={customer.DateJoined}
                Email={customer.Email}
                Orders={customer.Orders}
                TotalSpent={customer.TotalSpent}
                is_removed={customer.is_removed}
                onDelete={handleCustomerDelete}
                onEdit={handleCustomerEdit}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;