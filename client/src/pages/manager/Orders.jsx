import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import { Plus, Search, Filter} from "lucide-react";
import { OrdersCard } from "../../components/OrdersCard";
import SortingDropdown from '../../components/SortingDropdown';
import axios from 'axios';

const OrdersPage = () => {
   const [activeItem, setActiveItem] = useState('Orders');
  

        //search function
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [output, setOutput] = useState([]);

  //filter function
   const [sortOption, setSortOption] = useState('default');

   const [orders, setOrders] = useState([]); // Add this state for managing orders
 
  useEffect(() => {
    console.log("Works");
    const userData = JSON.parse(localStorage.getItem("user_data"));
    console.log(userData);
    axios
      .get("http://localhost/im-2-project/api/orders/fetch-list", {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      })
      .then((response) => {
        console.log("Data from API");
        console.log(response);

        console.log("Data from API:", response.data);

        const formattedOrders = response.data.map((order) => ({
          OrderID: order.order_id,
          Title: order.service_type || "Untitled Service",
          Description: `${order.type ?? ""} ${order.model ?? ""} - ${order.inverter ?? ""} ${order.brand ?? ""}`.trim().replace(/\s+/g, ' '),
          Customer: order.user_full_name || "Unknown",
          Quantity: "1 Unit", // static unless you have quantity field
          Amount: `Php ${parseFloat(order.total_payment || 0).toLocaleString("en-PH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
          OrderDate: new Date(order.order_date_created).toLocaleDateString("en-PH", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }),
        }));

        console.log("Formatted Orders:", formattedOrders);
        setOrderData(formattedOrders)

      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);



  
  // Initialize with orderData
  useEffect(() => {
    setOrders(orderData);
    setOutput(orderData); // Initialize output with the same data
  }, []);

  // Handle status updates
  const handleStatusUpdate = (orderId, newStatus) => {
    console.log('Updating status for order:', orderId, 'to:', newStatus);
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.OrderID === orderId 
          ? { ...order, order_status: newStatus } 
          : order
      )
    );
    // Also update the output to reflect changes immediately
    setOutput(prevOutput => 
      prevOutput.map(order => 
        order.OrderID === orderId 
          ? { ...order, order_status: newStatus } 
          : order
      )
    );
  };

  // Handle order deletion
  const handleDeleteOrder = (orderId) => {
    console.log('Deleting order:', orderId);
    const confirmDelete = window.confirm('Are you sure you want to delete this order? This action cannot be undone.');
    
    if (confirmDelete) {
      setOrders(prevOrders => prevOrders.filter(order => order.OrderID !== orderId));
      setOutput(prevOutput => prevOutput.filter(order => order.OrderID !== orderId));
    }
  };

  // Handle order editing
  const handleEditOrder = (orderId, updatedOrder) => {
    console.log('Editing order:', orderId, 'with data:', updatedOrder);
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.OrderID === orderId 
          ? { ...order, ...updatedOrder } 
          : order
      )
    );
    // Also update the output to reflect changes immediately
    setOutput(prevOutput => 
      prevOutput.map(order => 
        order.OrderID === orderId 
          ? { ...order, ...updatedOrder } 
          : order
      )
    );
  };
 
 
   // Combined filter and sort effect
  useEffect(() => {
    // Apply search filter to the main orders array
    let results = orders.filter(order =>
      order.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.Customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.order_status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply sorting
    results = sortData(results, sortOption);
    
    setOutput(results);
  }, [searchQuery, sortOption, orders]); 


 
 
 // Sorting function
   const sortData = (data, option) => {
     const sorted = [...data];
     switch(option) {
       case 'name-asc':
         return sorted.sort((a, b) => a.Title.localeCompare(b.Title));
       case 'name-desc':
         return sorted.sort((a, b) => b.Title.localeCompare(a.Title));
       default:
         return data;
     }
   };




  const filteredOrders = orderData.filter(order =>
    order.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.Customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    console.log('Logging out...');
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
                Track and manage customer orders.
              </p> 
            </div>
            <button className='flex items-center bg-cbvt-navy h-[40px] px-4 rounded-2xl text-white mr-10 '>
              <Plus className='h-3 w-3 mr-2' />
              <span className='text-xs'>Create Order</span>
            </button>
          </div>


          <div className='flex flex-row' > 
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
          <SortingDropdown 
            onSortChange={(sortValue) => setSortOption(sortValue)}
          />
        </div>


        </div>

        {/* Orders Grid */}
        
        <div className='flex-1 overflow-y-auto'>
            <div className='grid grid-cols-2 gap-5 p-8 pb-16'>
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

        </div>

        
      </div>
    </div>
  );
};

export default OrdersPage;