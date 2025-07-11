import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import { Plus, Search, Filter} from "lucide-react";
import { CustomerCard } from "../../components/CustomerCard";

const UsersPage = () => {
  const [activeItem, setActiveItem] = useState('Users');
  const [searchQuery, setSearchQuery] = useState('');

  const customerData=[
    {
        Name:"Jhen Aloyon",
        DateJoined: "2/14/2023",
        Address:"Cebu City",
        Email: "jhen.aloyon@gmail.com",
        Orders: 2,
        TotalSpent: "₱27,000",
    },
    {
        Name:"Jen Aloyon",
        DateJoined: "2/14/2023",
        Address:"Cebu City",
        Email: "jhen.aloyon@gmail.com",
        Orders: 5,
        TotalSpent: "₱25,000",
    },
    {
        Name:"Jin Aloyon",
        DateJoined: "2/14/2023",
        Address:"Cebu City",
        Email: "jhen.aloyon@gmail.com",
        Orders: 2,
        TotalSpent: "₱27",
    },
    {
        Name:"Jon Aloyon",
        DateJoined: "2/14/2023",
        Address:"Cebu City",
        Email: "jhen.aloyon@gmail.com",
        Orders: 5,
        TotalSpent: "₱2",
    },
    {
        Name:"Jun Aloyon",
        DateJoined: "2/14/2023",
        Address:"Cebu City",
        Email: "jhen.aloyon@gmail.com",
        Orders: 5,
        TotalSpent: "₱27",
    },
    {
        Name:"Jan Aloyon",
        DateJoined: "2/14/2023",
        Address:"Cebu City",
        Email: "jhen.aloyon@gmail.com",
        Orders: 5,
        TotalSpent: "₱27",
    }
   
];
  

  const filteredCustomers = customerData.filter(customer =>
    customer.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.Email.toLowerCase().includes(searchQuery.toLowerCase())
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
            <button className='flex items-center bg-cbvt-navy h-[40px] px-4 rounded-2xl text-white mr-10 '>
              <Plus className='h-3 w-3 mr-2' />
              <span className='text-xs'>Add New User</span>
            </button>
          </div>


          <div className='flex flex-row' > 
          {/* Search Bar */}
          <div className="mb-8">
            <div className='relative bg-white border border-gray-200 rounded-3xl h-[38px] w-full max-w-[382px]'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500'/>
              <input 
                type='text' 
                placeholder='Search users...' 
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

        {/* Cumstomers Grid */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="grid grid-cols-3 gap-5 mt-5">
            {customerData.map((customer) => (
            <CustomerCard
            key={customer.Name} //Name, Address, DateJoined, Email, Orders, TotalSpent
            Name={customer.Name}
            Address={customer.Address}
            DateJoined={customer.DateJoined}
            Email={customer.Email}
            Orders={customer.Orders}
            TotalSpent={customer.TotalSpent}
            />

            
             ))}

            
          </div>
        </div>


        
      </div>
    </div>
  );
};

export default UsersPage;