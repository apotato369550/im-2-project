import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import { Plus, Search, Filter} from "lucide-react";
import { OrdersCard } from "../../components/OrdersCard";
import SortingDropdown from '../../components/SortingDropdown';
import axios from 'axios';

const OrdersPage = () => {
   const [activeItem, setActiveItem] = useState('Orders');
  
   // Main state for orders data
   const [orderData, setOrderData] = useState([]);
   const [searchQuery, setSearchQuery] = useState('');
   const [output, setOutput] = useState([]);
   const [sortOption, setSortOption] = useState('default');
   const [isLoading, setIsLoading] = useState(true);
   const navigate = useNavigate();
   const userData = JSON.parse(localStorage.getItem("user_data"));


   // Fetch orders from API
   useEffect(() => {
     console.log("Fetching orders...");
    
    if (!userData?.token) {
      console.error("No user token found");
      setIsLoading(false);
      return;
    }

    axios
      .get("http://localhost/im-2-project/api/orders/fetch-list", {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      })
      .then((response) => {
        console.log("Data from API:", response.data);

        const formattedOrders = response.data.map((order) => ({
          OrderID: order.order_id,
          Title: order.service_type || "Untitled Service",
          Description: `${order.type ?? ""} ${order.model ?? ""} - ${order.inverter ?? ""} ${order.brand ?? ""}`.trim().replace(/\s+/g, ' '),
          Customer: order.user_full_name || "Unknown",
          Quantity: "1 Unit",
          Amount: `Php ${parseFloat(order.total_payment || 0).toLocaleString("en-PH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
          OrderDate: new Date(order.order_date_created).toLocaleDateString("en-PH", {
            year: "numeric",
            month: "numeric", 
            day: "numeric",
          }),
          DeliveryDate: order.delivery_date ? new Date(order.delivery_date).toLocaleDateString("en-PH", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }) : null,
          order_status: order.order_status || "pending",
          is_removed: order.is_removed || false
        }));

        console.log("Formatted Orders:", formattedOrders);
        setOrderData(formattedOrders);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setIsLoading(false);
      });
  }, []);

  // Initialize output when orderData changes
  useEffect(() => {
    setOutput(orderData);
  }, [orderData]);

  // Handle status updates
  const handleStatusUpdate = (orderId, newStatus) => {
    console.log('Updating status for order:', orderId, 'to:', newStatus);
    axios.put(`http://localhost/im-2-project/api/orders/edit/${orderId}`, {
      order_status: newStatus
    }, {
      headers: {
        Authorization: "Bearer " + userData.token
      }
    })
    .then((response)=>{
      console.log(response);
      setOrderData(prevOrders => 
        prevOrders.map(order => 
          order.OrderID === orderId 
            ? { ...order, order_status: newStatus } 
            : order
        )
      );
    })
    .catch((err)=>{
      console.log(err)
    })
    
    
  };

  // Handle order deletion
  const handleDeleteOrder = (orderId) => {
    console.log('Deleting order:', orderId);
    const confirmDelete = window.confirm('Are you sure you want to delete this order? This action cannot be undone.');
    
    if (confirmDelete) {
      axios.delete(`http://localhost/im-2-project/api/orders/delete/${orderId}`, {
        headers:{
          Authorization: "Bearer " + userData.token
        } 
      })
      .then((response)=>{
        console.log(response);
        setOrderData(prevOrders => prevOrders.filter(order => order.OrderID !== orderId));
      })
      .catch((err)=>{
        console.log(err);
        alert(err.response.data.error)
      })
    }
  };

  // Handle order editing
  const handleEditOrder = (orderId, updatedOrder) => {
    console.log('Editing order:', orderId, 'with data:', updatedOrder);
    
    setOrderData(prevOrders => 
      prevOrders.map(order => 
        order.OrderID === orderId 
          ? { ...order, ...updatedOrder } 
          : order
      )
    );
  };
 
  // Combined filter and sort effect
  useEffect(() => {
    let results = [...orderData];

    // Apply search filter
    if (searchQuery.trim()) {
      results = results.filter(order =>
        order.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.Customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.order_status && order.order_status.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply sorting
    results = sortData(results, sortOption);
    
    setOutput(results);
  }, [searchQuery, sortOption, orderData]); 

  // Enhanced sorting function with customer name sorting
  const sortData = (data, option) => {
    if (!data || data.length === 0) return data;
    
    const sorted = [...data];
    
    console.log('Sorting with option:', option); // Debug log
    
    switch(option) {
      case 'name-asc':
        return sorted.sort((a, b) => {
          const customerA = a.Customer || '';
          const customerB = b.Customer || '';
          console.log('Sorting customers:', customerA, 'vs', customerB); // Debug log
          return customerA.localeCompare(customerB);
        });
      case 'name-desc':
        return sorted.sort((a, b) => {
          const customerA = a.Customer || '';
          const customerB = b.Customer || '';
          return customerB.localeCompare(customerA);
        });
      case 'date-newest':
        return sorted.sort((a, b) => {
          const dateA = new Date(a.OrderDate);
          const dateB = new Date(b.OrderDate);
          return dateB - dateA;
        });
      case 'date-oldest':
        return sorted.sort((a, b) => {
          const dateA = new Date(a.OrderDate);
          const dateB = new Date(b.OrderDate);
          return dateA - dateB;
        });
      case 'amount-high':
        return sorted.sort((a, b) => {
          const amountA = parseFloat(a.Amount.replace(/[^\d.-]/g, '')) || 0;
          const amountB = parseFloat(b.Amount.replace(/[^\d.-]/g, '')) || 0;
          return amountB - amountA;
        });
      case 'amount-low':
        return sorted.sort((a, b) => {
          const amountA = parseFloat(a.Amount.replace(/[^\d.-]/g, '')) || 0;
          const amountB = parseFloat(b.Amount.replace(/[^\d.-]/g, '')) || 0;
          return amountA - amountB;
        });
      case 'default':
      default:
        return sorted; // Return original order for 'default'
    }
  };

  const handleLogout = (e)=>{
    localStorage.removeItem("user_data");
    navigate("/");
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
      <div className="flex-1 flex flex-col pb-8">
        {/* Header Section */}
        <div className="p-8 pb-0">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold font-alegreya-sans-sc text-cbvt-navy">
                {activeItem}
              </h1>
              <p className="text-cbvt-dark-gray mb-6">
                Track and manage customer orders.
              </p> 
            </div>
            <button className='flex items-center bg-cbvt-navy h-[40px] px-4 rounded-2xl text-white mr-10 '>
              <Plus className='h-3 w-3 mr-2' />
              <span className='text-xs'>Create Order</span>
            </button>
          </div>

          <div className='flex flex-row gap-4'> 
            {/* Search Bar */}
            <div className="mb-8">
              <div className='relative bg-white border border-gray-200 rounded-3xl h-[38px] w-full max-w-[382px]'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500'/>
                <input 
                  type='text' 
                  placeholder='Search orders...' 
                  className='w-full h-full pl-10 pr-4 rounded-3xl focus:outline-none'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Sorting Dropdown */}
            <div className="mb-8">
              <SortingDropdown 
                onSortChange={(sortValue) => {
                  console.log('Sort value received:', sortValue); // Debug log
                  setSortOption(sortValue);
                }}
                currentSort={sortOption}
              />
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        <div className='flex-1 overflow-y-auto'>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Loading orders...</p>
            </div>
          ) : output.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">
                {searchQuery ? 'No orders found matching your search.' : 'No orders available.'}
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 p-8 pb-16'>
              {output.map((order) => (
                <OrdersCard
                  key={order.OrderID}
                  OrderID={order.OrderID}
                  Title={order.Title}
                  Description={order.Description}
                  Customer={order.Customer}
                  Quantity={order.Quantity}
                  Amount={order.Amount}
                  OrderDate={order.OrderDate}
                  DeliveryDate={order.DeliveryDate}
                  order_status={order.order_status}
                  onStatusUpdate={handleStatusUpdate}
                  onDelete={handleDeleteOrder}
                  onEdit={handleEditOrder}
                  is_removed={order.is_removed}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;