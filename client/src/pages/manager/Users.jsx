import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Plus, Search, Filter } from "lucide-react";
import { CustomerCard } from "../../components/CustomerCard";
import SortingDropdown from '../../components/SortingDropdown';
import axios from "axios";

const UsersPage = () => {
  const [activeItem, setActiveItem] = useState("Users");
  
  // Core data states
  const [customerData, setCustomerData] = useState([]);
  const [displayCustomers, setDisplayCustomers] = useState([]);
  
  // UI states
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch customer data
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const userData = JSON.parse(localStorage.getItem("user_data"));
        
        if (!userData || !userData.token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          "http://localhost/im-2-project/api/users/fetch-list",
          {
            headers: {
              Authorization: "Bearer " + userData.token,
            },
          }
        );

        console.log("Raw API data:", response.data);

        // Filter and format customer data (exclude workers)
        const formattedCustomers = response.data
          .filter(user => user.user_type !== "worker") // Only get customers
          .map((user) => ({
            CustomerID: user.user_id,
            Name: user.user_full_name,
            DateJoined: formatDate(user.created_at) || "N/A", // Use actual date if available
            Address: user.address || "Not provided", // Use actual address if available
            Email: user.user_email,
            Orders: user.order_count || 0,
            TotalSpent: `₱${parseFloat(user.total_spent || 0).toFixed(2)}`,
            is_removed: user.is_removed || 0,
            user_type: user.user_type,
          }));

        console.log("Formatted customers:", formattedCustomers);
        setCustomerData(formattedCustomers);
        
      } catch (error) {
        console.error("Error fetching customers:", error);
        setError(error.message || "Failed to fetch customers");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return null;
    }
  };

  // Combined filter and sort effect
  useEffect(() => {
    console.log("Customer data in filter effect:", customerData);
    
    // Filter out soft-deleted customers
    const activeCustomers = customerData.filter(customer => {
      console.log(`Customer ${customer.Name}: is_removed = ${customer.is_removed} (type: ${typeof customer.is_removed})`);
      return customer.is_removed === 0 || customer.is_removed === "0" || customer.is_removed === false || customer.is_removed === null || customer.is_removed === undefined;
    });
    
    console.log("Active customers after filtering:", activeCustomers);
    
    // Apply search filter
    let results = activeCustomers.filter(customer =>
      customer.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.Address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log("Results after search filter:", results);

    // Apply sorting
    results = sortCustomers(results, sortOption);
    
    console.log("Final results after sorting:", results);
    
    setDisplayCustomers(results);
  }, [searchQuery, sortOption, customerData]);

  // Sorting function
  const sortCustomers = (customers, option) => {
    const sorted = [...customers];
    switch(option) {
      case 'name-asc':
        return sorted.sort((a, b) => a.Name.localeCompare(b.Name));
      case 'name-desc':
        return sorted.sort((a, b) => b.Name.localeCompare(a.Name));
      case 'orders-asc':
        return sorted.sort((a, b) => a.Orders - b.Orders);
      case 'orders-desc':
        return sorted.sort((a, b) => b.Orders - a.Orders);
      case 'spent-asc':
        return sorted.sort((a, b) => parseFloat(a.TotalSpent.replace('₱', '')) - parseFloat(b.TotalSpent.replace('₱', '')));
      case 'spent-desc':
        return sorted.sort((a, b) => parseFloat(b.TotalSpent.replace('₱', '')) - parseFloat(a.TotalSpent.replace('₱', '')));
      case 'date-asc':
        return sorted.sort((a, b) => new Date(a.DateJoined) - new Date(b.DateJoined));
      case 'date-desc':
        return sorted.sort((a, b) => new Date(b.DateJoined) - new Date(a.DateJoined));
      default:
        return customers;
    }
  };

  const handleCustomerDelete = async (customerId) => {
    try {
      const userData = JSON.parse(localStorage.getItem("user_data"));
      
      // TODO: Replace with actual delete API endpoint
      console.log('Deleting customer:', customerId);
      
      // Example API call for soft delete:
      // await axios.patch(`http://localhost/im-2-project/api/users/${customerId}/delete`, {}, {
      //   headers: { Authorization: "Bearer " + userData.token }
      // });
      
      // Refresh the data after deletion
      // window.location.reload(); // or refetch data
      
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleCustomerEdit = (customerId) => {
    console.log('Editing customer:', customerId);
    // TODO: Navigate to edit page or open modal
    // Example: navigate(`/customers/${customerId}/edit`);
  };

  const handleAddCustomer = () => {
    console.log('Adding new customer');
    // TODO: Navigate to add customer page or open modal
    // Example: navigate('/customers/add');
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // TODO: Implement logout functionality
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar
          activeItem={activeItem}
          onItemChange={setActiveItem}
          onLogout={handleLogout}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cbvt-navy mx-auto mb-4"></div>
            <p className="text-cbvt-dark-gray">Loading customers...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar
          activeItem={activeItem}
          onItemChange={setActiveItem}
          onLogout={handleLogout}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-cbvt-navy text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            <button 
              onClick={handleAddCustomer}
              className="flex items-center bg-cbvt-navy h-[40px] px-4 rounded-2xl text-white mr-10 hover:bg-opacity-90 transition-colors"
            >
              <Plus className="h-3 w-3 mr-2" />
              <span className="text-xs">Add New Customer</span>
            </button>
          </div>

          <div className="flex flex-row gap-4">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative bg-white border border-gray-200 rounded-3xl h-[38px] w-full max-w-[382px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="w-full h-full pl-10 pr-4 rounded-3xl focus:outline-none focus:ring-2 focus:ring-cbvt-navy focus:ring-opacity-50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Sort Dropdown */}
            <SortingDropdown 
              onSortChange={(sortValue) => setSortOption(sortValue)}
            />
          </div>
        </div>

        {/* Customers Grid */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          {displayCustomers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-cbvt-dark-gray text-lg">
                {searchQuery ? 'No customers found matching your search.' : 'No customers found.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
              {displayCustomers.map((customer) => (
                <CustomerCard
                  key={customer.CustomerID}
                  Name={customer.Name}
                  Address={customer.Address}
                  DateJoined={customer.DateJoined}
                  Email={customer.Email}
                  Orders={customer.Orders}
                  TotalSpent={customer.TotalSpent}
                  is_removed={customer.is_removed}
                  onDelete={() => handleCustomerDelete(customer.CustomerID)}
                  onEdit={() => handleCustomerEdit(customer.CustomerID)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;