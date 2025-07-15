import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import { Plus, Search, Filter} from "lucide-react";
import { OrdersCard } from "../../components/OrdersCard";
import SortingDropdown from '../../components/SortingDropdown';

const OrdersPage = () => {
  const [activeItem, setActiveItem] = useState('Orders');
  

        //search function
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [output, setOutput] = useState([]);

  //filter function
   const [sortOption, setSortOption] = useState('default');

   const [orders, setOrders] = useState([]); // Add this state for managing orders
 

  const orderData=[
  {
    OrderID: 111,
    Title: "AC Installation",
    Description: "Split Type AC - Inverter 1.5 HP",
    Customer: "Jhen Aloyon",
    Quantity: "1 Unit",
    Amount: "Php 35,000.00",
    OrderDate: "8/13/2025",
    DeliveryDate: "8/27/2025",
    order_status: "Quotation Sent" // Waiting for customer approval
  },
  {
    OrderID: 112,
    Title: "AC Repair",
    Description: "Fix gas leak in Window Type 1.0 HP",
    Customer: "Carlos Reyes",
    Quantity: "1 Unit",
    Amount: "Php 4,500.00",
    OrderDate: "8/15/2025",
    DeliveryDate: "8/17/2025",
    order_status: "Quotation Confirmed" // Customer approved, work scheduled
  },
  {
    OrderID: 113,
    Title: "AC Cleaning",
    Description: "Chemical wash for Split Type 2.0 HP",
    Customer: "Maria Gonzales",
    Quantity: "2 Units",
    Amount: "Php 6,000.00",
    OrderDate: "8/10/2025",
    DeliveryDate: "8/12/2025",
    order_status: "Completed" // Service finished
  },
  {
    OrderID: 114,
    Title: "AC Installation",
    Description: "Window Type AC - Standard 0.5 HP",
    Customer: "Robert Tan",
    Quantity: "3 Units",
    Amount: "Php 42,000.00",
    OrderDate: "8/5/2025",
    DeliveryDate: "8/20/2025",
    order_status: "Pending" // New request, not yet processed
  },
  {
    OrderID: 115,
    Title: "AC Maintenance",
    Description: "Annual check-up for Split Type 1.5 HP",
    Customer: "Anna Lim",
    Quantity: "1 Unit",
    Amount: "Php 2,500.00",
    OrderDate: "8/18/2025",
    DeliveryDate: "8/19/2025",
    order_status: "Quotation Pending" // Technician preparing estimate
  },
  {
    OrderID: 116,
    Title: "AC Installation",
    Description: "Split Type AC - Inverter 2.5 HP",
    Customer: "David Sy",
    Quantity: "1 Unit",
    Amount: "Php 52,000.00",
    OrderDate: "8/20/2025",
    DeliveryDate: "9/5/2025",
    order_status: "Quotation Rejected" // Customer declined the quote
  },
  {
    OrderID: 117,
    Title: "AC Repair",
    Description: "Replace capacitor in Window Type 1.0 HP",
    Customer: "Linda Chan",
    Quantity: "1 Unit",
    Amount: "Php 3,200.00",
    OrderDate: "8/12/2025",
    DeliveryDate: "8/14/2025",
    order_status: "Cancelled" // Order was cancelled
  },
  {
    OrderID: 118,
    Title: "AC Installation",
    Description: "Split Type AC - Standard 1.0 HP",
    Customer: "Marco Villaverde",
    Quantity: "1 Unit",
    Amount: "Php 28,000.00",
    OrderDate: "8/8/2025",
    DeliveryDate: "8/22/2025",
    order_status: "Quotation Confirmed" // Approved and scheduled
  },
  {
    OrderID: 119,
    Title: "AC Cleaning",
    Description: "Basic cleaning for Window Type 0.5 HP",
    Customer: "Sophia Rodriguez",
    Quantity: "1 Unit",
    Amount: "Php 1,500.00",
    OrderDate: "8/22/2025",
    DeliveryDate: "8/23/2025",
    order_status: "Pending" // New request
  },
  {
    OrderID: 120,
    Title: "AC Installation",
    Description: "Split Type AC - Inverter 1.0 HP",
    Customer: "Michael Ong",
    Quantity: "1 Unit",
    Amount: "Php 32,000.00",
    OrderDate: "8/25/2025",
    DeliveryDate: "9/10/2025",
    order_status: "Quotation Sent" // Waiting for customer response
  }
];
  

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
            />

                ))}
            </div>

        </div>

        
      </div>
    </div>
  );
};

export default OrdersPage;