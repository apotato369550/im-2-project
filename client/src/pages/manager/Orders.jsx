import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import { Plus, Search, Filter} from "lucide-react";
import { OrdersCard } from "../../components/OrdersCard";

const OrdersPage = () => {
  const [activeItem, setActiveItem] = useState('Orders');
  const [searchQuery, setSearchQuery] = useState('');

  const orderData=[
    {
        OrderID:111, 
        Title: "AC Installation", 
        Description:"Split Type AC - Inverter 1.5 HP", 
        Customer: "Jhen Aloyon",
        Quantity:"1 Unit",
        Amount: "Php 35,000.00", 
        OrderDate:"8/13/2025", 
        DeliveryDate:"8/27/2025",  
    },
    {
        OrderID:111, 
        Title: "AC Installation", 
        Description:"Split Type AC - Inverter 1.5 HP", 
        Customer: "Jhen Aloyon",
        Quantity:"1 Unit",
        Amount: "Php 35,000.00", 
        OrderDate:"8/13/2025", 
        DeliveryDate:"8/27/2025",  
    },
    {
        OrderID:111, 
        Title: "AC Installation", 
        Description:"Split Type AC - Inverter 1.5 HP", 
        Customer: "Jhen Aloyon",
        Quantity:"1 Unit",
        Amount: "Php 35,000.00", 
        OrderDate:"8/13/2025", 
        DeliveryDate:"8/27/2025",  
    },
    {
        OrderID:111, 
        Title: "AC Installation", 
        Description:"Split Type AC - Inverter 1.5 HP", 
        Customer: "Jhen Aloyon",
        Quantity:"1 Unit",
        Amount: "Php 35,000.00", 
        OrderDate:"8/13/2025", 
        DeliveryDate:"8/27/2025",  
    },
];
  

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
          <div className='h-[38px] w-[101px] bg-white border border-gray-200 ml-[17px] rounded-3xl p-1 flex items-center'>
            <Filter className='h-3 w-3 ml-3 text-gray-500'/>
            <p className='text-gray-500 ml-2'>Filter</p>
        </div>
        </div>


        </div>

        {/* Orders Grid */}
        
        <div className='flex-1 overflow-y-auto'>
            <div className='grid grid-cols-2 gap-5 p-8 pb-16'>
                {orderData.map((order) => (
                    <OrdersCard  //OrderID, Title, Description, Customer, Amount, OrderDate, DeliveryDate
                        key={order.OrderID}
                        Title={order.Title}
                        Description={order.Description}
                        Customer={order.Customer}
                        Quantity={order.Quantity}
                        Amount={order.Amount}
                        OrderDate={order.OrderDate}
                        DeliveryDate={order.DeliveryDate}

                    />

                ))}
            </div>

        </div>

        
      </div>
    </div>
  );
};

export default OrdersPage;