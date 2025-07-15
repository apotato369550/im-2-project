import { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";
import { Plus, Search, Filter} from "lucide-react";
import { CustomerCard } from "../../components/CustomerCard";
import SortingDropdown from "../../components/SortingDropdown";

const UsersPage = () => {
  const [activeItem, setActiveItem] = useState('Users');

    //search function
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [output, setOutput] = useState([]);

  //filter function
   const [sortOption, setSortOption] = useState('default');

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
        DateJoined: "2/18/2023",
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
  

   // Initialize with all workers on first render
   useEffect(() => {
     setOutput(customerData);
   }, []);
 
 
  // Combined filter and sort effect
   useEffect(() => {
     // Apply search filter
     let results = customerData.filter(customer =>
       customer.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       customer.DateJoined.toLowerCase().includes(searchQuery.toLowerCase())||
       customer.Address.toLowerCase().includes(searchQuery.toLowerCase())
     );
 
     // Apply sorting
     results = sortData(results, sortOption);
     
     setOutput(results);
   }, [searchQuery, sortOption]); // Add sortOption to dependencies
 
 
 // Sorting function
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
            <SortingDropdown 
            onSortChange={(sortValue) => setSortOption(sortValue)}
          />
        </div>

        



        </div>

        {/* Cumstomers Grid */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="grid grid-cols-3 gap-5 mt-5">
            {output.map((customer) => (
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