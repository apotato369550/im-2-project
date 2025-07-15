import { useState, useEffect } from 'react';
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Plus, Search, Filter } from "lucide-react";
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
import axios from "axios";

const UsersPage = () => {
  const [activeItem, setActiveItem] = useState("Users");
  const [searchQuery, setSearchQuery] = useState("");
  const [customerData, setCustomerData] = useState([]);

  /*
  const customerData = [
    {
      Name: "Jhen Aloyon",
      DateJoined: "2/14/2023",
      Address: "Cebu City",
      Email: "jhen.aloyon@gmail.com",
      Orders: 2,
      TotalSpent: "₱27,000",
    },
    {
      Name: "Jen Aloyon",
      DateJoined: "2/14/2023",
      Address: "Cebu City",
      Email: "jhen.aloyon@gmail.com",
      Orders: 5,
      TotalSpent: "₱25,000",
    },
    {
      Name: "Jin Aloyon",
      DateJoined: "2/14/2023",
      Address: "Cebu City",
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
      Name: "Jon Aloyon",
      DateJoined: "2/14/2023",
      Address: "Cebu City",
      Email: "jhen.aloyon@gmail.com",
      Orders: 5,
      TotalSpent: "₱2",
    },
    {
      Name: "Jun Aloyon",
      DateJoined: "2/14/2023",
      Address: "Cebu City",
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
   
      Name: "Jan Aloyon",
      DateJoined: "2/14/2023",
      Address: "Cebu City",
      Email: "jhen.aloyon@gmail.com",
      Orders: 5,
      TotalSpent: "₱27",
    },
  ];
  */

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
          },
      ]
        */
        console.log("Raw API data:", response.data);

        // Convert API response to your desired format
        const formattedData = response.data.map((user) => ({
          Name: user.user_full_name,
          DateJoined: "2/14/2023", // <-- placeholder or use real value if available
          Address: "Cebu City", // <-- placeholder or add this to your backend
          Email: user.user_email,
          Orders: user.order_count,
          TotalSpent: `₱${parseFloat(user.total_spent).toFixed(2)}`,
        }));

        console.log("Formatted data:", formattedData);
        setCustomerData(formattedData);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  const filteredCustomers = customerData.filter(
    (customer) =>
      customer.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.Email.toLowerCase().includes(searchQuery.toLowerCase())
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
            <div className="h-[38px] w-[101px] bg-white border border-gray-200 ml-[17px] rounded-3xl p-1 flex items-center">
              <Filter className="h-3 w-3 ml-3 text-gray-500" />
              <p className="text-gray-500 ml-2">Filter</p>
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
